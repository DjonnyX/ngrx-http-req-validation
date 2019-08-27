import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '@app/models';
import { HttpClient } from '@angular/common/http';

/**
 * Base url
 */
const BASE_URL = 'api/';

/**
 * Api routes of todos
 */
export const TODOS_ROUTES = {
  todoEntities: `${BASE_URL}todos/`
};

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<ITodo[]> {
    return this._http.get<ITodo[]>(TODOS_ROUTES.todoEntities);
  }

  get(id: number): Observable<ITodo[]> {
    return this._http.get<ITodo[]>(`${TODOS_ROUTES.todoEntities}${id}`);
  }

  create(todo: ITodo): Observable<ITodo> {
    return this._http.post<ITodo>(TODOS_ROUTES.todoEntities, todo);
  }

  update(todo: Partial<ITodo>): Observable<ITodo> {
    return this._http.put<ITodo>(`${TODOS_ROUTES.todoEntities}${todo.id}`, { todo });
  }

  delete(id: number): Observable<ITodo> {
    return this._http.delete<ITodo>(`${TODOS_ROUTES.todoEntities}${id}`);
  }
}
