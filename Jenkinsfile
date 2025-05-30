pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.40.0-focal'
            args '-u root'
        }
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
    }
}