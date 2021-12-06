import { createSelector } from '@ngrx/store';
import { Board } from '../../models/board.model';

export const getBoards = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker: any, props: any) =>
    issuetracker.boards.data.filter((f: Board) => {
      return f.projectId === props.projectId;
    })
);

export const getBoard = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker: any, props: any) =>
    issuetracker.boards.data.find((f: Board) => f.slug === props.slug)
);
