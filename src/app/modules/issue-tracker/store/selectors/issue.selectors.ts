import { createSelector } from '@ngrx/store';

export const getIssues = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker: any) => issuetracker.issues.data
);
