import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { User } from 'src/app/modules/firebase/services/user.model';
import { PrimeModule } from 'src/app/modules/prime/prime.module';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
