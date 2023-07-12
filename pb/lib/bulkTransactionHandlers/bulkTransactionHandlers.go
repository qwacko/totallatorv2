package bulkTransactionHandlers

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

func DeleteAlltransactions(app *pocketbase.PocketBase) func(echo.Context) error {
	return func(c echo.Context) (err error) {

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
	}
}

type BulkDelete struct {
	Data []string `json:"data"`
}

func BulkDeleteTransactions(app *pocketbase.PocketBase) func(echo.Context) error {
	return func(c echo.Context) (err error) {
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
	}
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

func BulkAddTransactions(app *pocketbase.PocketBase) func(echo.Context) error {

	return func(c echo.Context) (err error) {
		u := new(TestBulkData)
		collection, _ := app.Dao().FindCollectionByNameOrId("transactions")
		if err := c.Bind(u); err != nil {
			log.Print("Data Load Error : ", err)
			return err
		}

		log.Print("Bulk Addition Function Executing")

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
	}
}