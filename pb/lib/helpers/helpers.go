package helpers

import (
	"log"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}
	return false
}

// Determines whether a user can access this endpoint by confirming someone is logged in
// and also that the logged in user has the "admin" role.
func AdminRoleRequired(app core.App) echo.MiddlewareFunc {
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
