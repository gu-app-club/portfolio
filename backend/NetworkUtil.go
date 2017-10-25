package main

import (
	"database/sql"
	"errors"
	"os/exec"
	"strconv"
	"strings"

	"github.com/Pallinder/go-randomdata"
	_ "github.com/go-sql-driver/mysql"
)

/*********************
 * Standard way to connect to an SQL database.
 *********************/
func SQLConnect(testing bool) (*sql.DB, error) {
	if testing {
		return sql.Open("mysql", SQLUSER+":"+SQLPASS+"@tcp("+SQLURL+")/"+TEST_DBNAME)
	}
	return sql.Open("mysql", SQLUSER+":"+SQLPASS+"@tcp("+SQLURL+")/"+DBNAME)
}

/*********************
 * GetPage returns a Page object given an unique PageID and UserID
 *********************/
func GetPage(conn *sql.DB, pageID string, userID string) (Page, error) {
	var page Page

	rows, err := conn.Query("SELECT name, author, body FROM pages WHERE pageID = ? AND userID = ?", pageID, userID)

	if err != nil {
		return page, err
	}

	for rows.Next() {
		err := rows.Scan(&page.Name, &page.Author, &page.Body)
		if err != nil {
			return page, err
		}
	}

	return page, err
}

/*********************
 * GetBook returns a collection of constructed with the pagination parameters
 * of offset and countcreates a hash with a baked salt from a given password.
 *********************/
func GetBook(conn *sql.DB, offset int, count int) (Book, error) {
	book := Book{
		Pages:  []Page{},
		Count:  count,
		Offset: offset,
		Total:  0,
	}

	rows, err := conn.Query("SELECT name, author, body, pageID, userID FROM pages LIMIT ?, ?", strconv.Itoa(offset), strconv.Itoa(count))

	if err != nil {
		return book, err
	}

	for rows.Next() {
		var page Page
		err := rows.Scan(&page.Name, &page.Author, &page.Body, &page.PageID, &page.UserID)
		if err != nil {
			return book, err
		}
		book.Pages = append(book.Pages, page)
		book.Total++
	}

	return book, nil
}

/*********************
 * Register will append a new user to the `users` database and invalidate
 * the accessCode provided.
 *********************/
func Register(conn *sql.DB, username string, email string, accessCode string, password string) (string, error) {
	password = GenerateHash(password)
	sessionB, err := exec.Command("uuidgen").Output()
	if err != nil {
		return "", err
	}
	session := string(StripSpaces(string(sessionB)))

	_, err = conn.Query("INSERT INTO users (userID, username, email, access_code, password, session) VALUES (NULL, ?, ?, ?, ?, ?)",
		username, email, accessCode, password, session)

	if err != nil {
		return "nil", err
	}

	_, err = conn.Query("UPDATE access_codes SET valid=0 WHERE access_code = ? LIMIT 1",
		accessCode)

	if err != nil {
		return "", err
	}
	return session, nil
}

/*********************
 * Login checks if the provided key and password are contained in the database.
 * If successfuly authenticated, a new session will be appended to the user.
 * This new session is returned.
 *********************/
func Login(conn *sql.DB, key string, password string) (bool, string, error) {
	rows, err := conn.Query("SELECT userID, password, session FROM users WHERE username = ? OR email = ? LIMIT 1",
		key, key)

	if err != nil {
		return false, "", err
	}

	var (
		userID         = -1
		hashedPassword = ""
		session        = ""
	)

	for rows.Next() {
		err := rows.Scan(&userID, &hashedPassword, &session)
		if err != nil {
			return false, "", err
		}
	}

	if userID >= 0 {
		sessionB, err := exec.Command("uuidgen").Output()
		if err != nil {
			return false, "", err
		}
		session := string(StripSpaces(string(sessionB)))

		_, err = conn.Query("UPDATE users SET session= ? WHERE userID= ? LIMIT 1",
			session, userID)
		if err != nil {
			return false, "", err
		}

		return true, session, nil
	}
	return false, "", nil

}

/*********************
 * FieldExists checks if a field of a certain value in a table exists.
 *********************/
func FieldExists(conn *sql.DB, field string, value string, table string) (bool, error) {
	rows, err := conn.Query(`SELECT COUNT(`+field+`) FROM `+table+` WHERE `+field+`= ?`, value)

	if err != nil {
		return false, err
	}
	var count = 0

	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			return false, err
		}
	}

	return (count > 0), nil

}

/*********************
 * AccessCodeValid checks if an accessCode exists and is valid within
 * the `access_codes` database.
 *********************/
func AccessCodeValid(conn *sql.DB, accessCode string) (bool, error) {
	rows, err := conn.Query("SELECT COUNT(access_code) FROM access_codes WHERE access_code = ? AND valid = 1",
		accessCode)

	if err != nil {
		return false, err
	}

	var count = 0

	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			return false, err
		}
	}

	return (count > 0), nil
}

/*********************
 * Update page replaces a page to a database.
 *********************/

func UpdatePage(conn *sql.DB, username string, name string, body string, pageID string) error {
	userID, err := GetUserID(conn, username)
	if err != nil {
		return err
	} else if userID == "-1" {
		return errors.New("Invalid userID {-1}")
	}
	_, err = conn.Query("UPDATE pages SET body= ?, name= ? WHERE pageID= ? AND userID= ?",
		body, name, pageID, userID)

	return err
}

/*********************
 * AddPage adds a page to a database.
 *********************/
func AddPage(conn *sql.DB, username string, name string, body string) error {
	userID, err := GetUserID(conn, username)
	if err != nil {
		return err
	} else if userID == "-1" {
		return errors.New("Invalid userID {-1}")
	}

	_, err = conn.Query("INSERT INTO pages (pageID, userID, name, author, body) VALUES (NULL, ?, ?, ?, ?)",
		userID, name, username, body)

	return err
}

/*********************
 * Given a username, GetUserID returns the userID as a string
 * or "-1" if the username is not found.
 *********************/
func GetUserID(conn *sql.DB, username string) (string, error) {

	rows, err := conn.Query("SELECT userID FROM users WHERE username= ? OR email= ?",
		username, username)

	if err != nil {
		return "-1", err
	}

	var userID = "-1"

	for rows.Next() {
		err := rows.Scan(&userID)
		if err != nil {
			return "-1", err
		}
	}

	return userID, nil
}

/*********************
 * Creates and returns an AccessCode
 *********************/
func CreateAccessCode(conn *sql.DB) (string, error) {
	accessCode := strings.ToLower(randomdata.SillyName())
	_, err := conn.Query("INSERT INTO access_codes(access_code, valid) VALUES (?, 1)",
		accessCode)
	return accessCode, err
}
