import { TestBed } from '@angular/core/testing';

import { StoreApiService } from './products.service';

describe('StoreApiService', () => {
  let service: StoreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
