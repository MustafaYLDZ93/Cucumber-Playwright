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
                        sh """
                            npx cucumber-js ${tagOption} \
                                --format json:reports/cucumber-report.json \
                                --format html:reports/cucumber-report.html \
                                --format junit:reports/cucumber-junit.xml \
                                --format progress
                        """
                    } catch (Exception e) {
                        currentBuild.result = 'UNSTABLE'
                        echo "Tests failed but continuing pipeline: ${e.getMessage()}"
                    }
                }
            }
        }
        
        stage('Publish Reports') {
            steps {
                script {
                    // Cucumber Reports Plugin
                    if (fileExists('reports/cucumber-report.json')) {
                        cucumber buildStatus: 'UNSTABLE',
                                reportTitle: 'Cucumber Test Report',
                                fileIncludePattern: 'reports/cucumber-report.json',
                                trendsLimit: 10,
                                classifications: [
                                    [
                                        'key': 'Browser',
                                        'value': 'Chrome'
                                    ],
                                    [
                                        'key': 'Environment', 
                                        'value': 'Test'
                                    ]
                                ]
                    }
                    
                    // JUnit Test Results
                    if (fileExists('reports/cucumber-junit.xml')) {
                        junit 'reports/cucumber-junit.xml'
                    }
                    
                    // HTML Publisher (alternatif)
                    if (fileExists('reports/cucumber-report.html')) {
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports',
                            reportFiles: 'cucumber-report.html',
                            reportName: 'Cucumber HTML Report',
                            reportTitles: 'Test Results'
                        ])
                    }
                    
                    // Artifact'ları arşivle
                    archiveArtifacts artifacts: 'reports/*', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
            // Test sonuçlarını temizle (isteğe bağlı)
            sh 'mkdir -p reports'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        unstable {
            echo 'Pipeline unstable - some tests failed'
        }
    }
}