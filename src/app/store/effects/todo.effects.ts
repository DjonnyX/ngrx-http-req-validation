import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { TodosService } from '@app/services/todos.service';
import * as TodoActions from '../actions/todo.actions';

/**
 * Side effects
 */
@Injectable()
export default class TodosEffects {

  constructor(
    private _actions$: Actions,
    private _todosService: TodosService
  ) { }

  getAllRequest = createEffect(() => this._actions$.pipe(
    ofType(TodoActions.getAllRequest),
    switchMap(() => {
      return this._todosService.getAll()
        .pipe(
          mergeMap((todos) => [
            TodoActions.getAllSuccess({ todos }),
          ]),
          catchError(error => of(TodoActions.getAllError({ error }))),
        );
    }),
  ));

  addTodoRequest$ = createEffect(() => this._actions$.pipe(
    ofType(TodoActions.addRequest),
    switchMap((action) => {
      return this._todosService.create(action.todo)
        .pipe(
          mergeMap((todo) => [
            TodoActions.addSuccess({ todo }),
          ]),
          catchError(error => of(TodoActions.addError({ error }))),
        );
    }),
  ));

  updateTodoRequest$ = createEffect(() => this._actions$.pipe(
    ofType(TodoActions.updateRequest),
    switchMap((action) => {
      const update = action.update;
      return this._todosService.update(update.changes)
        .pipe(
          mergeMap(() => [
            TodoActions.updateSuccess({ update }),
          ]),
          catchError(error => of(TodoActions.updateError({ error }))),
        );
    }),
  ));

  deleteTodoRequest$ = createEffect(() => this._actions$.pipe(
    ofType(TodoActions.deleteRequest),
    switchMap((action) => {
      const id = action.id;
      return this._todosService.delete(id)
        .pipe(
          mergeMap(() => [
            TodoActions.deleteSuccess({ id }),
          ]),
          catchError(error => of(TodoActions.deleteError({ error }))),
        );
    }),
  ));
}
