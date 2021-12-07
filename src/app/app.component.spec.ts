import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './modules/shared/components/toolbar/toolbar.component';
import { FooterComponent } from './modules/shared/components/footer/footer.component';
import { LoaderComponent } from './modules/shared/components/loader/loader.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
import { PrimeModule } from './modules/prime/prime.module';
import { FirebaseModule } from './modules/firebase/firebase.module';

describe('AppComponent', () => {
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        PrimeModule,
        FirebaseModule,
      ],
      providers: [AppComponent, provideMockStore({ initialState })],
      declarations: [
        AppComponent,
        SidebarComponent,
        ToolbarComponent,
        FooterComponent,
        LoaderComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
