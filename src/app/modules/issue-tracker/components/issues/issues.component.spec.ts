import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  let store: Store;
  let spy: jasmine.Spy;

  const issue = {
    id: '1',
    title: 'Issue 1',
    slug: 'issue-1',
    description: '',
  };

  const initialState = {
    app: { isLoading: true, showSidebar: false },
    issuetracker: { issues: { data: [issue] } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, PrimeModule],
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
    expect(component.issue.id).toBeUndefined();
  });

  it('should close the new panel', () => {
    component.dialog.isOpen = true;
    component.closePanel();
    expect(component.dialog.isOpen).toBeFalse();
  });

  it('should open the edit panel', () => {
    expect(component.dialog.isOpen).toBeFalse();

    component.editPanel(issue);

    expect(component.dialog.isOpen).toBeTrue();
    expect(component.dialog.title).toEqual('Edit Issue');
    expect(component.issue).toEqual(issue);
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
    spy.calls.reset();
    component.delete(issue);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
