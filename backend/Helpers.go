package main

import (
	"strconv"
	"strings"
	"unicode"

	"golang.org/x/crypto/bcrypt"
	"github.com/siddontang/go-mysql/client"
	"github.com/goware/emailx"

)

/*********************
 * IsInt checks if a collection of strings is castable as an int.
 *********************/
func IsInt(inputs ...string) bool {
	for _, i := range inputs {
		_, e := strconv.Atoi(i)
		if e != nil {
			return false
		}
	}
	return true
}

/*********************
 * StripSpaces strips all spaces from a string.
 *********************/
func StripSpaces(str string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsSpace(r) {
			return -1
		}
		return r
	}, str)
}

/*********************
 * GenerateHash creates a hash with a baked salt from a given password.
 *********************/
func GenerateHash(password string) string {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword)
}

/*********************
 * CompareHash checks if a hashedPassword is equal to an un-hashed password
 *********************/
func CompareHash(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return (err == nil)
}

/*********************
 * FieldCheck checks if provided parameters are valid for registration.
 *********************/
func FieldCheck(conn *client.Conn, username string, email string, password string, accessCode string) (Params) {
	params := Params{
		Valid:      true,
		Username:   Validator{Valid: true},
		Email:      Validator{Valid: true},
		Password:   Validator{Valid: true},
		AccessCode: Validator{Valid: true},
	}

	userExists, err := FieldExists(conn, "username", username, "users")
	if err != nil{
		panic(err)
	}

	if userExists {
		params.Username.Valid = false
		params.Username.Message = append(params.Username.Message, "Username taken.")
		params.Valid = false
	}

	if len(username) == 0 {
		params.Username.Valid = false
		params.Username.Message = append(params.Username.Message, "Username cannot be empty.")
		params.Valid = false
	}

	emailExists, err := FieldExists(conn, "email", email, "users")
	if err != nil{
		panic(err)
	}

	if emailExists {
		params.Email.Valid = false
		params.Email.Message = append(params.Email.Message, "Email taken.")
		params.Valid = false
	}


	if emailx.Validate(email) != nil {
		params.Email.Valid = false
		params.Email.Message = append(params.Email.Message, "Invalid email.")
		params.Valid = false
	}

	if len(password) == 0 {
		params.Password.Valid = false
		params.Password.Message = append(params.Password.Message, "Password cannot be empty.")
		params.Valid = false
	}

	if err != nil {
		panic(err)
	}
	accessCodeValid, err := AccessCodeValid(conn, accessCode)
	if err != nil{
		panic(err)
	}
	if len(accessCode) == 0 || !accessCodeValid {
		params.AccessCode.Valid = false
		params.AccessCode.Message = append(params.AccessCode.Message, "Access code invalid.")
		params.Valid = false
	}

	return params
}
