import { Action, createReducer, on } from '@ngrx/store';

import * as ProjectPageActions from '../actions/project.actions';
import { Project } from '../../models/project.model';

export const key = 'projects';

export interface State {
  data: Project[];
}

export const initialState: State = {
  data: [],
};

const projectReducer = createReducer(
  initialState,
  on(ProjectPageActions.getDataFromFirestore, (state) => ({
    ...state,
  })),
  on(ProjectPageActions.fillData, (state, action) => ({
    ...state,
    data: action.projects,
  })),
  on(ProjectPageActions.insertData, (state, action) => ({
    ...state,
    data: [...state.data, action.project],
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return projectReducer(state, action);
}
