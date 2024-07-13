import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apig from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigi from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';
import * as path from 'path';

const BACKEND_DIST_ROOT = '../../backend/dist';
// const CLIENT_DIST_ROOT = '../../client/dist';

export class ApiGatewayLambdaNextjsSamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apig.HttpApi(this, 'ExampleApi', {
      corsPreflight: {
        allowMethods: [apig.CorsHttpMethod.ANY],
        allowOrigins: ['*']
      }
    });

    const helloHandler = new lambda.Function(this, 'HelloHandler', {
      code: lambda.Code.fromAsset(path.join(__dirname, BACKEND_DIST_ROOT, '/handlers/hello')),
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handle',
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256
    });
    const helloIntegration = new apigi.HttpLambdaIntegration('HelloIntegration', helloHandler);
    api.addRoutes({
      path: '/hello',
      methods: [apig.HttpMethod.ANY],
      integration: helloIntegration
    });

    const worldHandler = new lambda.Function(this, 'WorldHandler', {
      code: lambda.Code.fromAsset(path.join(__dirname, BACKEND_DIST_ROOT, '/handlers/world')),
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handle',
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256
    });
    const worldIntegration = new apigi.HttpLambdaIntegration('WorldIntegration', worldHandler);
    api.addRoutes({
      path: '/world',
      methods: [apig.HttpMethod.ANY],
      integration: worldIntegration
    });
  }
}
