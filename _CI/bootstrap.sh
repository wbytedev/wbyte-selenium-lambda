#!/bin/bash
set -e

if [[ -d "src" ]]; then
    echo "Nothing to bootstrap for now.."
fi

if [[ -d "infra" ]]; then
    cd infra

    echo "Global install AWS CDK version ${CDK_VERSION}.."

    npm i -g aws-cdk@${CDK_VERSION}
    npm ci --include=dev

    echo "Synthing infra.."

    npm run cdk synth -- \
        --context accountId=${AWS_ACCOUNT_ID} \
        --context region=${AWS_REGION} \
        --context name=${API_KEY} \
        --context applicationTag=$APPLICATION_TAG}
fi