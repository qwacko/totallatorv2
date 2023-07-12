package transactionActions

import (
	"log"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/hook"
)

func CreateAction(e *core.ModelEvent, app *pocketbase.PocketBase) error {
	rec := e.Model.(*models.Record)

	collection, err := app.Dao().FindCollectionByNameOrId("journals")
	if err != nil {
		return hook.StopPropagation
	}

	directions := [2]string{"from", "to"}

	account := rec.GetString("toAccount")
	fromAccount := rec.GetString("fromAccount")
	amount := rec.GetFloat("amount")
	transactionId := rec.GetId()

	for _, direction := range directions {

		record := models.NewRecord(collection)
		form := forms.NewRecordUpsert(app, record)

		var useAmount float64
		var useAccount string
		if direction == "from" {
			useAccount = fromAccount
			useAmount = amount * -1
		} else {
			useAmount = amount
			useAccount = account
		}

		form.LoadData(map[string]any{
			"account":     useAccount,
			"amount":      useAmount,
			"transaction": transactionId,
			"direction":   direction,
		})

		if err := form.Submit(); err != nil {
			return err
		}

	}

	return nil
}

func UpdateAction(e *core.ModelEvent, app *pocketbase.PocketBase) error {
	rec := e.Model.(*models.Record)

	relatedJournalRecords, err := app.Dao().FindRecordsByExpr("journals", dbx.HashExp{"transaction": rec.GetId()})

	if err != nil {
		log.Print("Error Finding Related Journals : ", err)
		return hook.StopPropagation
	}

	for _, relatedJournalRecord := range relatedJournalRecords {
		if relatedJournalRecord.GetString("direction") == "from" {
			relatedJournalRecord.Set("amount", rec.GetFloat("amount")*-1)
			relatedJournalRecord.Set("account", rec.GetString("fromAccount"))
		} else {
			relatedJournalRecord.Set("amount", rec.GetFloat("amount"))
			relatedJournalRecord.Set("account", rec.GetString("toAccount"))
		}

		if err := app.Dao().SaveRecord(relatedJournalRecord); err != nil {
			return err
		}

	}
	return nil
}
