import { TestBed } from '@angular/core/testing';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';

import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
    });
    service = TestBed.inject(IssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
