import { Action, createReducer, on } from '@ngrx/store';

import * as IssuePageActions from '../actions/issue.actions';
import { Issue } from '../../models/issue.model';

export const issueKey = 'issues';

export interface IssueState {
  data: Issue[];
}

const initialState: IssueState = {
  data: [],
};

const issueReducer = createReducer(
  initialState,
  on(
    IssuePageActions.selectData,
    (state): IssueState => ({
      ...state,
    })
  ),
  on(
    IssuePageActions.selectSuccess,
    (state, action): IssueState => ({
      ...state,
      data: [...action.data],
    })
  ),
  on(
    IssuePageActions.insertData,
    (state): IssueState => ({
      ...state,
    })
  ),
  on(
    IssuePageActions.insertSuccess,
    (state): IssueState => ({
      ...state,
    })
  ),
  on(
    IssuePageActions.updateData,
    (state): IssueState => ({
      ...state,
    })
  ),
  on(
    IssuePageActions.updateSuccess,
    (state): IssueState => ({
      ...state,
    })
  ),
  on(
    IssuePageActions.deleteData,
    (state): IssueState => ({
      ...state,
    })
  ),
  on(
    IssuePageActions.deleteSuccess,
    (state): IssueState => ({
      ...state,
    })
  )
);

export function reducer(state: IssueState | undefined, action: Action) {
  return issueReducer(state, action);
}
