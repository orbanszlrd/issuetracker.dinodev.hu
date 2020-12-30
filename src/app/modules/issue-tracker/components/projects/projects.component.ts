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

  dialog: {
    title: string;
    isOpen: boolean;
  } = { title: 'New Project', isOpen: false };

  project: Project = { slug: '', title: '', description: '' };

  constructor(private store: Store) {
    this.projects$ = this.store.select(ProjectSelectors.getAllProjects);
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectPageActions.selectData());
  }

  newPanel(): void {
    let nr = Math.round(Math.random() * 999);

    this.project = {
      slug: 'project-' + nr,
      title: 'Project ' + nr,
      description: '',
    };

    this.dialog.title = 'New Project';
    this.dialog.isOpen = true;
  }

  closePanel(): void {
    this.dialog.isOpen = false;
  }

  editPanel(project: Project): void {
    this.project = { ...project };

    this.dialog.title = 'Edit Project';
    this.dialog.isOpen = true;
  }

  save(): void {
    this.dialog.isOpen = false;

    if (this.dialog.title == 'New Project') {
      this.store.dispatch(
        ProjectPageActions.insertData({ project: { ...this.project } })
      );
    } else {
      this.store.dispatch(
        ProjectPageActions.updateData({ project: { ...this.project } })
      );
    }
  }

  delete(project: Project): void {
    this.store.dispatch(ProjectPageActions.deleteData({ project }));
  }
}
