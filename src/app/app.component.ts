import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { DataService } from './_services/data.service';
import { Country, UserData } from './_objects/user';

// Shared app component (shows top bar if user is authenticated), footer, background
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	currentUser: UserData;
	countries: Country[] = [];
	selectedCountry: Country;
	
	// - subscribe to userData which is defined when the user logs in
	// - when data is available, sets up available countries for that user and preselects the first one
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService,
		private dataService: DataService) {
			this.authenticationService.currentUser.subscribe(userData => {
				this.currentUser = userData;
				if (userData && this.countries.length == 0) {
					for (let i = 0; i < userData[2].length; i++) {
						this.countries.push(this.currentUser[2][i].country);
					}
				}
				this.selectedCountry = this.countries[0];
				this.setCountry();
			});
	}
	
	// logs out user and redirects to login page
	logout(): void {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
	
	// sets country to currently selected item in select box
	setCountry(): void {
		this.dataService.setCountry(this.selectedCountry);
	}

  title = 'dms';
}
