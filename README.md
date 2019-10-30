# Murder at Fieri Manor
> [based on the Table Top Game with the same name, by Silly Goose](https://sillygoosecontent.com/wp-content/uploads/2019/03/FreeRPG_MurderatFieriManor_SECONDDRAFT.pdf)

## requirements
* node LTS

## setup steps
1) run `npm install yarn -g`
    * not needed if you already have yarn installed globally
1) run `yarn install` to install dependencies

## running the server locally
1) run `yarn start` to start the app
1) browse to `http://localhost:8093/`

## code quality checks
1) run `yarn test` to run all unit tests
    * `-s <file>` option will test a single class
    * `-c` option will output coverage report
    * `-o` option in conjunction with `-c` will automatically open the html report
1) run `yarn lint` to run linter
    * `-f` to attempt to auto-fix some linting errors
1) run `yarn build` to make sure there are no compilation errors
1) run `yarn snyk-test` to run through snyk vulnerability analyzer
    * you may need to set up an account to run this locally
1) run `yarn prepush` to run all pre-push hooks

## contributing
* code is expected to be linted and 100% unit tested before committing, or have a damn good reason why it's excluded from coverage report

## current dependencies TODO
* environment
    * `nodemon` - watch files in dev to restart server
    * `typescript`/`ts-node` - compiling and running the app
* build tools
    * `yargs` - command line arguments for CLI commands
    * `yarn` - package manager and CLI convenience commands
* quality checks
    * `tslint` - code styling checks
    * `jest` - unit test framework
    * `snyk` - vulnerability scan
    * `gulp` - report files that aren't unit tested
* application
    * `aws-sdk` - connection to DB
    * `express` - web server framework
    * `inversify` - DI container
    * `bcryptjs` - hashing passwords
    * `uuid` - generating unique ids
    * `moment` - processing timestamps
    * `dotenv` - dev environment variables
* logging
    * `pino` - fast logging library
    * `pump`/`through2`/`split2`/`chalk`/`stringify-object`
        * offloaded processing of log messages
