package main

import (
	"log"
	"net/http"

	raven "github.com/getsentry/raven-go"
	"github.com/gorilla/handlers"
)

func main() {
	raven.SetDSN("https://ee687e5bbbd84e2487bddc34287eb957:b4ce71323e77488d873d2b6c3f9f05c3@sentry.io/235656")

	router := NewRouter()

	// Fix CORS problems
	headersOk := handlers.AllowedHeaders([]string{"content-type"})
	originsOk := handlers.AllowedOrigins([]string{"*"}) //TODO: Change to be just our front-end domain probably
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(headersOk, originsOk, methodsOk)(router)))
}
