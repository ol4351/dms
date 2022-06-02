import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";

import { DataService } from '../_services/data.service';
import { Person, PersonData } from '../_objects/person';

export class PeopleDataSourceService implements DataSource<PersonData> {

	private personSubject = new BehaviorSubject<PersonData[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	public totalEntries;
	public data: PersonData[];
	public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }
	
	connect(collectionViewer: CollectionViewer): Observable<PersonData[]> {
		return this.personSubject.asObservable();
	}
	
	disconnect(collectionViewer: CollectionViewer): void {		
		this.personSubject.complete();
		this.loadingSubject.complete();
	}
}
