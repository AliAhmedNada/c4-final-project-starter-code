import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import {updateTodo} from "../../businesslogic/todos";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId;
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

  await updateTodo(todoId, updatedTodo,jwtToken);

  return {
    statusCode: 202,
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({})
  }
};