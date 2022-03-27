# DEPLOY

Execute a bat or bash file to deploy

## Installation

clone the repository

`git clone https://github.com/D4ITON/deploy.git`

Install dependencies

`yarn`

create a bat file with the definition of deploy and add to environment variable BASH_FILE
sample:

deploy.bat

```bash
@echo off

echo "Inicio deploy"

cd C:\app\client
git pull origin dev
yarn && yarn wdeploy

echo "Fin deploy"
```

## Usage

start service with
`yarn start`

make a post to the url:
`/deploy`

example:
`curl -X POST http://localhost:4532/deploy`

the server will respond with 'End call deploy.bat'
