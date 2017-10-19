#!/bin/bash
go build -o ./dist/web-server;
echo build successful; 
echo running tests; 
go test -v; 
echo running server;
./dist/web-server
