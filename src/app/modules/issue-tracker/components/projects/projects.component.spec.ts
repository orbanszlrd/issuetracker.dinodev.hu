import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  const initialState = {
    app: { isLoading: true, showSidebar: false },
    issuetracker: { projects: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FirebaseModule, PrimeModule],
      providers: [provideMockStore({ initialState })],
      declarations: [ProjectsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
