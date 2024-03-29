import { createAction, props } from '@ngrx/store';

import { Board } from '../../models/board.model';
import { BoardState } from '../reducers/board.reducer';

export const selectData = createAction(
  '[Boards Page] Select data',
  props<{ projectId: string }>()
);

export const selectSuccess = createAction(
  '[Boards Page] Select data success',
  props<BoardState>()
);

export const insertData = createAction(
  '[Boards Page] Insert data',
  props<{ board: Board }>()
);

export const insertSuccess = createAction('[Boards Page] Successful insert');

export const updateData = createAction(
  '[Boards Page] Update data',
  props<{ board: Board }>()
);

export const updateSuccess = createAction('[Boards Page] Successful update');

export const deleteData = createAction(
  '[Boards Page] Delete data',
  props<{ board: Board }>()
);

export const deleteSuccess = createAction('[Boards Page] Successful delete');
