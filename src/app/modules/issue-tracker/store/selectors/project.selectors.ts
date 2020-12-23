import { createSelector } from '@ngrx/store';

export const getAllProjects = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker) => issuetracker.projects.data
);
