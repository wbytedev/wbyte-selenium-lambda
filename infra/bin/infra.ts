#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();

const props = {
    name: app.node.tryGetContext("name"),
    apiKey: app.node.tryGetContext("apiKey"),
    applicationTag: app.node.tryGetContext("applicationTag"),
    env: {
        account: app.node.tryGetContext("accountId"),
        region: app.node.tryGetContext("region"),
    }
};

const fullName = `${props.applicationTag}-${props.name}`;
const pascalCaseFullName = fullName.split("-")
    .map((word, index) =>
        index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

const infraStack = new InfraStack(
    app,
    pascalCaseFullName,
    {
        ...props,
        fullName: fullName,
        pascalCaseFullName: pascalCaseFullName
    }
);

cdk.Tags.of(infraStack).add("Customer", props.applicationTag);