import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleOrganizationsComponent } from './people-organizations.component';

describe('PeopleOrganizationsComponent', () => {
  let component: PeopleOrganizationsComponent;
  let fixture: ComponentFixture<PeopleOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
