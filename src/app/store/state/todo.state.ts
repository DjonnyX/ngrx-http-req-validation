import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ITodo } from '@app/models';

/**
 * Todo state
 */
export interface ITodoState extends EntityState<ITodo> {
  loading: boolean;
  error: string;
}

/**
 * Entities adapter
 */
export const todosAdapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>();
