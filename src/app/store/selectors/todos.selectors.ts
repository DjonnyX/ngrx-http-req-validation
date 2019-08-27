
import { IAppState } from '../state';
import { todosAdapter } from '../state/todo.state';

export const selectTodos = (state: IAppState) => state.todos;


export const {
  selectAll,
  selectTotal,
  selectEntities
} = todosAdapter.getSelectors(selectTodos);

/*export const getVisibleTodos = createSelector(
  getAllTodos,
  getRouterState,
  (todos, router) => {
    if (router.state) {
      if (router.state.params) {
        const filter = router.state.params.filter;
        switch (filter) {
          default:
            return todos;
          case 'completed':
            return todos.filter(t => t.completed);
          case 'active':
            return todos.filter(t => !t.completed);
        }
      }
      return todos;
    }
    return [];
  }
);*/
