#/bin/bash

if [[ $# -eq 0 ]] ; then
  echo 'make sure /deployCandyDance repo is in the same parent directory as this'
  echo 'usage: ./cheatDeploy.sh <commit message>'
  exit 0
fi

$HOME/git/candyritual/grunt build
cp -rf $HOME/git/candyritual/dist/ $HOME/git/deployCandyDance/dist/
ls -la $HOME/git/deployCandyDance/dist/
git --git-dir=../deployCandyDance/.git add $PWD
git --git-dir=../deployCandyDance/.git commit -m "$1"
git --git-dir=../deployCandyDance/.git push heroku master
