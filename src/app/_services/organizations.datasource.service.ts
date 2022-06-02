import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";

import { DataService } from '../_services/data.service';
import { Organization, OrganizationData } from '../_objects/organization';

export class OrganizationsDataSourceService implements DataSource<OrganizationData> {

  private organizationSubject = new BehaviorSubject<OrganizationData[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	public totalEntries;
	public data: OrganizationData[];
	public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }
	
	connect(collectionViewer: CollectionViewer): Observable<OrganizationData[]> {
		return this.organizationSubject.asObservable();
	}
	
	disconnect(collectionViewer: CollectionViewer): void {		
		this.organizationSubject.complete();
		this.loadingSubject.complete();
	}
}
