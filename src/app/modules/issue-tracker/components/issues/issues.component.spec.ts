import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  let store: Store;
  let spy: jasmine.Spy;

  const initialState = {
    app: { isLoading: true, showSidebar: false },
    issuetracker: { issues: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FirebaseModule, PrimeModule],
      providers: [provideMockStore({ initialState })],
      declarations: [IssuesComponent],
    }).compileComponents();

    store = TestBed.inject(Store);

    spy = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
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
    expect(component.dialog.title).toEqual('New Issue');
  });

  it('should close the new panel', () => {
    component.dialog.isOpen = true;
    component.closePanel();
    expect(component.dialog.isOpen).toBeFalse();
  });

  it('should open the new panel', () => {
    let issue = {
      id: '1',
      title: 'Issue  1',
      slug: 'issue-1',
      description: '',
    };

    expect(component.dialog.isOpen).toBeFalse();

    component.editPanel(issue);

    expect(component.dialog.isOpen).toBeTrue();
    expect(component.dialog.title).toEqual('Edit Issue');
    expect(component.issue.title).toEqual(issue.title);
  });

  it('should call the dispatch method of the store on save', () => {
    component.dialog.title = 'New Issue';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on save ', () => {
    component.dialog.title = 'Edit Issue';
    spy.calls.reset();
    component.save();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call the dispatch method of the store on delete', () => {
    let issue = {
      id: '1',
      title: 'Issue  1',
      slug: 'issue-1',
      description: '',
    };

    spy.calls.reset();
    component.delete(issue);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
