import { TestBed } from '@angular/core/testing';

import { PeopleOrganizationsService } from './people-organizations.service';

describe('PeopleOrganizationsService', () => {
  let service: PeopleOrganizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleOrganizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
