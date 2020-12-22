import { Action, createReducer, on } from '@ngrx/store';

import * as actions from '../actions/app.actions';

interface ApplicationState {
  isLoading: boolean;
  showSidebar: boolean;
}

export const initialState: ApplicationState = {
  isLoading: true,
  showSidebar: true,
};

export const appReducer = createReducer(
  initialState,
  on(actions.setIsLoading, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
  })),
  on(actions.toggleSidebar, (state) => ({
    ...state,
    showSidebar: !state.showSidebar,
  })),
  on(actions.hideSidebar, (state) => ({
    ...state,
    showSidebar: false,
  }))
);
