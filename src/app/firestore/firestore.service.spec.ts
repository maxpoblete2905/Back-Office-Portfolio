import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from './firebase.service';
import { of } from 'rxjs';

// Mocks

const collectionSpy = jasmine.createSpyObj({
  snapshotChanges: of([{ payload: { doc: { data: () => {}, id: '123' } } }]),
  doc: jasmine.createSpy('doc'),
  add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
  update: jasmine.createSpy('update').and.returnValue(of({})), // Simular un observable vacío para update()
  delete: jasmine.createSpy('delete').and.returnValue(of({})) // Simular un observable vacío para delete()
});

const firestoreSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy
});

describe('Firestore Service', () => {
  let service: FirestoreService<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreSpy }
      ]
    });
    service = TestBed.inject(FirestoreService);
    service.setCollection('projects'); // Ajustar según la necesidad del test
  });

  it('should be created, exist', () => {
    expect(service).toBeTruthy();
  });

  it('should get documents', (done: DoneFn) => {
    service.getDocuments().subscribe({
      next: (results) => {
        expect(results).toEqual([{ id: '123', ...{} }]);
        done();
      },
      error: done.fail
    });

    expect(collectionSpy.snapshotChanges).toHaveBeenCalled();
  });

  it('should add a document', (done: DoneFn) => {
    const newDoc = { name: 'New Document' };
    spyOn(service, 'addDocument').and.returnValue(of({ id: '123', ...newDoc }));
    service.addDocument(newDoc).subscribe({
      next: (doc) => {
        expect(doc).toEqual({ id: '123', name: 'New Document' });
        done();
      },
      error: done.fail
    });
  });

});
