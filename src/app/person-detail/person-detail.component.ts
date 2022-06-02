import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { DataService } from '../_services/data.service';
import { Person } from '../_objects/person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
	@Input() person: Person;
	personLoaded : boolean;
	personId = 0;

	birthDate: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	position: string;
	prefix: string;
	rid: number;
	suffix: string;

  constructor(
		private route: ActivatedRoute,
		private alertService: AlertService,
		private dataService: DataService,
		private location: Location,
	) { }

  ngOnInit(): void {
		this.getPerson();
  }
	
	private getPerson() {
		this.personId = +this.route.snapshot.paramMap.get('id');
		const PersonObs = {
			next: x => this.person = x,
			error: err => this.alertService.error("Error loading person!"),
			complete: () => { 
				if (this.person == null) {
					this.alertService.error("Cannot find person!");
				}	else {
					this.setDefaults();
					this.personLoaded = true;
				}
			}
		}
		
		if (this.personId != 0) {
			this.dataService.getPersonFormData(this.personId).subscribe(PersonObs);	
		} else {
			this.personLoaded = true;
		}
	}
	
	private setDefaults(): void {
		this.birthDate = this.person.birthDate;
		this.email = this.person.email;
		this.firstName = this.person.firstName;
		this.lastName = this.person.lastName;
		this.phone = this.person.phone;
		this.position = this.person.position;
		this.prefix = this.person.prefix;
		this.rid = this.person._rid;
		this.suffix = this.person.suffix;
	}
	
	savePerson() {
	
	}
	
	deletePerson() {
	}
	
	goBack() {
		this.location.back();
	}

}
