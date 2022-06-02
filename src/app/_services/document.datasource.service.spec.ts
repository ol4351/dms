import { TestBed } from '@angular/core/testing';

import { Document.DatasourceService } from './document.datasource.service';

describe('Document.DatasourceService', () => {
  let service: Document.DatasourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Document.DatasourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
