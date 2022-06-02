import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

import { Document, DocumentData } from '../_objects/document';
import { DataService } from './data.service';

export class DocumentDataSourceService implements DataSource<DocumentData> {

	private documentSubject = new BehaviorSubject<DocumentData[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);
	public totalEntries;
	public data: Document[];
	public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: DataService) { }
	
	connect(collectionViewer: CollectionViewer): Observable<DocumentData[]> {
		return this.documentSubject.asObservable();
	}
	
	disconnect(collectionViewer: CollectionViewer): void {		
		this.documentSubject.complete();
		this.loadingSubject.complete();
	}
	
	loadDocuments(filterProject: number, filterCategory: number, showArchived: number, find: string, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number) {
		this.loadingSubject.next(true);
		this.dataService.filterDocuments(filterProject,	filterCategory,	showArchived,	find,	sortColumn,	sortDirection, pageIndex,	pageSize)
			.pipe(
				catchError(() => of ([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe(
				documents => {
					console.log(documents, " ", documents[2].count);
					this.documentSubject.next(documents);
					this.data = documents[1];
					this.totalEntries = documents[2].count;
				}
			);
	}
}
