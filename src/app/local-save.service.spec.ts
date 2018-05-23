import { TestBed, inject } from '@angular/core/testing';

import { LocalSaveService } from './local-save.service';

describe('LocalSaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalSaveService]
    });
  });

  it('should be created', inject([LocalSaveService], (service: LocalSaveService) => {
    expect(service).toBeTruthy();
  }));
});
