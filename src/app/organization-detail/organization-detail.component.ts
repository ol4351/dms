import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { DataService } from '../_services/data.service';
import { Organization } from '../_objects/organization';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
	@Input() organization: Organization;
	organizationLoaded: boolean;
	organizationId = 0;

	city: string;
	department: string;
	id: number;
	name: string;
	rid: number;
	shortName: string;
	street: string;
	streetNum1: number;
	streetNum2: string;
	taxID: number;
	vatID: number;
	zip: number;

  constructor(
		private route: ActivatedRoute,
		private alertService: AlertService,
		private dataService: DataService,
		private location: Location,
	) { }

  ngOnInit(): void {
		this.getOrganization();
  }
	
	private getOrganization() {
		this.organizationId = +this.route.snapshot.paramMap.get('id');
		const OrganizationObs = {
			next: x => this.organization = x,
			error: err => this.alertService.error("Error loading organization!"),
			complete: () => { 
				if (this.organization == null) {
					this.alertService.error("Cannot find organization!");
				}	else {
					this.setDefaults();
					this.organizationLoaded = true;
				}
			}
		}
		
		if (this.organizationId != 0) {
			this.dataService.getOrganizationFormData(this.organizationId).subscribe(OrganizationObs);	
		} else {
			// document is in a state of creating so no loading is required, still we need to set to true to show elements
			this.organizationLoaded = true;
		}
	}
	
	private setDefaults(): void {
		this.city = this.organization.city;
		this.department = this.organization.department;
		this.id = this.organization.id;
		this.name = this.organization.name;
		this.rid = this.organization._rid;
		this.shortName = this.organization.shortName;
		this.street = this.organization.street;
		this.streetNum1 = this.organization.streetNum1;
		this.streetNum2 = this.organization.streetNum2;
		this.taxID = this.organization.taxID;
		this.vatID = this.organization.vatID;
		this.zip = this.organization.zip;
	}
	
	//TODO for save, delete -> confirm editing, saving, deleting in alerts
	saveOrganization() {
	}
	
	deleteOrganization() {
	}
	
	goBack() {
		this.location.back();
	}

}
