#!/bin/bash
set -e

if [[ -d "infra" ]]; then
    cd infra

    npm run cdk deploy -- \
        --context name=${APPLICATION_NAME} \
        --context accountId=${AWS_ACCOUNT_ID} \
        --context region=${AWS_REGION} \
        --context apiKey=${API_KEY} \
        --context applicationTag=${APPLICATION_TAG} \
        --all \
        --require-approval never
fi