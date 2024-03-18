# wbyte-selenium-lambda

## Overview
This repository contains the code and resources needed to deploy and run Selenium using AWS Lambda. With this setup, you can automate web testing tasks efficiently and cost-effectively.

## Requirements
Before getting started, ensure you have the following:
- AWS account
- Docker installed locally
- AWS CLI configured with appropriate permissions
- Node.js and npm installed
- GitHub account (for using GitHub Actions)

## Getting Started
1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/wbytedev/wbyte-selenium-lambda.git
   cd wbyte-selenium-lambda
2. **Set up Environment Variables**:
   Set `AWS_ACCOUNT_ID` and `AWS_REGION` in your GitHub repository secrets. These are required for assuming the role to deploy resources in your AWS account.
3. **Deploy the Infrastructure**:
   By pushing to the main branch the GitHub actions will be deploy the application, if and only if, all required environment varbiables have been set. 

## GitHub Workflow
The repository includes a GitHub Actions workflow (deploy.yml) that automates the deployment process.
Ensure that your AWS credentials are properly configured in GitHub Secrets for the workflow to execute successfully.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.