#!/bin/bash

# For explaination of how this works, see
# https://stackoverflow.com/questions/3004811/how-do-you-run-multiple-programs-in-parallel-from-a-bash-script
(cd ~/portfolio/frontend; yarn prod) &   # Run frontend  
(cd ~/portfolio/backend; yarn prod) &&  # Run backend
fg # Layer in the forground 
