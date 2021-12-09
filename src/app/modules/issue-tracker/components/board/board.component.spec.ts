import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PrimeModule } from 'src/app/modules/prime/prime.module';
import { Project } from '../../models/project.model';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

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
      imports: [FormsModule, RouterTestingModule, PrimeModule],
      providers: [
        BoardComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string): string | void => {
                  if (param === 'projectSlug') return project.slug;
                  if (param === 'boardSlug') return board.slug;
                  else return;
                },
              },
            },
          },
        },
        provideMockStore({ initialState }),
      ],
      declarations: [BoardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the correct project', () => {
    expect(component.project).toEqual(project);
  });

  it('should load the correct board', () => {
    expect(component.board).toEqual(board);
  });
});
