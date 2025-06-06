name: Run Tagged Cucumber + Playwright Tests

on:
  workflow_dispatch:
    inputs:
      test_tags:
        description: 'Which tags to run? (e.g. @apiLogin or @login and not @regression)'
        required: false
        default: '@login'

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install dependencies
      run: npm install

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Run Cucumber + Playwright Tests with Tag Filter
      run: |
        TAGS="${{ github.event.inputs.test_tags }}"
        if [ -z "$TAGS" ]; then
          echo "No tags provided, running all tests"
          npx cucumber-js --format html:cucumber-report.html
        else
          echo "Running tests with tags: $TAGS"
          npx cucumber-js --tags "$TAGS" --format html:cucumber-report.html
        fi

    - name: Upload Cucumber Report
      if: always()
      uses: actions/upload-artifact@v4
      with:
        name: cucumber-report
        path: cucumber-report.html

    - name: Send Slack Notification with Report Link
      if: always()
      env:
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
      run: |
        STATUS="${{ job.status }}"
        TAGS="${{ github.event.inputs.test_tags }}"
        if [ -z "$TAGS" ]; then
          TAGS="(Tüm senaryolar çalıştırıldı)"
        fi
        MESSAGE="*🎯 Cucumber + Playwright Test Sonucu:* ${STATUS}\n*🏷️ Tag Bilgisi:* \`${TAGS}\`\n*📘 Repo:* ${{ github.repository }}\n*🔗 Rapor:* <https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}|Cucumber Report (HTML)>"
        curl -X POST -H 'Content-type: application/json' \
             --data "{\"text\":\"$MESSAGE\"}" \
             "$SLACK_WEBHOOK_URL"
