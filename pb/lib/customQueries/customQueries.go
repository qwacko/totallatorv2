package customQueries

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/resolvers"
	"github.com/pocketbase/pocketbase/tools/search"
)

type TotalQuery struct {
	Query   string `json:"query"`
	Sort    string `json:"sort"`
	PerPage int    `json:"perPage"`
	PageNo  int    `json:"pageNo"`
}

// TODO : Add A Custom Query To Get Stats. Probably just use a query to get everything, and then perform aggregation in go since it is pretty quick.

func TotalJournals(app *pocketbase.PocketBase) func(echo.Context) error {
	return func(c echo.Context) (err error) {

		u := new(TotalQuery)

		if err := c.Bind(u); err != nil {
			log.Print("Total Journals Error : ", err)
			return err
		}
		collection, _ := app.Dao().FindCollectionByNameOrId("journals")
		q := app.Dao().RecordQuery(collection)
		resolver := resolvers.NewRecordFieldResolver(app.Dao(), collection, nil, true)
		expr, err := search.FilterData(u.Query).BuildExpr(resolver)

		if err != nil || expr == nil {
			log.Print("Total Journals Error (Expression) : ", err)
			return err
		}

		startingNumber := u.PerPage * (u.PageNo - 1)

		q.AndWhere(expr).Offset(int64(startingNumber))

		if u.Sort != "" {
			for _, sortField := range search.ParseSortFromString(u.Sort) {
				expr, err := sortField.BuildExpr(resolver)
				if err != nil {
					return err
				}
				if expr != "" {
					q.AndOrderBy(expr)
				}
			}
		}

		resolver.UpdateQuery(q)

		journals := []*models.Record{}

		if err := q.All(&journals); err != nil {
			log.Print("Total Journals Error (Query) : ", err)
			return err
		}

		start := 0
		end := len(journals)

		// Calculate the total
		total := 0.0
		for _, journal := range journals[start:end] {
			total += journal.GetFloat("amount")
		}

		// Return the total as a JSON response
		return c.JSON(http.StatusOK, map[string]float64{"total": total})
	}
}
