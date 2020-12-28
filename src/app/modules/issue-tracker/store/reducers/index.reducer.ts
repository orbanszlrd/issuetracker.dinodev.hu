import { ActionReducerMap } from '@ngrx/store';
import {
  reducer as projectReducer,
  key as projectKey,
} from './project.reducer';

import { reducer as boardReducer, key as boardKey } from './board.reducer';

export const indexFeatureKey = 'issuetracker';

export interface AppState {
  [projectKey]: any;
  [boardKey]: any;
}

export const reducers: ActionReducerMap<AppState> = {
  [projectKey]: projectReducer,
  [boardKey]: boardReducer,
};
