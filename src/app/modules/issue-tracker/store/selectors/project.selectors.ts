import { createSelector } from '@ngrx/store';
import { Project } from '../../models/project.model';
import { IssueTrackerState } from '../reducers/index.reducer';

export const getProjects = createSelector(
  (state: { issuetracker: IssueTrackerState }) => state.issuetracker,
  (issuetracker: IssueTrackerState): Project[] => issuetracker.projects.data
);
