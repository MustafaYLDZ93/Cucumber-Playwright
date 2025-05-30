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
                            mkdir -p reports
                            npx cucumber-js ${tagOption} \
                                --format html:reports/cucumber-report.html \
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
                    
                    // HTML Report
                    if (fileExists('reports/cucumber-report.html')) {
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports',
                            reportFiles: 'cucumber-report.html',
                            reportName: 'Cucumber Test Report',
                            reportTitles: 'Test Execution Results'
                        ])
                        echo "HTML Report published successfully"
                    }
                    
                    // JSON Report için özel mesaj
                    if (fileExists('reports/cucumber-report.json')) {
                        def reportContent = readFile('reports/cucumber-report.json')
                        def jsonReport = readJSON text: reportContent
                        
                        def totalScenarios = jsonReport.size()
                        def passedScenarios = jsonReport.count { feature ->
                            feature.elements?.every { scenario ->
                                scenario.steps?.every { step -> 
                                    step.result?.status == 'passed' 
                                }
                            }
                        }
                        
                        echo "Test Summary: ${passedScenarios}/${totalScenarios} scenarios passed"
                    }
                    
                    // Artifact'ları arşivle
                    archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'All tests passed! 🎉'
        }
        unstable {
            echo 'Some tests failed, but pipeline continued'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}