import { ITodo } from '@app/models';

let nextId = 4;

/**
 * This is a simple mock database with initialState
 */
const todosDb: ITodo[] = [
  {
    id: 0,
    name: 'todo 1'
  },
  {
    id: 1,
    name: 'todo 2'
  },
  {
    id: 2,
    name: 'todo 3'
  },
  {
    id: 3,
    name: 'todo 4'
  }
];

/**
 * create todo
 */
export function createTodo(todo: ITodo): ITodo {
  const newTodo = { ...todo };
  newTodo.id = nextId;
  todosDb.push(newTodo);

  nextId++;
  return newTodo;
}

/**
 * read all todos
 */
export function readAllTodos(): ITodo[] {
  return [...todosDb];
}

/**
 * read todo by id
 */
export function readTodo(id: number): ITodo {
  const existsTodo = todosDb.find(t => t.id === id);
  if (!existsTodo) {
    return null;
  }

  return { ...existsTodo };
}

/**
 * update todo
 * if todo not exists in the mockDb then returns null
 */
export function updateTodo(todo: ITodo): ITodo {
  const existsTodo = readTodo(todo.id);
  if (!existsTodo) {
    return null;
  }

  for (const prop in Object.keys(todo)) {
    if (prop === 'id') {
      continue;
    }

    existsTodo[prop] = todo[prop];
  }

  return existsTodo;
}

export function deleteTodo(id: number): number {
  const todoIndex = todosDb.findIndex(t => t.id === id);
  if (todoIndex === -1) {
    throw Error(`Todo item with id=${String(id)} is not exists.`);
  }

  todosDb.splice(0, 1);

  return id;
}
