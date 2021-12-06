import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model';
import { Board } from '../../models/board.model';

import * as ProjectSelectors from '../../store/selectors/project.selectors';
import * as BoardSelectors from '../../store/selectors/board.selectors';
import * as BoardPageActions from '../../store/actions/board.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  project: Project | undefined;
  board: Board | undefined;

  constructor(private route: ActivatedRoute, private store: Store) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    let projectSlug = this.route.snapshot.paramMap.get('projectSlug');
    let boardSlug = this.route.snapshot.paramMap.get('boardSlug');

    this.subscriptions.push(
      this.store
        .select(ProjectSelectors.getProject, { slug: projectSlug })
        .subscribe((project) => (this.project = project))
    );

    this.subscriptions.push(
      this.store
        .select(BoardSelectors.getBoard, {
          slug: boardSlug,
        })
        .subscribe((board: Board) => (this.board = board))
    );

    if (this.project && this.project.id) {
      this.store.dispatch(
        BoardPageActions.selectData({ projectId: this.project.id })
      );
    }
  }
}
