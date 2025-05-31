const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: '.', // cucumber-report.json burada
  reportPath: './report', // HTML rapor buraya yazılır
  metadata:{
    browser: {
        name: 'chrome',
        version: '120'
    },
    device: 'Local test machine',
    platform: {
        name: 'macOS',
        version: '12.7.4'
    }
  },
  customData: {
    title: 'Test Bilgileri',
    data: [
      {label: 'Proje', value: 'Cucumber Playwright Tests'},
      {label: 'Ortam', value: 'Jenkins / MacOS'},
      {label: 'Test Tarihi', value: new Date().toLocaleString()},
    ]
  }
});
