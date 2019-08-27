import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ITodo } from '@app/models';

/**
 * Todo action types
 */
export enum TodoActionTypes {
  GET_ALL_REQUEST = 'TODO/get-all:request',
  GET_ALL_SUCCESS = 'TODO/get-all:success',
  GET_ALL_ERROR = 'TODO/get-all:error',
  ADD_REQUEST = 'TODO/add:request',
  ADD_SUCCESS = 'TODO/add:success',
  ADD_ERROR = 'TODO/add:error',
  DELETE_REQUEST = 'TODO/delete:request',
  DELETE_SUCCESS = 'TODO/delete:success',
  DELETE_ERROR = 'TODO/delete:error',
  UPDATE_REQUEST = 'TODO/update:request',
  UPDATE_SUCCESS = 'TODO/update:success',
  UPDATE_ERROR = 'TODO/update:error',
}

// Entities

// Get all todos

export const getAllRequest = createAction(
  TodoActionTypes.GET_ALL_REQUEST
);
export const getAllSuccess = createAction(
  TodoActionTypes.GET_ALL_SUCCESS,
  props<{ todos: ITodo[] }>()
);
export const getAllError = createAction(
  TodoActionTypes.GET_ALL_ERROR,
  props<{ error: string }>()
);

// Add todo

export const addRequest = createAction(
  TodoActionTypes.ADD_REQUEST,
  props<{ todo: ITodo }>()
);
export const addSuccess = createAction(
  TodoActionTypes.ADD_SUCCESS,
  props<{ todo: ITodo }>()
);
export const addError = createAction(
  TodoActionTypes.ADD_ERROR,
  props<{ error: string }>()
);

// Update todo

export const updateRequest = createAction(
  TodoActionTypes.UPDATE_REQUEST,
  props<{ update: Update<ITodo> }>()
);
export const updateSuccess = createAction(
  TodoActionTypes.UPDATE_SUCCESS,
  props<{ update: Update<ITodo> }>()
);
export const updateError = createAction(
  TodoActionTypes.UPDATE_ERROR,
  props<{ error: string }>()
);

// delete todo

export const deleteRequest = createAction(
  TodoActionTypes.DELETE_REQUEST,
  props<{ id: number }>()
);
export const deleteSuccess = createAction(
  TodoActionTypes.DELETE_SUCCESS,
  props<{ id: number }>()
);
export const deleteError = createAction(
  TodoActionTypes.DELETE_ERROR,
  props<{ error: string }>()
);
