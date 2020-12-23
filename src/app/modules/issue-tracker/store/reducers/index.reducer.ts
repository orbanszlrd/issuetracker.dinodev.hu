import { ActionReducerMap } from '@ngrx/store';
import {
  reducer as projectReducer,
  key as projectKey,
} from './project.reducer';

export const indexFeatureKey = 'issuetracker';

export interface AppState {
  [projectKey]: any;
}

export const reducers: ActionReducerMap<AppState> = {
  [projectKey]: projectReducer,
};
