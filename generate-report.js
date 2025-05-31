const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './report', // Sadece report klasöründeki json dosyalarını oku
  reportPath: './cucumber-report', // Raporun çıkacağı klasör
  reportName: 'Playwright Cucumber Raporu',
  pageTitle: 'Test Raporu',
  metadata: {
    browser: {
      name: 'chrome',
      version: '120'
    },
    device: 'Local Machine',
    platform: {
      name: 'macOS',
      version: '13'
    }
  },
  customData: {
    title: 'Test Bilgileri',
    data: [
      { label: 'Proje', value: 'Cucumber Playwright' },
      { label: 'Ortam', value: 'Local' },
      { label: 'Test Tarihi', value: new Date().toLocaleString('tr-TR') }
    ]
  }
});
