import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
import * as ProjectPageActions from '../actions/project.actions';

@Injectable()
export class ProjectEffects {
  insertProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectPageActions.insertData),
      mergeMap((props) => {
        return this.projectService.insert(props.project).pipe(
          map((project) => {
            console.log(project);
            return {
              type: ProjectPageActions.insertSuccess.type,
              project: project,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
