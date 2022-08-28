import { createSelector } from '@ngrx/store';
import { Board } from '../../models/board.model';
import { IssueTrackerState } from '../reducers/index.reducer';

export const getBoards = createSelector(
  (state: { issuetracker: IssueTrackerState }) => state.issuetracker,
  (issuetracker: IssueTrackerState): Board[] => issuetracker.boards.data
);
