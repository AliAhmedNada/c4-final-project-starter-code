  
import { APIGatewayProxyEvent, APIGatewayProxyResult ,APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import * as uuid from 'uuid'

import { setItemUrl } from '../../businessLogic/todos'

const bucketName = process.env.TODOITEM_S3_BUCKET_NAME
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})


export const handler : APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ')
  const jwtToken = split[1]
  async function getUploadUrl(imageId: string) {
    return await s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: imageId,
      Expires: urlExpiration
    })
  }
  const id = uuid.v4();

  setItemUrl(todoId, jwtToken,id);

  const url = await getUploadUrl(id)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'    
    },

    body: JSON.stringify({
      url
    })
  }
  }