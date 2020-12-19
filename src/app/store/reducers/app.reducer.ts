import { Action, createReducer, on } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';

interface ApplicationState {
  isLoading: boolean;
}

export const initialState: ApplicationState = {
  isLoading: true,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setIsLoading, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
  }))
);
