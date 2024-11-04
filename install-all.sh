#!/bin/bash

# Run npm install in the root directory first
echo "Running npm install in the root directory"
npm install

# Iterate through each subdirectory in the current directory
for dir in */ ; do
  if [ -d "$dir" ]; then
    # Check if a package.json file exists in the subdirectory
    if [ -f "$dir/package.json" ]; then
      echo "Running npm install in $dir"
      # Navigate to the subdirectory, run npm install, then return to the root
      (cd "$dir" && npm install)
    else
      echo "No package.json found in $dir, skipping..."
    fi
  fi
done
