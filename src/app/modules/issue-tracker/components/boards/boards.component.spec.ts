import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { BoardsComponent } from './boards.component';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  let spy: jasmine.Spy;
  let store: Store;

  const initialState = {
    app: { isLoading: true, showSidebar: false },
    issuetracker: { boards: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, FirebaseModule, PrimeModule],
      providers: [provideMockStore({ initialState })],
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

  it('should open the new panel', () => {
    let board = {
      id: '1',
      title: 'board 1',
      slug: 'board-1',
      description: '',
      columns: [],
    };

    expect(component.dialog.isOpen).toBeFalse();

    component.editPanel(board);

    expect(component.dialog.isOpen).toBeTrue();
    expect(component.dialog.title).toEqual('Edit Board');
    expect(component.board.title).toEqual(board.title);
  });

  it('should call the dispatch method of the store on save', () => {
    component.dialog.title = 'New board';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on save ', () => {
    component.dialog.title = 'Edit board';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on delete', () => {
    let board = {
      id: '1',
      title: 'Board 1',
      slug: 'board-1',
      description: '',
      columns: [],
    };

    spy.calls.reset();
    component.delete(board);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
