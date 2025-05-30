pipeline {
    agent any

    parameters {
        string(name: 'CUCUMBER_TAG', defaultValue: '@login', description: 'Run tests with this tag (e.g., @login, @register)')
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
                        sh "npx cucumber-js --tags ${params.CUCUMBER_TAG} --format html:cucumber-report.html"
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
