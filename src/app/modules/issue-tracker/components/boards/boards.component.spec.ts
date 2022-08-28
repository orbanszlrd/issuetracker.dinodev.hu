import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { PrimeModule } from 'src/app/modules/prime/prime.module';
import { Project } from '../../models/project.model';

import { BoardsComponent } from './boards.component';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  let spy: jasmine.Spy;
  let store: Store;

  const project: Project = {
    id: '0000000000000000',
    slug: 'project-101',
    title: 'Project 101',
    description: '',
  };

  const board = {
    id: '111',
    title: 'Board 111',
    slug: 'board-111',
    description: '',
    projectId: project.id,
    columns: [{ name: 'To do' }, { name: 'In Progress' }, { name: 'Done' }],
  };

  const initialState = {
    app: { isLoading: true, showSidebar: false },
    issuetracker: { projects: { data: [project] }, boards: { data: [board] } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, PrimeModule, RouterTestingModule],
      providers: [
        BoardsComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string): string | void => {
                  if (param === 'projectSlug') return project.slug;
                  else return;
                },
              },
            },
          },
        },
        provideMockStore({ initialState }),
      ],

      declarations: [BoardsComponent],
    }).compileComponents();

    store = TestBed.inject(Store);
    spy = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsComponent);
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
    expect(component.dialog.title).toEqual('New Board');
  });

  it('should close the new panel', () => {
    component.dialog.isOpen = true;
    component.closePanel();
    expect(component.dialog.isOpen).toBeFalse();
  });

  it('should open the edit panel', () => {
    expect(component.dialog.isOpen).toBeFalse();

    component.editPanel(board);

    expect(component.dialog.isOpen).toBeTrue();
    expect(component.dialog.title).toEqual('Edit Board');
    expect(component.board.title).toEqual(board.title);
  });

  it('should call the dispatch method of the store on save', () => {
    component.dialog.title = 'New Board';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on save ', () => {
    component.dialog.title = 'Edit Board';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on delete', () => {
    spy.calls.reset();
    component.delete(board);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
