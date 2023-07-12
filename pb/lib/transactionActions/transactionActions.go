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

// Makes sure the date is updated from teh dateText field
func PreCreateUpdateAction(e *core.ModelEvent, app *pocketbase.PocketBase) error {
	rec := e.Model.(*models.Record)

	dateText := rec.GetString("dateText")
	date := dateText + "T00:00:00.000Z"

	rec.Set("date", date)

	return nil
}

func CreateAction(e *core.ModelEvent, app *pocketbase.PocketBase) error {
	rec := e.Model.(*models.Record)

	collection, err := app.Dao().FindCollectionByNameOrId("journals")
	if err != nil {
		return hook.StopPropagation
	}

	directions := [2]string{"from", "to"}

	toAccount := rec.GetString("toAccount")
	fromAccount := rec.GetString("fromAccount")
	amount := rec.GetFloat("amount")
	bill := rec.GetString("bill")
	budget := rec.GetString("budget")
	category := rec.GetString("category")
	tag := rec.GetString("tag")

	dateText := rec.GetString("dateText")
	date := dateText + "T00:00:00.000Z"

	description := rec.GetString("description")
	transactionId := rec.GetId()

	for _, direction := range directions {

		record := models.NewRecord(collection)
		form := forms.NewRecordUpsert(app, record)

		var useAmount float64
		var useAccount string
		var otherAccount string
		if direction == "from" {
			useAccount = fromAccount
			otherAccount = toAccount
			useAmount = amount * -1
		} else {
			useAmount = amount
			useAccount = toAccount
			otherAccount = fromAccount
		}

		form.LoadData(map[string]any{
			"account":      useAccount,
			"otherAccount": otherAccount,
			"amount":       useAmount,
			"transaction":  transactionId,
			"direction":    direction,
			"bill":         bill,
			"budget":       budget,
			"category":     category,
			"tag":          tag,
			"date":         date,
			"dateText":     dateText,
			"description":  description,
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
			relatedJournalRecord.Set("otherAccount", rec.GetString("toAccount"))
		} else {
			relatedJournalRecord.Set("amount", rec.GetFloat("amount"))
			relatedJournalRecord.Set("account", rec.GetString("toAccount"))
			relatedJournalRecord.Set("otherAccount", rec.GetString("fromAccount"))
		}

		relatedJournalRecord.Set("description", rec.GetString("description"))
		relatedJournalRecord.Set("date", rec.GetString("date"))
		relatedJournalRecord.Set("dateText", rec.GetString("dateText"))
		relatedJournalRecord.Set("bill", rec.GetString("bill"))
		relatedJournalRecord.Set("budget", rec.GetString("budget"))
		relatedJournalRecord.Set("category", rec.GetString("category"))
		relatedJournalRecord.Set("tag", rec.GetString("tag"))

		if err := app.Dao().SaveRecord(relatedJournalRecord); err != nil {
			return err
		}

	}
	return nil
}
