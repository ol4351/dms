import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

// The alert component passes alert messages to the template whenever a message is received from the alert service.
// It does this by subscribing to the alert service's getMessage() method which returns an Observable.
export class AlertComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	message: any;
  
	constructor(private alertService: AlertService) { }

  ngOnInit(): void {
		this.subscription = this.alertService.getMessage().subscribe(message => this.message = message);
  }
	
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
