package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

func main() {
	router := NewRouter()

	// Fix CORS problems
	headersOk := handlers.AllowedHeaders([]string{"content-type"})
	originsOk := handlers.AllowedOrigins([]string{"*"}) //TODO: Change to be just our front-end domain probably
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(headersOk, originsOk, methodsOk)(router)))
}
