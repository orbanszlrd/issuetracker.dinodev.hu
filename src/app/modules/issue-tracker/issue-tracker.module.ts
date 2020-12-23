import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../modules/shared/shared.module';

import { IssueTrackerRoutingModule } from './issue-tracker-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { IssuesComponent } from './components/issues/issues.component';
import { BoardsComponent } from './components/boards/boards.component';
import { LabelsComponent } from './components/labels/labels.component';

import * as fromIssueTracker from './store/reducers/index.reducer';
import { IndexEffects } from './store/effects/index.effects';

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    IssuesComponent,
    BoardsComponent,
    LabelsComponent,
  ],
  imports: [
    CommonModule,
    IssueTrackerRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      fromIssueTracker.indexFeatureKey,
      fromIssueTracker.reducers
    ),
    EffectsModule.forFeature(IndexEffects),
  ],
})
export class IssueTrackerModule {}
