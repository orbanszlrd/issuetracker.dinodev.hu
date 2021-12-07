import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { AuthService } from 'src/app/modules/firebase/services/auth.service';
import { User } from 'src/app/modules/firebase/services/user.model';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  let auth: AuthService;

  const initialState = { app: { isLoading: true, showSidebar: false } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PrimeModule,
        RouterTestingModule,
        FirebaseModule,
        BrowserAnimationsModule,
      ],
      declarations: [SidebarComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    auth = TestBed.inject(AuthService);

    auth.user$ = of({ uid: 'uid', email: 'user@email.com' } as User);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the menu for the authorized users', () => {
    expect(component.menuItems.length).toEqual(5);
  });

  it('should generate the menu for the unauthorized users', () => {
    component.generateMenu(null);
    expect(component.menuItems.length).toEqual(2);
  });

  it('should generate the menu for the authorized users', () => {
    component.generateMenu({ uid: 'userid', email: 'user@email.com' } as User);
    expect(component.menuItems.length).toEqual(5);
  });
});
