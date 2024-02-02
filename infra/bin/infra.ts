#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();

const props = {
    name: app.node.tryGetContext("name"),
    apiKey: app.node.tryGetContext("apiKey"),
    applicationTag: app.node.tryGetContext("applicationTag"), // Client tag here?
    costTag: app.node.tryGetContext("CostTag"),
    env: {
        account: app.node.tryGetContext("accountId"),
        region: app.node.tryGetContext("region"),
    }
};

new InfraStack(
    app,
    `${props.applicationTag}-${props.name}`,
    {
        ...props
    }
);
