package main

/*********************
 * A Page is a struct representation of a markdown portfolio.
 *********************/
type Page struct {
    Name       string       `json:"name"`
    Body       string       `json:"body"`
    Author     string       `json:"author"`
    PageID     string       `json:"pageID"`
    UserID     string       `json:"userID"`
}
