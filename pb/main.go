package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	// hooks "pocketbase/hooks"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
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

	// call this only if you want to use the configurable "hooks" functionality
	// hooks.PocketBaseInit(app)

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDirFlag), true))

		e.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "/api/hello",
			Handler: func(c echo.Context) error {
				obj := map[string]interface{}{"message": "Hello world! - New"}
				return c.JSON(http.StatusOK, obj)
			},
			// Middlewares: []echo.MiddlewareFunc{
			// 	apis.RequireAdminOrUserAuth(),
			// },
		})

		return nil
	})

	//Update Combined Title for Tags and Categories
	app.OnRecordBeforeCreateRequest("tags", "categories").Add(func(e *core.RecordCreateEvent) error {
		e.Record.Set("combinedTitle", e.Record.GetString("group")+string('/')+e.Record.GetString("title"))
		return nil
	})

	//Update Combined Title for Tags and Categories
	app.OnRecordBeforeUpdateRequest("tags", "categories").Add(func(e *core.RecordUpdateEvent) error {
		e.Record.Set("combinedTitle", e.Record.GetString("group")+string('/')+e.Record.GetString("title"))
		return nil
	})

	// app.OnRecordBeforeUpdateRequest().Add((func(e *core.RecordUpdateEvent) error {
	// 	if e.Record.Collection().Name == "posts" {
	// 		log.Println("Updating Post Record")
	// 		log.Println(e.Record.Get("title"))
	// 		log.Println(e.Record.OriginalCopy().Get("title"))
	// 		log.Println("Record Update Complete")
	// 	}

	// 	return nil
	// }))

	app.OnRecordAfterUpdateRequest()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
