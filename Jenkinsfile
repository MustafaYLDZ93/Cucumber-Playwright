pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node.js') {
            steps {
                script {
                    sh '''
                    if ! command -v node > /dev/null; then
                      curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                      sudo apt-get install -y nodejs
                    fi
                    node -v
                    npm -v
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
                sh 'npx cucumber-js --tags @login --format html:cucumber-report.html'
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'cucumber-report.html'
            }
        }
    }
}
