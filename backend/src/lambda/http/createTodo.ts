import 'source-map-support/register'
import {
  createTodo
} from '../../businessLogic/todos'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import {
  CreateTodoRequest
} from '../../requests/CreateTodoRequest'
import * as middy from 'middy';
import {
  cors
} from 'middy/middlewares';

const createTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise < APIGatewayProxyResult > => {

  console.log('Processing event: ', event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const item = await createTodo(newTodo, jwtToken)
  console.log(item)
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Credentials": true 
  },
    body: JSON.stringify({
      item: item
    })
  }
}

export const handler = middy(createTodoHandler).use(cors({
  credentials: true
}));