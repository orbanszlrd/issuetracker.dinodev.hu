import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let store: Store;
  const initialState = { app: { isLoading: true, showSidebar: false } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeModule, RouterTestingModule, FirebaseModule],
      declarations: [ToolbarComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the dispatch method of the store', () => {
    component.toggleSidebar();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
