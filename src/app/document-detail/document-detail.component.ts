import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location, formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { Activity } from '../_objects/activity';
import { AlertService } from '../_services/alert.service';
import { Budget, BudgetType} from '../_objects/budget';
import { Category } from '../_objects/category';
import { Document } from '../_objects/document';
import { DataService } from '../_services/data.service';
import { Status } from '../_objects/status';
import { User } from '../_objects/user';
import { Workflow } from '../_objects/workflow';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
	@Input() document: Document;
	documentLoaded = false; // indicates whether the document data is ready
	documentId = 0;

	// read-only selectables
	activities: Activity[] = [];
    categories: Category[] = [];
	
	// input data
	comment;
	createdBy: User = JSON.parse(localStorage.getItem('currentUser'))[1]; // autofilled when creating
	createdOn; // autofilled when creating
	description;
	documentScan;
	isArchived = 0;
	rid;
	selectedActivity: Activity;
	selectedCategory: Category;
	totalValue;
	budgetData: Budget[] = [];

  constructor(
		private route: ActivatedRoute,
		private alertService: AlertService,
		private dataService: DataService,
		private location: Location,
		private router: Router
	) { }

  ngOnInit(): void {
		this.today();
		this.getDocument();
  }
	
	// sets values from loaded document
	setDefaults(): void {
		//console.log(this.document[0]);
		
		this.comment = this.document[0].comment;
		this.createdBy = this.document[0].ridComUserCreated;
		this.createdOn = this.document[0].dateCreate;
		this.description = this.document[0].description;
		this.rid = this.document[0]._rid;
		this.isArchived = this.document[0].isArchived;
	}
	
	// loads document info from server, then calls the methods to get combo box selection data and the one to fill data
	getDocument(): void {
    this.documentId = +this.route.snapshot.paramMap.get('id');
		const DocumentObs = {
			next: x => this.document = x,
			error: err => this.alertService.error("Error loading document!"),
			complete: () => { 
				if (this.document[0] == null) {
					this.alertService.error("Cannot find document!");
				}	else {
					this.setDefaults();
					this.documentLoaded = true;
				}
			}
		}
		
		if (this.documentId != 0) {
			this.dataService.getDocument(this.documentId).subscribe(DocumentObs);	
		} else {
			// document is in a state of creating so no loading is required, still we need to set to true to show elements
			this.documentLoaded = true;
		}
  }
	
	goBack(): void {
    this.location.back();
  }
	
	today(): void {
		this.createdOn = formatDate(new Date(), 'YYYY-MMM-DD', 'en');
	}
	
	create(): void {
		//this.add(
			this.comment,
			this.createdBy,
			this.createdOn,
			this.description,
			this.documentScan,
			this.isArchived,
			0,
			this.selectedActivity._rid,
			this.selectedCategory._rid,
		//);
		// maybe some kind of feedback that document was created (with confirmed creation from db)
		this.goBack();
	}

}
