import { TestBed, inject } from '@angular/core/testing';

import { PouchDBStorageService } from './pouch-dbstorage.service';

describe('PouchDBStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PouchDBStorageService]
    });
  });

  it('should be created', inject([PouchDBStorageService], (service: PouchDBStorageService) => {
    expect(service).toBeTruthy();
  }));
});
