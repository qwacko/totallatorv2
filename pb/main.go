package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	// hooks "pocketbase/hooks"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/jsvm"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}
	return false
}

func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		// most likely ran with go run
		return "./pb_public"
	}

	return filepath.Join(os.Args[0], "../pb_public")
}

// Determines whether a user can access this endpoint by confirming someone is logged in
// and also that the logged in user has the "admin" role.
func adminRoleRequired(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authRecord, _ := c.Get(apis.ContextAuthRecordKey).(*models.Record)
			if authRecord == nil {
				log.Print("Auth Record Error : ", authRecord)
				return apis.NewForbiddenError("Only Authenticated Users Can Access This Endpoint", "")
			}

			roles := authRecord.GetStringSlice("role")

			isAdmin := contains(roles, "admin")

			if !isAdmin {
				return apis.NewForbiddenError("Only Admins Can Access This Endpoint", "")
			}

			return next(c)

		}
	}
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
			Method: http.MethodPost,
			Path:   "/api/custom/deleteAllTransactions",
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				adminRoleRequired(app),
			},
			Handler: func(c echo.Context) (err error) {

				records, err := app.Dao().FindRecordsByExpr("transactions", dbx.NewExp("true"))

				if err != nil {
					log.Print("Record Finding Error : ", err)
					return err
				}

				txError := app.Dao().RunInTransaction(func(txDao *daos.Dao) error {

					for _, record := range records {
						txDao.DeleteRecord(record)
					}
					return nil
				})
				if txError != nil {
					return txError
				}

				return c.String(http.StatusOK, "Success Delete All")
			},
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/custom/deleteBulkTransactions",
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				adminRoleRequired(app),
			},
			Handler: func(c echo.Context) (err error) {
				u := new(BulkDelete)
				if err := c.Bind(u); err != nil {
					log.Print("Bulk Transaction Delete Error : ", err)
					return err
				}
				txError := app.Dao().RunInTransaction(func(txDao *daos.Dao) error {
					records, err := txDao.FindRecordsByIds("transactions", u.Data)
					if err != nil {
						return err
					}
					for _, record := range records {
						txDao.DeleteRecord(record)
					}

					return nil

				})

				if txError != nil {
					return txError
				}

				return c.String(http.StatusOK, "Complete")
			},
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/custom/addBulk",
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				adminRoleRequired(app),
			},
			Handler: func(c echo.Context) (err error) {
				u := new(TestBulkData)
				collection, _ := app.Dao().FindCollectionByNameOrId("transactions")
				if err := c.Bind(u); err != nil {
					log.Print("Data Load Error : ", err)
					return err
				}
				txError := app.Dao().RunInTransaction(func(txDao *daos.Dao) error {
					for _, transaction := range u.Data {

						if len(transaction.Description) == 0 {
							return c.String(http.StatusBadRequest, "Description Is Missing")
						}
						record := models.NewRecord(collection)
						form := forms.NewRecordUpsert(app, record)
						form.SetDao(txDao)
						form.LoadData(map[string]any{
							"date":        transaction.Date,
							"description": transaction.Description,
							"fromAccount": transaction.FromAccount,
							"toAccount":   transaction.ToAccount,
							"amount":      transaction.Amount,
							"tag":         transaction.Tag,
							"bill":        transaction.Bill,
							"budget":      transaction.Budget,
							"category":    transaction.Category,
						})

						if err := form.Submit(); err != nil {
							log.Print("Error Storing Data : ", err)
							return err
						}

					}
					return nil
				})
				if txError != nil {
					return txError
				}
				return c.String(http.StatusOK, "Complete")
			},
		})

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

	app.OnRecordAfterUpdateRequest()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

type UserModel struct {
	ID string `json:"id"`
}

type BulkTransactionSingle struct {
	Description string  `json:"description"`
	Date        string  `json:"date"`
	FromAccount string  `json:"fromAccount"`
	ToAccount   string  `json:"toAccount"`
	Amount      float32 `json:"amount"`
	Tag         string  `json:"tag"`
	Bill        string  `json:"bill"`
	Budget      string  `json:"budget"`
	Category    string  `json:"category"`
}

type TestBulkData struct {
	Data []BulkTransactionSingle `json:"data"`
}

type BulkDelete struct {
	Data []string `json:"data"`
}
