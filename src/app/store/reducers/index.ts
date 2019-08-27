import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state';
import { todosReducer } from './todo.reducer';

const rootReducer: ActionReducerMap<IAppState> = {
  todos: todosReducer
};
export default rootReducer;
