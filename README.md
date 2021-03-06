# league-ability-quiz-api

This api provides enpoints that Scrape Mobafire.com for abilities and returns them in a nice formatted JSON.

Frontend for the league-ability-quiz available here: https://github.com/smicklas/LeagueAbilityQuiz


Based off of servreless-starter: https://github.com/AnomalyInnovations/serverless-typescript-starter

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Usage

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```
or
``` bash
$ npm run start-offline
```

Deploy your project

``` bash
$ serverless deploy
```
#### Running Tests

Run your tests using

``` bash
$ npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

#### Environment Variables

To add environment variables to your project

1. Rename `env.example` to `.env`.
2. Add environment variables for your local stage to `.env`.
3. Uncomment `environment:` block in the `serverless.yml` and reference the environment variable as `${env:MY_ENV_VAR}`. Where `MY_ENV_VAR` is added to your `.env` file.
4. Make sure to not commit your `.env`.

#### Linting

We use [ESLint](https://eslint.org) to lint your code via [serverless-bundle](https://github.com/AnomalyInnovations/serverless-bundle).

You can turn this off by adding the following to your `serverless.yml`.

``` yaml
custom:
  bundle:
    linting: false
```

To [override the default config](https://eslint.org/docs/user-guide/configuring), add a `.eslintrc.json` file. To ignore ESLint for specific files, add it to a `.eslintignore` file.