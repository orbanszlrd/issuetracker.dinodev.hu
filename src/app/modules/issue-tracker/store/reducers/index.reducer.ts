import { ActionReducerMap } from '@ngrx/store';

import {
  reducer as projectReducer,
  projectKey,
  ProjectState,
} from './project.reducer';
import { reducer as boardReducer, boardKey, BoardState } from './board.reducer';
import { reducer as issueReducer, issueKey, IssueState } from './issue.reducer';

export const indexFeatureKey = 'issuetracker';

export interface IssueTrackerState {
  [projectKey]: ProjectState;
  [boardKey]: BoardState;
  [issueKey]: IssueState;
}

export const reducers: ActionReducerMap<IssueTrackerState> = {
  [projectKey]: projectReducer,
  [boardKey]: boardReducer,
  [issueKey]: issueReducer,
};
