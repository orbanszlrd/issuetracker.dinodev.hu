import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import * as ProjectPageActions from '../actions/project.actions';

@Injectable()
export class ProjectEffects {
  selectData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectPageActions.selectData),
      mergeMap(() => {
        return this.projectService.select().pipe(
          map((projects: Project[]) => {
            return {
              type: ProjectPageActions.selectSuccess.type,
              data: projects,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  insertData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectPageActions.insertData),
      mergeMap((props) => {
        return this.projectService.create(props.project).pipe(
          map((_project: Project) => {
            return {
              type: ProjectPageActions.insertSuccess.type,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  updateData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectPageActions.updateData),
      mergeMap((props) => {
        return this.projectService.update(props.project).pipe(
          map((_project: Project) => {
            return {
              type: ProjectPageActions.updateSuccess.type,
            };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  deleteData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectPageActions.deleteData),
      mergeMap((props) => {
        return this.projectService.delete(props.project).pipe(
          map((_project: Project) => {
            return {
              type: ProjectPageActions.deleteSuccess.type,
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
