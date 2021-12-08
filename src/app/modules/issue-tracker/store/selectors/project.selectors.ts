import { createSelector } from '@ngrx/store';

export const getProjects = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker) => issuetracker.projects.data
);
