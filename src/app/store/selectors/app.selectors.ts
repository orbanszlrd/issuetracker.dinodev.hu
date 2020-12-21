import { createSelector } from '@ngrx/store';

export const isLoading = createSelector(
  (state: any) => state['app'],
  (app) => app.isLoading
);

export const showSidebar = createSelector(
  (state: any) => state['app'],
  (app) => app.showSidebar
);
