import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import * as BoardPageActions from '../actions/board.actions';

@Injectable()
export class BoardEffects {
  selectData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.selectData),
      mergeMap((props) => {
        return this.boardService.select(props.projectId).pipe(
          map((boards: Board[]) => {
            return {
              type: BoardPageActions.selectSuccess.type,
              data: boards,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        );
      })
    )
  );

  insertData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.insertData),
      mergeMap((props) => {
        return this.boardService.create(props.board).pipe(
          map((_board: Board) => {
            return {
              type: BoardPageActions.insertSuccess.type,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.updateData),
      mergeMap((props) => {
        return this.boardService.update(props.board).pipe(
          map((_board: Board) => {
            return {
              type: BoardPageActions.updateSuccess.type,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.deleteData),
      mergeMap((props) => {
        return this.boardService.delete(props.board).pipe(
          map((_board: Board) => {
            return {
              type: BoardPageActions.deleteSuccess.type,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
