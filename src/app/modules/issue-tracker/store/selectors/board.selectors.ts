import { createSelector } from '@ngrx/store';

export const getBoards = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker: any) => issuetracker.boards.data
);
