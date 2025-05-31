const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: '.', // cucumber-report.json bu klasörde olmalı
  reportPath: './report',
  metadata: {
    browser: {
      name: 'chrome',
      version: '120'
    },
    device: 'Jenkins Agent',
    platform: {
      name: 'macOS',
      version: '13'
    }
  },
  customData: {
    title: 'Test Bilgileri',
    data: [
      { label: 'Proje', value: 'Cucumber Playwright' },
      { label: 'Ortam', value: 'Jenkins' },
      { label: 'Test Tarihi', value: new Date().toLocaleString('tr-TR') }
    ]
  }
});
