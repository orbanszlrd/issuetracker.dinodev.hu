import { Component, OnInit, ɵConsole } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../models/project.model';
import { Board } from '../../models/board.model';

import * as ProjectSelectors from '../../store/selectors/project.selectors';
import * as BoardSelectors from '../../store/selectors/board.selectors';
import * as BoardPageActions from '../../store/actions/board.actions';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  project: Project | undefined;
  boards$: Observable<Board[]> = of([]);

  isOpen: boolean = false;

  board: Board = { slug: '', title: '', description: '' };

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    let projectSlug = this.route.snapshot.paramMap.get('projectSlug');

    this.subscriptions.push(
      this.store
        .select(ProjectSelectors.getProject, { slug: projectSlug })
        .subscribe((project) => (this.project = project))
    );

    if (this.project && this.project.id) {
      this.boards$ = this.store.select(BoardSelectors.getBoards, {
        projectId: this.project.id,
      });

      this.store.dispatch(
        BoardPageActions.selectData({ projectId: this.project.id })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openPanel(): void {
    let nr = Math.round(Math.random() * 999);

    this.board.slug = 'board-' + nr;
    this.board.title = 'Board ' + nr;
    this.board.projectId = this.project?.id;

    this.isOpen = true;
  }

  closePanel(): void {
    this.isOpen = false;
  }

  create(): void {
    this.isOpen = false;

    this.store.dispatch(
      BoardPageActions.insertData({
        board: { ...this.board },
      })
    );
  }

  delete(board: Board): void {
    this.store.dispatch(BoardPageActions.deleteData({ board }));
  }
}
