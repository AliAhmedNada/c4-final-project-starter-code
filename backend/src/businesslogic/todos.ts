import { TodoItem } from '../models/TodoItem'
import { TodoAccess} from '../dataLayer/TodoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodoAccess()

export async function getTodos(userId: string): Promise<TodoItem[]> {
  return todoAccess.getTodos(userId)
}

export async function createTodo(userId: string, newTodo: CreateTodoRequest): Promise<string> {
  return await todoAccess.createTodo(userId,newTodo)
}

export async function deleteTodo(todoId: string){
  return todoAccess.deleteTodo(todoId)
}

export async function updateTodo(todoId: string, updatedTodo: UpdateTodoRequest){
  return todoAccess.updateTodo(todoId,updateTodo);
}

export async function updateTodoAttachmentUrl(todoId: string, attachmentUrl: string){
  return todoAccess.updateTodoAttachmentUrl(todoId,attachmentUrl);
}