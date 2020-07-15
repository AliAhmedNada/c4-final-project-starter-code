
import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'
import * as uuid from 'uuid';


const todosAccess = new TodoAccess()

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const itemId = uuid.v4()
  const userId = parseUserId(jwtToken)
  return await todosAccess.createTodo({
    todoId: itemId,
    userId: userId,
    name: createTodoRequest.name,
    done: false,
    dueDate: createTodoRequest.dueDate,
    createdAt: new Date().toISOString()
  })
}
export async function getAllTodos(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken)
    return todosAccess.getAllTodos(userId)
}


export async function updateTodo(
  todoId: string, 
  updateTodoRequest: UpdateTodoRequest,
  jwtToken: string
): Promise<void> {
  const userId = parseUserId(jwtToken)

  const todoItem = await todosAccess.getTodoItem(todoId, userId)

  await todosAccess.updateTodo(todoItem.todoId,  todoItem.createdAt,{
    name: updateTodoRequest.name,
    done: updateTodoRequest.done,
    dueDate: updateTodoRequest.dueDate,
  })
}




export async function getTodoItem(todoId: string, jwtToken: string): Promise<TodoItem> {
  const userId = parseUserId(jwtToken)
  return await  todosAccess.getTodoItem(todoId, userId)
}



export async function deleteTodo(
  itemId: string,
  jwtToken: string
): Promise<void> {
  
  const userId = parseUserId(jwtToken)
  const todoItem = await todosAccess.getTodoItem(itemId, userId)
  await todosAccess.deleteTodo(todoItem.todoId, todoItem.userId)
}


export async function generateUploadUrl(todoId: string, jwtToken: string): Promise<string> {
  const userId = parseUserId(jwtToken)
  console.log("Setting Item URL")
  console.log(todoId)
  console.log("userId:",userId)

  return todosAccess.generateUploadUrl(todoId, userId);
}