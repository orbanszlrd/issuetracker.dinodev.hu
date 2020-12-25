import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/modules/firebase/services/auth.service';

import { Project } from '../../models/project.model';
import * as ProjectSelectors from '../../store/selectors/project.selectors';
import * as ProjectPageActions from '../../store/actions/project.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(public auth: AuthService, private store: Store) {
    this.projects$ = this.store.select(ProjectSelectors.getAllProjects);
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectPageActions.selectData());
  }

  isOpen: boolean = false;

  project: Project = { title: '', description: '', boards: [] };

  openPanel(): void {
    this.project.title = 'Project ' + Math.round(Math.random() * 999);

    this.isOpen = true;
  }

  closePanel(): void {
    this.isOpen = false;
  }

  create(): void {
    this.isOpen = false;

    this.store.dispatch(
      ProjectPageActions.insertData({ project: { ...this.project } })
    );
  }

  delete(id: string): void {
    this.store.dispatch(ProjectPageActions.deleteData({ id }));
  }
}
