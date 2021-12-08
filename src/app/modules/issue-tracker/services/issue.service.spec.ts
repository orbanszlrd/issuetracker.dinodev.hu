import { TestBed } from '@angular/core/testing';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { Issue } from '../models/issue.model';

import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;

  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
    });

    afsSpy.collection.and.returnValue({
      valueChanges: () => of({}),
      doc: (id: string) => {
        return {
          set: (issue: Issue) =>
            new Promise((resolve, reject) => {
              if (id) {
                resolve();
              } else {
                reject();
              }
            }),
          delete: () =>
            new Promise((resolve, reject) => {
              if (id) {
                resolve();
              } else {
                reject();
              }
            }),
        };
      },
    } as AngularFirestoreCollection);

    service = new IssueService(afsSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select the collection of issues', () => {
    let collection = service.select();
    expect(collection).toBeDefined();
  });

  it('should created a new issue', (done) => {
    let issue: Issue = {
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.create(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });

  it('should fail to update the issue if it has no id', (done) => {
    let issue: Issue = {
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.update(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });

  it('should update the issue if it an id', (done) => {
    let issue: Issue = {
      id: '1',
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.update(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });

  it('should fail to delete an issue without providing the id', (done) => {
    let issue: Issue = {
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.delete(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });

  it('should delete the issue with an id provided', (done) => {
    let issue: Issue = {
      id: '1',
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.delete(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });
});
