package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	//Import transactionCreate.go

	"totallatorv2/lib/bulkTransactionHandlers"
	"totallatorv2/lib/helpers"
	"totallatorv2/lib/journalActions"
	"totallatorv2/lib/transactionActions"

	// hooks "pocketbase/hooks"

	"github.com/labstack/echo/v5"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/jsvm"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		// most likely ran with go run
		return "./pb_public"
	}

	return filepath.Join(os.Args[0], "../pb_public")
}

func main() {

	app := pocketbase.New()

	var publicDirFlag string

	// add "--publicDir" option flag
	app.RootCmd.PersistentFlags().StringVar(
		&publicDirFlag,
		"publicDir",
		defaultPublicDir(),
		"the directory to serve static files",
	)
	migrationsDir := "" // default to "pb_migrations" (for js) and "migrations" (for go)

	// load js files to allow loading external JavaScript migrations
	jsvm.MustRegisterMigrations(app, &jsvm.MigrationsOptions{
		Dir: migrationsDir,
	})

	// register the `migrate` command
	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		TemplateLang: migratecmd.TemplateLangJS, // or migratecmd.TemplateLangGo (default)
		Dir:          migrationsDir,
		Automigrate:  true,
	})

	app.OnRecordBeforeUpdateRequest("journals").Add(func(e *core.RecordUpdateEvent) error {
		return journalActions.PreUpdate(e, app)
	})

	app.OnModelBeforeUpdate("transactions").Add(func(e *core.ModelEvent) error {
		return transactionActions.PreCreateUpdateAction(e, app)
	})

	// When updating a transaction record, this will also update the related journals with the correct amount and account.
	// Note that this runs regardless of if the amount / account has changed to ensure that the related journals are always correct and
	// subscribers to the journals collection will always be notified of the change.
	app.OnModelAfterUpdate("transactions").Add(func(e *core.ModelEvent) error {
		return transactionActions.UpdateAction(e, app)
	})

	app.OnModelBeforeCreate("transactions").Add(func(e *core.ModelEvent) error {
		return transactionActions.PreCreateUpdateAction(e, app)
	})

	// After Creating a Transaction, this will also create the related journals.
	app.OnModelAfterCreate("transactions").Add(func(e *core.ModelEvent) error {
		return transactionActions.CreateAction(e, app)
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		log.Print("Starting Server")

		// serves static files from the provided public dir (if exists)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDirFlag), true))

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/custom/deleteAllTransactions",
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				helpers.AdminRoleRequired(app),
			},
			Handler: bulkTransactionHandlers.DeleteAlltransactions(app),
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/custom/deleteBulkTransactions",
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				helpers.AdminRoleRequired(app),
			},
			Handler: bulkTransactionHandlers.BulkDeleteTransactions(app),
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/custom/addBulk",
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				helpers.AdminRoleRequired(app),
			},
			Handler: bulkTransactionHandlers.BulkAddTransactions(app),
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "/api/hello",
			Handler: func(c echo.Context) error {
				obj := map[string]interface{}{"message": "Hello world! - New"}
				return c.JSON(http.StatusOK, obj)
			},
		})

		return nil
	})

	//Update Combined Title for Tags and Categories
	app.OnModelBeforeCreate("tags", "categories").Add(func(e *core.ModelEvent) error {
		rec := e.Model.(*models.Record)
		rec.Set("combinedTitle", rec.GetString("group")+string('/')+rec.GetString("title"))
		return nil
	})

	//Update Combined Title for Tags and Categories
	app.OnModelBeforeUpdate("tags", "categories").Add(func(e *core.ModelEvent) error {
		rec := e.Model.(*models.Record)
		rec.Set("combinedTitle", rec.GetString("group")+string('/')+rec.GetString("title"))
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

type UserModel struct {
	ID string `json:"id"`
}
