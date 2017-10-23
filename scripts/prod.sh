#!/bin/bash

# For explaination of how this works, see
# https://stackoverflow.com/questions/3004811/how-do-you-run-multiple-programs-in-parallel-from-a-bash-script

(cd ~/portfolio/frontend; yarn build; yarn start -p 80) &   # Run frontend  
(cd ~/portfolio/backend; sh ./build.sh) &&  # Run backend
fg # Layer in the forground 
