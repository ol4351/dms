import { TestBed } from '@angular/core/testing';

import { Experimental.DatasourceService } from './experimental.datasource.service';

describe('Experimental.DatasourceService', () => {
  let service: Experimental.DatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Experimental.DatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
