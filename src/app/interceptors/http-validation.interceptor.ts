import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { TODOS_ROUTES } from '@app/services/todos.service';
import * as HttpTodoValidatior from './validators/http-todo.validators';

/**
 * Http interceptor
 * intercept a todo req's and returns mock entities
 */
@Injectable()
export class HttpValidationInterceptor implements HttpInterceptor {

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
   * handler of todo routes
   */
  private todosHandler(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    switch (req.method) {
      case 'GET': {
        return of(HttpTodoValidatior.validateGetAllTodoRequest(req))
          .pipe(
            catchError(error => of(new HttpResponse<undefined>({ status: 300, statusText: error }))),
            mergeMap(_ => next.handle(req))
          );
      }
      case 'POST': {
        return of(HttpTodoValidatior.validateCreateTodoRequest(req))
          .pipe(
            catchError(error => of(new HttpResponse<undefined>({ status: 300, statusText: error }))),
            mergeMap(_ => next.handle(req))
          );
      }
      case 'PUT': {
        return of(HttpTodoValidatior.validateUpdateTodoRequest(req))
          .pipe(
            catchError(error => of(new HttpResponse<undefined>({ status: 300, statusText: error }))),
            mergeMap(_ => next.handle(req))
          );
      }
      case 'DELETE': {
        return of(HttpTodoValidatior.validateDeleteTodoRequest(req))
          .pipe(
            catchError(error => of(new HttpResponse<undefined>({ status: 300, statusText: error }))),
            mergeMap(_ => next.handle(req))
          );
      }
    }
  }
}
