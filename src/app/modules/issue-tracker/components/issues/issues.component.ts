import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Issue } from '../../models/issue.model';
import * as IssueSelectors from '../../store/selectors/issue.selectors';
import * as IssuePageActions from '../../store/actions/issue.actions';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues$: Observable<Issue[]>;

  isOpen: boolean = false;

  issue: Issue = { title: '', slug: '', description: '' };

  constructor(private store: Store) {
    this.issues$ = this.store.select(IssueSelectors.getAllIssues);
  }

  ngOnInit(): void {
    this.store.dispatch(IssuePageActions.selectData());
  }

  openPanel(): void {
    let nr = Math.round(Math.random() * 999);

    this.issue.slug = 'issue-' + nr;
    this.issue.title = 'Issue ' + nr;

    this.isOpen = true;
  }

  closePanel(): void {
    this.isOpen = false;
  }

  create(): void {
    this.isOpen = false;

    this.store.dispatch(
      IssuePageActions.insertData({ issue: { ...this.issue } })
    );
  }

  delete(issue: Issue): void {
    this.store.dispatch(IssuePageActions.deleteData({ issue }));
  }
}
