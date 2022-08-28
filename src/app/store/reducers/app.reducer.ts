import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions/app.actions';

export interface AppState {
  isLoading: boolean;
  showSidebar: boolean;
}

const initialState: AppState = {
  isLoading: true,
  showSidebar: true,
};

export const appReducer = createReducer(
  initialState,
  on(
    actions.setIsLoading,
    (state, action): AppState => ({
      ...state,
      isLoading: action.isLoading,
    })
  ),
  on(
    actions.toggleSidebar,
    (state): AppState => ({
      ...state,
      showSidebar: !state.showSidebar,
    })
  ),
  on(
    actions.hideSidebar,
    (state): AppState => ({
      ...state,
      showSidebar: false,
    })
  )
);
