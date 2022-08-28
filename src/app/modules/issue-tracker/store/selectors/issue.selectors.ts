import { createSelector } from '@ngrx/store';
import { Issue } from '../../models/issue.model';
import { IssueTrackerState } from '../reducers/index.reducer';

export const getIssues = createSelector(
  (state: { issuetracker: IssueTrackerState }) => state.issuetracker,
  (issuetracker: IssueTrackerState): Issue[] => issuetracker.issues.data
);
