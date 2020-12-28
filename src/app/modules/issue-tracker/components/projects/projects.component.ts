import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Project } from '../../models/project.model';
import * as ProjectSelectors from '../../store/selectors/project.selectors';
import * as ProjectPageActions from '../../store/actions/project.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;

  isOpen: boolean = false;

  project: Project = { slug: '', title: '', description: '' };

  constructor(private store: Store) {
    this.projects$ = this.store.select(ProjectSelectors.getAllProjects);
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectPageActions.selectData());
  }

  openPanel(): void {
    let nr = Math.round(Math.random() * 999);

    this.project.slug = 'project-' + nr;
    this.project.title = 'Project ' + nr;

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

  delete(project: Project): void {
    this.store.dispatch(ProjectPageActions.deleteData({ project }));
  }
}
