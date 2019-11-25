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
