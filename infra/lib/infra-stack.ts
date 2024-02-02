import { Duration, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { LambdaIntegration, LambdaRestApi, Period, RateLimitedApiKey } from 'aws-cdk-lib/aws-apigateway';
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface InfraStackProps extends StackProps {
  name: string;
  applicationTag: string;
  apiKey: string;
}

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const fullName = `${props.applicationTag}-${props.name}`;
    const pascalCaseFullName = fullName.split('-')
      .map((word, index) =>
        index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');

    const lambdaFunction = new DockerImageFunction(this, `${pascalCaseFullName}SeleniumLambda`, {
      code: DockerImageCode.fromImageAsset("../src"),
      timeout: Duration.seconds(10),
      functionName: `${fullName}-function`,
      memorySize: 512, // TODO: lambda power tuning
      logRetention: RetentionDays.ONE_WEEK
    });

    const gateway = new LambdaRestApi(this, `${pascalCaseFullName}Gateway`, {
      handler: lambdaFunction,
      proxy: false
    });
    const integration = new LambdaIntegration(lambdaFunction);
    gateway.root.addMethod("GET", integration, {
      apiKeyRequired: true
    });

    const usagePlan = gateway.addUsagePlan(`${pascalCaseFullName}UsagePlan`, {
      name: `${fullName}-usage-plan`,
      quota: {
        limit: 100,
        period: Period.DAY
      }
    });

    const apiKey = gateway.addApiKey(`${pascalCaseFullName}ApiKey`, {
      apiKeyName: `${fullName}-api-key`,
      value: props.apiKey
    });

    usagePlan.addApiKey(apiKey);

    usagePlan.addApiStage({
      stage: gateway.deploymentStage,
    });

    // TODO: Apply tags to lambda, to gateway and ECR? If possible
  }
}
