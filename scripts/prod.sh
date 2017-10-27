#!/bin/bash

# For explaination of how this works, see
# https://stackoverflow.com/questions/3004811/how-do-you-run-multiple-programs-in-parallel-from-a-bash-script
(cd ~/go/src/github.com/gu-app-club/portfolio/frontend; yarn build; yarn start -p 80) &   # Run frontend  
(cd ~/go/src/github.com/gu-app-club/portfolio/backend; yarn start) &&  # Run backend
fg # Layer in the forground 
