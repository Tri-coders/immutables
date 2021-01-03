import { TestBed } from '@angular/core/testing';

import { DatasendService } from './datasend.service';

describe('DatasendService', () => {
  let service: DatasendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
