# oekocap_calculator

#### Notes for development
By default, every page will redirect to /start, users should start there and continue through the input pages.  
To access any page when developing, comment out the redirecting-code in the mounted() function of the page you want to access. Every page has a corresponding file under root/views.

When developing the results-page, follow these steps:

- ResultsView.vue → mounted() → comment out the router.push line.
- Results.vue → mounted() → comment out the “if(startedCorrectly) return” line and comment in actual_output = test_output
- Results_footer.vue → mounted() → comment in actual_input = test_input
- Start.vue → comment in example button in template
- When done developing don’t forget to undo the steps above!

Whenever a new production build is built on the server, two files need to be copied manually into the dist folder: call_server.php and server.conf. These files are found on the server in a different folder. Make sure you don't delete these files in the original folder!  

seite ist unter http://oekocap.org und https://oekocap.org erreichbar. “calculate” funtkioniert nur auf der https seite.
Currently both http://oekocap.org and https://oekocap.org serve the website but only https://oekocap.org can call the server when pressing 'calculate' on the processing-site.

#### Pre-requirements
Node.js installed

#### Project setup
Clone git repository into a folder:
```
git clone repository-url
```  
Navigate inside that folder and install project dependencies:
```
npm install
```

#### Development
Start development server (compiles and hot-reloads):
```
npm run serve
```

#### Compiling the production build
Builds for production. Places files in the dist folder.
```
npm run build
```
Testing the production build locally with the 'serve' npm package.  
Install the serve package, navigate into project folder and run `serve dist`
```
npm install serve
serve dist
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
