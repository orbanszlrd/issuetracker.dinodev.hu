import { Action, createReducer, on } from '@ngrx/store';

import * as BoardPageActions from '../actions/board.actions';
import { Board } from '../../models/board.model';

export const key = 'boards';

export interface State {
  data: Board[];
}

export const initialState: State = {
  data: [],
};

const boardReducer = createReducer(
  initialState,
  on(BoardPageActions.selectData, (state) => ({
    ...state,
  })),
  on(BoardPageActions.selectSuccess, (state, action) => ({
    ...state,
    data: [...action.data],
  })),
  on(BoardPageActions.insertData, (state, action) => ({
    ...state,
  })),
  on(BoardPageActions.insertSuccess, (state, action) => ({
    ...state,
  })),
  on(BoardPageActions.updateData, (state, action) => ({
    ...state,
  })),
  on(BoardPageActions.updateSuccess, (state, action) => ({
    ...state,
  })),
  on(BoardPageActions.deleteData, (state, action) => ({
    ...state,
  })),
  on(BoardPageActions.deleteSuccess, (state, action) => ({
    ...state,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return boardReducer(state, action);
}
