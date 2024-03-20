import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Infra from '../lib/infra-stack';

test("Lambda and API Gateway Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infra.InfraStack(app, "MyTestStack", {
    fullName: "test-test",
    pascalCaseFullName: "TestTest",
    applicationTag: "app-tag-test",
    apiKey: "crackTheCode123"
  });
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Lambda::Function", {
    FunctionName: "test-test-function"
  });
  template.resourceCountIs("AWS::ApiGateway::Method", 1);
});
