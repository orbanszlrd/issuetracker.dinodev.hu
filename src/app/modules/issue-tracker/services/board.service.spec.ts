import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { Board } from '../models/board.model';

import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;

  let projectId = '83179d28-aa6d-4a1d-b185-b3e1f33b2fe9';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
    });
    service = TestBed.inject(BoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select the collection of boards', (done) => {
    let collection = service.select(projectId);

    expect(collection).toBeDefined();

    collection.subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should created a new board', (done) => {
    let board: Board = {
      title: 'Board 1',
      slug: 'board-1',
      description: '',
      columns: [],
    };

    let result = service.create(board);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(board.title);
      done();
    });
  });

  it('should update an existing board', (done) => {
    let board: Board = {
      id: 'defed11f-5208-4f5b-a213-1735564c977c',
      title: 'Board Updated',
      slug: 'board-1',
      description: 'Board updated',
      columns: [],
    };

    let result = service.update(board);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(board.title);
      done();
    });
  });

  it('should delete an existing board', (done) => {
    let board: Board = {
      id: 'defed11f-5208-4f5b-a213-1735564c977c',
      title: 'Board 1',
      slug: 'board-1',
      description: '',
      columns: [],
    };

    let result = service.delete(board);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(board.title);
      done();
    });
  });
});
