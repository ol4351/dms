import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { AlertService } from '../_services/alert.service';
import { Column } from '../_objects/column';
import { DataService } from './data.service';
import { Info } from '../_objects/info';
import { State } from '../_objects/state';

export class ExperimentalDataSourceService implements DataSource<any> {

	private documentSubject = new BehaviorSubject<any[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	public totalEntries;
	public data: any[];
	public loading$ = this.loadingSubject.asObservable();
	public columns: Column[] = [{id: 0, isFilter: false, isSortable: false, name: 'select', title: 'select', type: 'string'}];
	public columnNames = ['select'];

  constructor(private dataService: DataService, private alertService: AlertService) { }
	
	connect(collectionViewer: CollectionViewer): Observable<any[]> {
		return this.documentSubject.asObservable();
	}
	
	disconnect(collectionViewer: CollectionViewer): void {		
		this.documentSubject.complete();
		this.loadingSubject.complete();
	}
	
	loadDocuments(filterProject: number, filterCategory: number, showArchived: number, find: string, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number) {
		this.loadingSubject.next(true);
		this.dataService.filterDocuments2(filterProject,	filterCategory,	showArchived,	find,	sortColumn,	sortDirection, pageIndex,	pageSize)
			.pipe(
				catchError(() => of ([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe(
				documents => {
					console.log(documents);
					this.documentSubject.next(documents);
					if (this.session(documents[0])) {
						this.data = documents[1];
						this.totalEntries = documents[2].count;
						if (this.columns.length == 1) {
							for (const column of documents[3]) {
								this.columns.push(column);
								this.columnNames.push(column.name);
							}
						}
					}
				}
			);
	}
	
	session(info: Info): boolean {
		if (info) {
			let user = JSON.parse(localStorage.getItem('currentUser'));
			user[0].token = info.token;
			localStorage.setItem('currentUser', JSON.stringify(user));
			return true;
		}
		localStorage.removeItem('currentUser');
		this.alertService.error("Session expired.");
		return false;
	}	
}
