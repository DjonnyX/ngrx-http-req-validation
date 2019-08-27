import { HttpRequest } from '@angular/common/http';
import { ITodo } from '@app/models';

/**
 * Min name chars
 */
export const TODO_NAME_MIN_LENGTH = 5;

/**
 * The getAllTodo request validator
 */
export function validateGetAllTodoRequest(req: HttpRequest<void>) {
}

/**
 * The CreateTodo request validator
 */
export function validateCreateTodoRequest(req: HttpRequest<ITodo>) {
  const todo = req.body;

  _validateTodoEntity(todo);
  _validateTodoName(todo);
}

/**
 * The UpdateTodo request validator
 */
export function validateUpdateTodoRequest(req: HttpRequest<ITodo>) {
  const todo = req.body;

  _validateTodoEntity(todo);
  _validateTodoId(todo);
  _validateTodoName(todo);
}

/**
 * The DeleteTodo request validator
 */
export function validateDeleteTodoRequest(req: HttpRequest<undefined>) { }

function _validateTodoEntity(todo: ITodo) {
  if (!todo) {
    throw Error('The request body is not defined.');
  }
}

function _validateTodoId(todo: ITodo) {
  if (todo.id === undefined) {
    throw Error('Property "id" should be defined.');
  }

  const id = todo.id;
  if ((id as any) instanceof Number) {
    throw Error('Property "id" should be a number type.');
  }
}

function _validateTodoName(todo: ITodo) {
  if (todo.name === undefined) {
    throw Error('Property "name" should be defined.');
  }

  const name = todo.name;
  if ((name as any) instanceof String) {
    throw Error('Property "name" should be a string type.');
  }

  if (name.length < TODO_NAME_MIN_LENGTH) {
    throw Error(`Property "name" should be large that ${TODO_NAME_MIN_LENGTH - 1}.`);
  }
}
