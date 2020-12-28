import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { IssueService } from '../services/issue.service';
import * as IssuePageActions from '../actions/issue.actions';

@Injectable()
export class IssueEffects {
  selectData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssuePageActions.selectData),
      mergeMap(() => {
        return this.issueService.select().pipe(
          map((data) => {
            return {
              type: IssuePageActions.selectSuccess.type,
              data: data,
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
          map((issue) => {
            console.log(issue);
            return {
              type: IssuePageActions.insertSuccess.type,
            };
          }),
          catchError((err) => {
            console.log(err);

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
          map((props) => {
            //            console.log(props);
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
