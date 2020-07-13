import 'source-map-support/register'
import {
  updateTodo
} from '../../businessLogic/todos'

import * as middy from 'middy';
import {
  cors
} from 'middy/middlewares';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'

import {
  UpdateTodoRequest
} from '../../requests/UpdateTodoRequest'

const updateTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise < APIGatewayProxyResult > => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ')
  const jwtToken = split[1]

  await updateTodo(todoId, updatedTodo, jwtToken);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", 
  },
  body: JSON.stringify({})
};
}

export const handler = middy(updateTodoHandler).use(cors({
  credentials: true
}));