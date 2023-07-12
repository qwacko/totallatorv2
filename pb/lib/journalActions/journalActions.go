package journalActions

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
)

// When a journal is updated, don't allow this to be updated, but stop the proposation and
// instead update the related transaction with teh same information. This will in turn update the
// transaction to be the same as the submitted changes
func PreUpdate(e *core.RecordUpdateEvent, app *pocketbase.PocketBase) error {

	rec := e.Record

	account := rec.GetString("account")
	otherAccount := rec.GetString("otherAccount")
	amount := rec.GetFloat("amount")
	bill := rec.GetString("bill")
	budget := rec.GetString("budget")
	category := rec.GetString("category")
	tag := rec.GetString("tag")
	dateText := rec.GetString("dateText")
	description := rec.GetString("description")

	var fromAccount string
	var toAccount string
	var useAmount float64

	if amount > 0 {
		fromAccount = otherAccount
		toAccount = account
		useAmount = amount
	} else {
		fromAccount = account
		toAccount = otherAccount
		useAmount = amount * -1
	}

	relatedTransaction, err := app.Dao().FindRecordById("transactions", rec.GetString("transaction"))

	if err != nil {
		log.Print("Error Finding Related Transaction : ", err)
		return hook.StopPropagation
	}

	relatedTransaction.Set("fromAccount", fromAccount)
	relatedTransaction.Set("toAccount", toAccount)
	relatedTransaction.Set("amount", useAmount)
	relatedTransaction.Set("bill", bill)
	relatedTransaction.Set("budget", budget)
	relatedTransaction.Set("category", category)
	relatedTransaction.Set("tag", tag)
	relatedTransaction.Set("dateText", dateText)
	relatedTransaction.Set("description", description)

	if err := app.Dao().SaveRecord(relatedTransaction); err != nil {
		log.Print("Error Saving Related Transaction : ", err)
		return hook.StopPropagation
	}

	return hook.StopPropagation

}
