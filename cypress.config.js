const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require("cypress-sql-server");
const excelToJson = require("convert-excel-to-json");
const fs = require('fs');

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

  //for sql server
  //config.db: { //provide sqlserver credentials to activate the plugin
    //userName: "",
    //password: "",
    //server: "",
    //options: {
        //database: "",
        //encrypt: true,
        //rowCollectionOnRequestCompletion: true
    //}
    //}
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  on('task', { //task to convet excel to json
    excelToJsonConverter(filePath)
    {
      const result = excelToJson({
      source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
    });
    return result;
    }
  })  

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;

  // implement node event listeners here
  //require('cypress-mochawesome-reporter/plugin')(on); //help link: https://www.npmjs.com/package/cypress-mochawesome-reporter
}



module.exports = defineConfig({

  // Added manually to increase timeout threshold when web page takes time to return result; for spec level also update done by providing value in spec file
  defaultCommandTimeout: 6000,

  //access cypress cloud
  projectId: "a5bwmx",

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Mochawesome Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  }, //adding event listener

  env: {
      url: "https://rahulshettyacademy.com",
      xMattersURL: "https://flow-company.tst.xmatters.com/xmatters/signOn.do"
  },

  retries: {
    runMode: 1, // for failed test rerun for 1 time
    //openMode: 0
  },


  e2e: {
      setupNodeEvents,     //load plugin
      specPattern: 'cypress/integration/xMatters/*.js' //Run feature files for Cucumber BDD 
      //specPattern: 'cypress/integration/xMatters/*.js' //scan any file which has .js extension for Mocha framework



    },

    
  },
);
