import { Action, createReducer, on } from '@ngrx/store';

import * as IssuePageActions from '../actions/issue.actions';
import { Issue } from '../../models/issue.model';

export const key = 'issues';

export interface State {
  data: Issue[];
}

export const initialState: State = {
  data: [],
};

const issueReducer = createReducer(
  initialState,
  on(IssuePageActions.selectData, (state) => ({
    ...state,
  })),
  on(IssuePageActions.selectSuccess, (state, action) => ({
    ...state,
    data: [...action.data],
  })),
  on(IssuePageActions.insertData, (state, action) => ({
    ...state,
  })),
  on(IssuePageActions.insertSuccess, (state, action) => ({
    ...state,
  })),
  on(IssuePageActions.deleteData, (state, action) => ({
    ...state,
  })),
  on(IssuePageActions.deleteSuccess, (state, action) => ({
    ...state,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return issueReducer(state, action);
}
