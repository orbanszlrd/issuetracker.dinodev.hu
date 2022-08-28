import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

export const isLoading = createSelector(
  (state: { app: AppState }) => state.app,
  (app) => app.isLoading
);

export const showSidebar = createSelector(
  (state: { app: AppState }) => state.app,
  (app: AppState) => app.showSidebar
);
