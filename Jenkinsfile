pipeline {
    agent any

    parameters {
        string(name: 'CUCUMBER_TAG', defaultValue: '', description: 'Run tests with this tag (e.g., @login, @register). Leave empty to run all tests.')
    }

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh '''
                    echo "=== PATH ==="
                    echo $PATH
                    node --version
                    npm --version
                    pwd
                    ls -la
                '''
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

        stage('Run Tests') {
            steps {
                script {
                    def tagOption = params.CUCUMBER_TAG?.trim() ? "--tags ${params.CUCUMBER_TAG}" : ""
                    // Klasik HTML ve JUnit XML raporları oluştur
                    sh "npx cucumber-js ${tagOption} --format html:cucumber-report.html --format junit:cucumber-report.xml"
                }
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cucumber-report.html,cucumber-report.xml'
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit 'cucumber-report.xml'
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportName: 'Cucumber HTML Raporu',
                    reportDir: '.',
                    reportFiles: 'cucumber-report.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }

    }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
