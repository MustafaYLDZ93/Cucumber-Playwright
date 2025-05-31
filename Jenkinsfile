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
                    // JSON çıktısı oluştur
                    sh "npx cucumber-js ${tagOption} --format json:report/cucumber-report.json --format html:cucumber-report.html"
                }
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'cucumber-report/**'
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
