import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoaderComponent } from './loader.component';
import { PrimeModule } from 'src/app/modules/prime/prime.module';
import { Store } from '@ngrx/store';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  let store: Store;
  const initialState = { app: { isLoading: true, showSidebar: false } };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoaderComponent],
        providers: [provideMockStore({ initialState })],
        imports: [FontAwesomeModule, PrimeModule],
      }).compileComponents();

      store = TestBed.inject(Store);

      spyOn(store, 'dispatch');
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the dispatch method of the store', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
