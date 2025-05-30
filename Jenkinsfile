pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Check Node.js') {
            steps {
                script {
                    sh '''
                        echo "Checking Node.js installation..."
                        if command -v node > /dev/null 2>&1; then
                            echo "Node.js is already installed"
                            node --version
                            npm --version
                        else
                            echo "Node.js not found. Please install Node.js manually or use a different approach."
                            exit 1
                        fi
                    '''
                }
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
                        sh 'npx cucumber-js --tags @login --format html:cucumber-report.html'
                    } catch (Exception e) {
                        currentBuild.result = 'UNSTABLE'
                        echo "Tests failed: ${e.getMessage()}"
                    }
                }
            }
        }
        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'cucumber-report.html', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed'
        }
        cleanup {
            cleanWs()
        }
    }
}