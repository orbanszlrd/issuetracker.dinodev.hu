import { Action, createReducer, on } from '@ngrx/store';

import * as ProjectPageActions from '../actions/project.actions';
import { Project } from '../../models/project.model';

export const projectKey = 'projects';

export interface ProjectState {
  data: Project[];
}

const initialState: ProjectState = {
  data: [],
};

const projectReducer = createReducer(
  initialState,
  on(
    ProjectPageActions.selectData,
    (state): ProjectState => ({
      ...state,
    })
  ),
  on(
    ProjectPageActions.selectSuccess,
    (state, action): ProjectState => ({
      ...state,
      data: [...action.data],
    })
  ),
  on(
    ProjectPageActions.insertData,
    (state): ProjectState => ({
      ...state,
    })
  ),
  on(
    ProjectPageActions.insertSuccess,
    (state): ProjectState => ({
      ...state,
    })
  ),
  on(
    ProjectPageActions.updateData,
    (state): ProjectState => ({
      ...state,
    })
  ),
  on(
    ProjectPageActions.updateSuccess,
    (state): ProjectState => ({
      ...state,
    })
  ),
  on(
    ProjectPageActions.deleteData,
    (state): ProjectState => ({
      ...state,
    })
  ),
  on(
    ProjectPageActions.deleteSuccess,
    (state): ProjectState => ({
      ...state,
    })
  )
);

export function reducer(state: ProjectState | undefined, action: Action) {
  return projectReducer(state, action);
}
