import { Duration, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { LambdaIntegration, LambdaRestApi, Period, RateLimitedApiKey } from 'aws-cdk-lib/aws-apigateway';
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface InfraStackProps extends StackProps {
  applicationTag: string;
  apiKey: string;
  fullName: string;
  pascalCaseFullName: string;
}

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const lambdaFunction = new DockerImageFunction(this, `${props.pascalCaseFullName}SeleniumLambda`, {
      code: DockerImageCode.fromImageAsset("../src"),
      timeout: Duration.seconds(40),
      functionName: `${props.fullName}-function`,
      memorySize: 512,
      logRetention: RetentionDays.ONE_WEEK
    });

    Tags.of(lambdaFunction).add("Customer", props.applicationTag);

    const gateway = new LambdaRestApi(this, `${props.pascalCaseFullName}Gateway`, {
      handler: lambdaFunction,
      proxy: false
    });

    Tags.of(gateway).add("Customer", props.applicationTag);

    const integration = new LambdaIntegration(lambdaFunction);
    gateway.root.addMethod("GET", integration, {
      apiKeyRequired: true
    });

    const usagePlan = gateway.addUsagePlan(`${props.pascalCaseFullName}UsagePlan`, {
      name: `${props.fullName}-usage-plan`,
      quota: {
        limit: 100,
        period: Period.DAY
      }
    });

    const apiKey = gateway.addApiKey(`${props.pascalCaseFullName}ApiKey`, {
      apiKeyName: `${props.fullName}-api-key`,
      value: props.apiKey
    });

    usagePlan.addApiKey(apiKey);

    usagePlan.addApiStage({
      stage: gateway.deploymentStage,
    });
  }
}
