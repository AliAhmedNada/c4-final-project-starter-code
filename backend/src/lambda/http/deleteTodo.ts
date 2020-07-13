import 'source-map-support/register'
import {
  deleteTodo
} from '../../businessLogic/todos'

import * as middy from 'middy';
import {
  cors
} from 'middy/middlewares';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'


const deleteTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise < APIGatewayProxyResult > => {
  const todoId = event.pathParameters.todoId

  const authorization = event.headers.Authorization;
  const split = authorization.split(' ')
  const jwtToken = split[1]

  await deleteTodo(todoId, jwtToken);

  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", 
  },
    body: ''
  };
}

export const handler = middy(deleteTodoHandler).use(cors({
  credentials: true
}));