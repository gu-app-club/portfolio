package main

import (
	"net/http"

	raven "github.com/getsentry/raven-go"
	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func NewRouter() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}

	return router
}

var routes = Routes{
	Route{
		"RegisterHandler",
		"POST",
		"/register",
		raven.RecoveryHandler(RegisterHandler),
	},
	Route{
		"LoginHandler",
		"POST",
		"/login",
		raven.RecoveryHandler(LoginHandler),
	},
	Route{
		"BookHandler",
		"GET",
		"/pages/{count}/{offset}",
		raven.RecoveryHandler(BookHandler),
	},
	Route{
		"PageHandler",
		"GET",
		"/users/{userID}/pages/{pageID}",
		raven.RecoveryHandler(PageHandler),
	},
	Route{
		"UploadHandler",
		"POST",
		"/pages/new",
		raven.RecoveryHandler(UploadHandler),
	},
	Route{
		"ReplaceHandler",
		"POST",
		"/pages/replace",
		raven.RecoveryHandler(ReplaceHandler),
	},
	Route{
		"AccessCodeHandler",
		"GET",
		"/access/new",
		raven.RecoveryHandler(AccessCodeHandler),
	},
}
