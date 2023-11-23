# oekocap_calculator

#### Notes for development
By default, the URL [localhost:8080/results](http://localhost:8080/results) will redirect to /start, this is because the user shouldn’t access this page before making their inputs.

When developing, one might want to access the results-page. This can be done with the following steps:

- ResultsView.vue → mounted() → comment out the router.push line.
- Results.vue → mounted() → comment out the “if(startedCorrectly) return” line and comment in actual_output = test_output
- Results_footer.vue → mounted() → comment in actual_input = test_input
- Start.vue → comment in example button in template
- When done developing don’t forget to undo the steps above!

#### Pre-requirements
Node.js installed

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
