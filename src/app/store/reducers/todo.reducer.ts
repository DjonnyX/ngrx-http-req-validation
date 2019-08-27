import { createReducer, on } from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import { ITodoState, todosAdapter } from '../state/todo.state';

/**
 * Initial state
 */
export const initialState: ITodoState = todosAdapter.getInitialState({
  loading: false,
  error: null,
});

/**
 * The todo collection reducer
 */
export const todosReducer = createReducer(
  initialState,
  on(TodoActions.getAllRequest, TodoActions.addRequest, TodoActions.updateRequest, TodoActions.deleteRequest, (state) => {
    return {
      ...state, ...{
        loading: true
      }
    };
  }),
  on(TodoActions.getAllError, TodoActions.addError, TodoActions.updateError, TodoActions.deleteError, (state, { error }) => {
    return {
      ...state, ...{
        error,
        loading: false
      }
    };
  }),
  on(TodoActions.getAllSuccess, (state, { todos }) => {
    return {
      ...todosAdapter.addAll(todos, state),
      loading: false
    };
  }),
  on(TodoActions.addSuccess, (state, { todo }) => {
    return {
      ...todosAdapter.addOne(todo, state),
      loading: false
    };
  }),
  on(TodoActions.updateSuccess, (state, { update }) => {
    return {
      ...todosAdapter.updateOne(update, state),
      loading: false
    };
  }),
  on(TodoActions.deleteSuccess, (state, { id }) => {
    return {
      ...todosAdapter.removeOne(id, state),
      loading: false
    };
  })
);
