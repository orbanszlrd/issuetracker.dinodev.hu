import { createAction, props } from '@ngrx/store';

import { Board } from '../../models/board.model';

export const selectData = createAction(
  '[Boards Page] Select data',
  props<{ projectId: string }>()
);

export const selectSuccess = createAction(
  '[Boards Page] Select data success',
  props<{ data: Board[] }>()
);

export const insertData = createAction(
  '[Boards Page] Insert data',
  props<{ board: Board }>()
);

export const insertSuccess = createAction('[Boards Page] Successful insert');

export const deleteData = createAction(
  '[Boards Page] Delete data',
  props<{ board: Board }>()
);

export const deleteSuccess = createAction('[Boards Page] Successful delete');
