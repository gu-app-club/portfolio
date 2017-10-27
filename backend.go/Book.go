/*********************
 * A Book is a collection of Pages.
 *********************/
package main

type Book struct {
     Pages  []Page `json:"pages"`
     Count  int    `json:"count"`
     Offset int    `json:"offset"`
     Total  int    `json:"total"`
}
