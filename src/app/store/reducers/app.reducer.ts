import { Action, createReducer, on } from '@ngrx/store';

import * as actions from '../actions/app.actions';

interface ApplicationState {
  isLoading: boolean;
}

export const initialState: ApplicationState = {
  isLoading: true,
};

export const appReducer = createReducer(
  initialState,
  on(actions.setIsLoading, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
  }))
);
