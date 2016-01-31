#!/bin/bash

if [[ $# -eq 0 ]] ; then
      echo 'usage: ./cheatDeploy.sh <commit message>'
          exit 0
        fi

grunt build;
cp -rf dist/ ../deployCandyDance/dist/
ls -la ../deployCandyDance/dist/
git --git-dir=$HOME/git/deployCandyDance/.git add .
git --git-dir=$HOME/git/deployCandyDance/.git commit -m "$1"
git --git-dir=$HOME/git/deployCandyDance/.git push heroku master
