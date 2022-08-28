import { Action, createReducer, on } from '@ngrx/store';

import * as BoardPageActions from '../actions/board.actions';
import { Board } from '../../models/board.model';

export const boardKey = 'boards';

export interface BoardState {
  data: Board[];
}

const initialState: BoardState = {
  data: [],
};

const boardReducer = createReducer(
  initialState,
  on(
    BoardPageActions.selectData,
    (state): BoardState => ({
      ...state,
    })
  ),
  on(
    BoardPageActions.selectSuccess,
    (state, action): BoardState => ({
      ...state,
      data: [...action.data],
    })
  ),
  on(
    BoardPageActions.insertData,
    (state): BoardState => ({
      ...state,
    })
  ),
  on(
    BoardPageActions.insertSuccess,
    (state): BoardState => ({
      ...state,
    })
  ),
  on(
    BoardPageActions.updateData,
    (state): BoardState => ({
      ...state,
    })
  ),
  on(
    BoardPageActions.updateSuccess,
    (state): BoardState => ({
      ...state,
    })
  ),
  on(
    BoardPageActions.deleteData,
    (state): BoardState => ({
      ...state,
    })
  ),
  on(
    BoardPageActions.deleteSuccess,
    (state): BoardState => ({
      ...state,
    })
  )
);

export function reducer(state: BoardState | undefined, action: Action) {
  return boardReducer(state, action);
}
