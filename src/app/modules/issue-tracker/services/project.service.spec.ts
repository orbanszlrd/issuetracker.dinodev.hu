import { TestBed } from '@angular/core/testing';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { FirebaseModule } from 'src/app/modules/firebase/firebase.module';
import { Project } from '../models/project.model';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
    });
    afsSpy.collection.and.returnValue({
      valueChanges: () => of({}),
      doc: (id: string) => {
        return {
          set: (project: Project) =>
            new Promise((resolve, reject) => {
              resolve();
            }),
          delete: () =>
            new Promise((resolve, reject) => {
              resolve();
            }),
        };
      },
    } as AngularFirestoreCollection);

    service = new ProjectService(afsSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select the collection of projects', () => {
    let collection = service.select();
    expect(collection).toBeDefined();
  });

  it('should created a new project', (done) => {
    let project: Project = {
      title: 'Project 1',
      slug: 'project-1',
      description: '',
    };

    let result = service.create(project);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(project.title);
      done();
    });
  });

  it('should update an existing project', (done) => {
    let project: Project = {
      id: '1',
      title: 'Project 1',
      slug: 'project-1',
      description: '',
    };

    let result = service.update(project);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(project.title);
      done();
    });
  });

  it('should delete an existing project', (done) => {
    let project: Project = {
      id: '1',
      title: 'Project 1',
      slug: 'project-1',
      description: '',
    };

    let result = service.delete(project);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(project.title);
      done();
    });
  });
});
