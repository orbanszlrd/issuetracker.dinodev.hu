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

  dialog: {
    title: string;
    isOpen: boolean;
  } = { title: 'New Issue', isOpen: false };

  issue: Issue = { title: '', slug: '', description: '' };

  constructor(private store: Store) {
    this.issues$ = this.store.select(IssueSelectors.getAllIssues);
  }

  ngOnInit(): void {
    this.store.dispatch(IssuePageActions.selectData());
  }

  newPanel(): void {
    let nr = Math.round(Math.random() * 999);

    this.issue = {
      slug: 'issue-' + nr,
      title: 'Issue ' + nr,
      description: '',
    };

    this.dialog.title = 'New Issue';
    this.dialog.isOpen = true;
  }

  closePanel(): void {
    this.dialog.isOpen = false;
  }

  editPanel(issue: Issue): void {
    this.issue = { ...issue };

    this.dialog.title = 'Edit Issue';
    this.dialog.isOpen = true;
  }

  save(): void {
    this.dialog.isOpen = false;

    if (this.dialog.title == 'New Issue') {
      this.store.dispatch(
        IssuePageActions.insertData({ issue: { ...this.issue } })
      );
    } else {
      this.store.dispatch(
        IssuePageActions.updateData({ issue: { ...this.issue } })
      );
    }
  }

  delete(issue: Issue): void {
    this.store.dispatch(IssuePageActions.deleteData({ issue }));
  }
}
