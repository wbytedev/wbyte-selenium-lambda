#!/bin/bash
set -e

if [[ -d "infra" ]]; then
    cd infra

    npm run cdk deploy -- \
        --context accountId=${AWS_ACCOUNT_ID} \
        --context region=${AWS_REGION} \
        --context name=${NAME} \
        --context domainName=${DOMAIN_NAME} \
        --context applicationTag=${APPLICATION_TAG} \
        --context hostedZone=${HOSTED_ZONE} \
        --context sourcePath=${SOURCE_PATH} \
        --all \
        --require-approval never
fi