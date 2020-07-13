import 'source-map-support/register'
import {
  setItemUrl
} from '../../businessLogic/todos'

import * as AWS from 'aws-sdk'
import * as middy from 'middy'
import {
  cors
} from 'middy/middlewares'
import * as AWSXRay from 'aws-xray-sdk'
import * as uuid from 'uuid';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'

const bucketName = process.env.ATTACHMENTS_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})

function getUploadUrl(imageId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration
  })
}

// We don't create the uploaded image until the user edits the item so we need to upload it here instead and set it...
const getUploadUrlHandler = middy(async (event: APIGatewayProxyEvent): Promise < APIGatewayProxyResult > => {
  console.log(event)
  const todoId = event.pathParameters.todoId
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const id = uuid.v4();
  setItemUrl(todoId, `https://${bucketName}.s3.amazonaws.com/${id}`, jwtToken);

  const url = getUploadUrl(id)

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", 
  },
    body: JSON.stringify({
      uploadUrl: url
    })
  }
})

export const handler = middy(getUploadUrlHandler).use(cors({
  credentials: true
}));