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

  dialog: {
    title: string;
    isOpen: boolean;
  } = { title: 'New Board', isOpen: false };

  board: Board = {
    slug: '',
    title: '',
    description: '',
    columns: [],
  };

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

  newPanel(): void {
    let nr = Math.round(Math.random() * 999);

    this.board = {
      slug: 'board-' + nr,
      title: 'Board ' + nr,
      description: '',
      projectId: this.project?.id,
      columns: [],
    };

    if (true) {
      this.board.columns = [
        { name: 'To do' },
        { name: 'In Progress' },
        { name: 'Done' },
      ];
    }

    this.dialog.title = 'New Board';
    this.dialog.isOpen = true;
  }

  closePanel(): void {
    this.dialog.isOpen = false;
  }

  editPanel(board: Board): void {
    this.board = { ...board };

    this.dialog.title = 'Edit Board';
    this.dialog.isOpen = true;
  }

  save(): void {
    this.dialog.isOpen = false;

    if (this.dialog.title == 'New Board') {
      this.store.dispatch(
        BoardPageActions.insertData({ board: { ...this.board } })
      );
    } else {
      this.store.dispatch(
        BoardPageActions.updateData({ board: { ...this.board } })
      );
    }
  }

  delete(board: Board): void {
    this.store.dispatch(BoardPageActions.deleteData({ board }));
  }
}
