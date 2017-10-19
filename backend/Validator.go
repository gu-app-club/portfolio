package main

type Validator struct {
	Valid   bool     `json:"valid"`
	Message []string `json:"message"`
}

type Params struct {
	Username   Validator `json:"username"`
	Email      Validator `json:"email"`
	Password   Validator `json:"password"`
	AccessCode Validator `json:"accessCode"`
	Valid      bool      `json:"valid"`
}
