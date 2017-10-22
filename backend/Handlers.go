package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

/*********************
 * PageHandler takes a unique UserID and PageID and returns a Page that mathes the criteria.
 * The UserID and PageId must be castable as an integer.
 *********************/
func PageHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)
	userID := vars["userID"]
	pageID := vars["pageID"]
	if !IsInt(userID, pageID) {
		return
	}
	conn, err := SQLConnect(false)
	if err != nil {
		panic(err)
	}

	page, err := GetPage(conn, pageID, userID)

	if err != nil {
		panic(err)
	} else if err := json.NewEncoder(w).Encode(page); err != nil {
		panic(err)
	}
}

/*********************
 * BookHandler takes a count and offset parameter.
 * Count is defined as the ammount of pages returned with the Book.
 * Offset the position in the database where pages will begin to be read.
 * Count and offset must be castable as an integer.
 *********************/
func BookHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	vars := mux.Vars(r)

	if !IsInt(vars["count"], vars["offset"]) {
		return
	}

	count, _ := strconv.Atoi(vars["count"])
	offset, _ := strconv.Atoi(vars["offset"])
	offset *= count

	conn, err := SQLConnect(false)
	if err != nil {
		panic(err)
	}

	book, err := GetBook(conn, offset, count)
	if err != nil {
		panic(err)
	} else if err := json.NewEncoder(w).Encode(book); err != nil {
		panic(err)
	}
}

/*********************
 * RegisterHandler takes a username, email, password, and accessCode.
 * If the parameters do not reach the standards of FieldCheck() then
 * a custom error object (Params) will be returned explaining the errors.
 * If the paramters reach the standards of FieldCheck() the user will be
 * registered and a unique session string will be returned.
 *********************/
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	r.ParseForm()
	username := r.Form.Get("username")
	email := r.Form.Get("email")
	password := r.Form.Get("password")
	accessCode := r.Form.Get("accessCode")
	
	conn, err := SQLConnect(false)
	if err != nil {
		panic(err)
	}

	params := FieldCheck(conn, username, email, password, accessCode)
	if params.Valid {
		session, err := Register(conn, username, email, accessCode, password)
		if err != nil {
			fmt.Fprintln(w, `{"valid":false}`)
			panic(err)
		} else {
			fmt.Fprintln(w, `{"session": "`+string(session)+`", "valid":true}`)
		}
	} else {
		if err := json.NewEncoder(w).Encode(params); err != nil {
			panic(err)
		}
	}
}

/*********************
 * LoginHandler takes a key and password. The key can be a username, email,
 * or session. If the database does not contain any matches then an invalid
 * JSON message will be returned. If there is a match in the database, a
 * new session will be attached to the user and returned as a JSON object.
 *********************/
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	r.ParseForm()
	key := r.Form.Get("key")
	password := r.Form.Get("password")
	fmt.Println("key: " + key + ", password: " + password)

	conn, err := SQLConnect(false)
	if err != nil {
		panic(err)
	}

	valid, session, err := Login(conn, key, password)
	if err != nil {
		panic(err)
	}

	if valid {
		fmt.Fprintln(w, `{"session": "`+string(session)+`", "valid":true}`)
	} else {
		fmt.Fprintln(w, `{"valid":false}`)
	}
}

/*********************
 * UploadHandler recieves a username and session cookie and a name and body form.
 * It will fail if the user is not authenticated or if their is a MySQL error.
 *********************/
func UploadHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	r.ParseForm()

	name := r.Form.Get("name")
	body := r.Form.Get("body")
	fmt.Println("no username")
	username_cookie, err := r.Cookie("username")
	if err != nil {
		fmt.Fprintln(w, `{"valid":false}`)
	//	panic(err)
	}
	username := username_cookie.Value

	session_cookie, err := r.Cookie("session")
	fmt.Println("no session")

	if err != nil {
		panic(err)
	}
	session := session_cookie.Value
	conn, err := SQLConnect(false)
	if err != nil {
		fmt.Fprintln(w, `{"valid":false}`)
		panic(err)
	}
	valid, session, err := Login(conn, username, session)
	if err != nil {
		fmt.Fprintln(w, `{"valid":false}`)
		panic(err)
	}

	if valid {
		err := AddPage(conn, username, name, body)
		if err != nil {
			fmt.Fprintln(w, `{"valid":false}`)
			panic(err)
		} else {
			fmt.Fprintln(w, `{"session": "`+string(session)+`", "valid":true}`)
		}
	} else {
		fmt.Fprintln(w, `{"valid":false}`)
	}

}

/*********************
 * Replace recieves a username and session cookie and a name and body form.
 * It will fail if the user is not authenticated or if their is a MySQL error.
 *********************/
 func ReplaceHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	r.ParseForm()

	name := r.Form.Get("name")
	body := r.Form.Get("body")
	pageID := r.Form.Get("pageID")

	username_cookie, err := r.Cookie("username")
	if err != nil {
		panic(err)
	}

	username := username_cookie.Value
	session_cookie, err := r.Cookie("session")
	if err != nil {
		panic(err)
	}

	session := session_cookie.Value
	conn, err := SQLConnect(false)
	if err != nil {
		panic(err)
	}
	valid, session, err := Login(conn, username, session)
	if err != nil {
		panic(err)
	}

	if valid {
		err := UpdatePage(conn, username, name, body, pageID)
		if err != nil {
			panic(err)
		} else {
			fmt.Fprintln(w, `{"session": "`+string(session)+`", "valid":true}`)
		}
	} else {
		fmt.Fprintln(w, `{"valid":false}`)
	}

}

/*********************
 * AccessCodeHandler creates and returns a new access code.
 * THIS IS ONLY FOR DEVELOPMENT. DEPRECIATE!
 *********************/
 func AccessCodeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	conn, err := SQLConnect(false)
	if err != nil {
		panic(err)
	}

	accessCode, err := CreateAccessCode(conn)
	if err != nil {
		panic(err)
	} else {
		fmt.Fprintln(w, `{"accessCode": "` + accessCode + `", "message" : "Depreciate this API function before release!"}`)
	}
}
