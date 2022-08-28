import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';
import * as IssuePageActions from '../actions/issue.actions';

@Injectable()
export class IssueEffects {
  selectData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssuePageActions.selectData),
      mergeMap(() => {
        return this.issueService.select().pipe(
          map((issues: Issue[]) => {
            return {
              type: IssuePageActions.selectSuccess.type,
              data: issues,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  insertData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssuePageActions.insertData),
      mergeMap((props) => {
        return this.issueService.create(props.issue).pipe(
          map((_issue: Issue) => {
            return {
              type: IssuePageActions.insertSuccess.type,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        );
      })
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssuePageActions.updateData),
      mergeMap((props) => {
        return this.issueService.update(props.issue).pipe(
          map((_issue: Issue) => {
            return {
              type: IssuePageActions.updateSuccess.type,
            };
          }),
          catchError(() => {
            return EMPTY;
          })
        );
      })
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssuePageActions.deleteData),
      mergeMap((props) => {
        return this.issueService.delete(props.issue).pipe(
          map((_issue: Issue) => {
            return {
              type: IssuePageActions.deleteSuccess.type,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(private actions$: Actions, private issueService: IssueService) {}
}
