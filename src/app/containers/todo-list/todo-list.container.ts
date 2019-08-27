import { Component, OnInit } from '@angular/core';
import { ITodo } from '@app/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state';
import * as TodoSelectors from '@app/store/selectors/todos.selectors';
import * as TodoActions from '@app/store/actions/todo.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.container.html',
  styleUrls: ['./todo-list.container.scss']
})
export class TodoListContainer implements OnInit {
  todos$: Observable<ITodo[]>;

  constructor(
    private _store: Store<IAppState>,
  ) {
    this.todos$ = this._store.pipe(
      select(TodoSelectors.selectAll)
    );
  }

  ngOnInit() {
    this._store.dispatch(TodoActions.getAllRequest());
  }

  onAdd(todo: ITodo) {
    const action = TodoActions.addRequest({ todo });
    this._store.dispatch(action);
  }

  onUpdate(update: Update<ITodo>) {
    const action = TodoActions.updateRequest({ update });
    this._store.dispatch(action);
  }

  onDelete(id: number) {
    const action = TodoActions.deleteRequest({ id });
    this._store.dispatch(action);
  }

}
