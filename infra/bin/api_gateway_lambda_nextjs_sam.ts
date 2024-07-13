#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayLambdaNextjsSamStack } from '../lib/api_gateway_lambda_nextjs_sam-stack';

const app = new cdk.App();
new ApiGatewayLambdaNextjsSamStack(app, 'ApiGatewayLambdaNextjsSamStack');
