import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TODOS_ROUTES } from '@app/services/todos.service';
import * as TodoMock from '@app/mock/todos.mock';
import { ITodo } from '@app/models';
import { request } from '@app/utils/mock-req.util';

/**
 * Http mock interceptor
 * intercept a todo req's and returns mock entities
 */
@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(TODOS_ROUTES.todoEntities)) {
      return this.todosHandler(req, next);
    }

    return next.handle(req);
  }

  /**
   * Handle todosRoutes and simulate answer from the simple mock db
   */
  private todosHandler(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    switch (req.method) {
      case 'GET':
        return request<undefined, ITodo[]>(req, TodoMock.readAllTodos);
      case 'POST':
        return request<ITodo, ITodo>(req, TodoMock.createTodo);
      case 'PUT':
        return request<ITodo, ITodo>(req, TodoMock.updateTodo);
      case 'DELETE':
        return request<number, number>(req, TodoMock.deleteTodo);
    }
  }
}
