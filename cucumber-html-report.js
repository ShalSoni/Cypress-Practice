const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/cucumberReports",
  reportPath: "cypress/cucumberReports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "60",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cucumber project" },
      { label: "Release", value: "1.0" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: "Jul 31st 2024, 02:31 PM EST" },
      { label: "Execution End Time", value: "Jul 31st 2024, 02:56 PM EST" },
    ],
  },
});