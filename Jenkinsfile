pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Yukarıda tanımladığın isim
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                sh 'npx cucumber-js --tags @login --format html:cucumber-report.html'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: '.', 
                    reportFiles: 'cucumber-report.html', 
                    reportName: 'Cucumber Test Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }
    }
}
