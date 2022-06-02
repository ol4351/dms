import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { PeopleDataSourceService } from '../_services/people.datasource.service';
import { OrganizationsDataSourceService } from '../_services/organizations.datasource.service';

@Component({
  selector: 'app-people-organizations',
  templateUrl: './people-organizations.component.html',
  styleUrls: ['./people-organizations.component.css']
})
export class PeopleOrganizationsComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	public displayedOrganizationColumns: string[] = ['name', 'department', 'address', 'zip', 'city'];
	public displayedPersonColumns: string[] = ['prefix', 'firstName', 'lastName', 'suffix', 'birthDate', 'position', 'phone', 'email'];
	organizationDataSource: OrganizationsDataSourceService;
	peopleDataSource: PeopleDataSourceService;
	pageSize = 20;
  
  constructor() { }

  ngOnInit(): void {
  }

}
