import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  let spy: jasmine.Spy;
  let store: Store;

  const initialState = {
    app: { isLoading: true, showSidebar: false },
    issuetracker: { projects: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, PrimeModule],
      providers: [provideMockStore({ initialState })],
      declarations: [ProjectsComponent],
    }).compileComponents();

    store = TestBed.inject(Store);
    spy = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the new panel', () => {
    expect(component.dialog.isOpen).toBeFalse();
    component.newPanel();
    expect(component.dialog.isOpen).toBeTrue();
    expect(component.dialog.title).toEqual('New Project');
  });

  it('should close the new panel', () => {
    component.dialog.isOpen = true;
    component.closePanel();
    expect(component.dialog.isOpen).toBeFalse();
  });

  it('should open the new panel', () => {
    let project = {
      id: '1',
      title: 'Project  1',
      slug: 'project-1',
      description: '',
    };

    expect(component.dialog.isOpen).toBeFalse();

    component.editPanel(project);

    expect(component.dialog.isOpen).toBeTrue();
    expect(component.dialog.title).toEqual('Edit Project');
    expect(component.project.title).toEqual(project.title);
  });

  it('should call the dispatch method of the store on save', () => {
    component.dialog.title = 'New Project';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on save ', () => {
    component.dialog.title = 'Edit Project';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on delete', () => {
    let project = {
      id: '1',
      title: 'Project  1',
      slug: 'project-1',
      description: '',
    };

    spy.calls.reset();
    component.delete(project);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
