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
                    echo "=== Node.js Check ==="
                    node --version
                    npm --version
                    echo "=== Working Directory ==="
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
                    try {
                        def tagOption = params.CUCUMBER_TAG?.trim() ? "--tags ${params.CUCUMBER_TAG}" : ""
                        sh "npx cucumber-js ${tagOption} --format html:cucumber-report.html --format junit:cucumber-report.xml"
                    } catch (Exception e) {
                        currentBuild.result = 'UNSTABLE'
                        echo "Tests failed but continuing pipeline: ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Archive Report') {
            steps {
                script {
                    if (fileExists('cucumber-report.html')) {
                        archiveArtifacts artifacts: 'cucumber-report.html'
                        echo "Report archived successfully"
                    } else {
                        echo "Report file not found"
                    }
                }
            }
        }
        stage('Publish JUnit Report') {
            steps {
                junit 'cucumber-report.xml'
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
