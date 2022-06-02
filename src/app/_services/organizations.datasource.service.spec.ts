import { TestBed } from '@angular/core/testing';

import { Organizations.DatasourceService } from './organizations.datasource.service';

describe('Organizations.DatasourceService', () => {
  let service: Organizations.DatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Organizations.DatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
