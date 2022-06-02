import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Activity } from '../_objects/activity';
import { AppComponent } from '../app.component'
import { Category } from '../_objects/category';
import { Document, DocumentData } from '../_objects/document';
import { Info } from '../_objects/info';
import { Organization, OrganizationData } from '../_objects/organization';
import { Person, PersonData } from '../_objects/person';
import { Status } from '../_objects/status';
import { Country, User } from '../_objects/user';
import { Workflow } from '../_objects/workflow';

import { Data } from '../_objects/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private documentsUrl = 'https://dms.pronion.com/index.page?cn=sk&cmd=view&view=document';
	private documentsUrl2 = 'http://192.168.2.55/gate.page?req=view&name=document';
	private selectedCountry: Country;

  httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
	
	// document table (/home)
	getDocumentTableData() {
		// activities, documents, categories, statuses
	}
	
	// document form
	getDocumentFormData(id: number) {
		// activities, budgets, budgetTypes, document, categories, projects
	}
	
	getDocument(id: number): Observable<Document> {
		const url = `https://dms.pronion.com/index.page?cn=sk&cmd=object&tab=document&rid=${id}`;
		return this.http.get<Document>(url);
	}
	
	addDocument(document: Document): Observable<Document> {
		return this.http.post<Document>(this.documentsUrl, document, this.httpOptions);
	}
	
	updateDocument(document: Document): Observable<any> {
		return this.http.put<Document>(this.documentsUrl, document, this.httpOptions);
	}
	
	deleteDocument(document: Document | number): Observable<Document> {
		const id = typeof document === 'number' ? document : document._rid;
    const url = `${this.documentsUrl}/${id}`;
		//TODO 
		return this.http.delete<Document>(url, this.httpOptions);
	}
	
	// organizations and people (/people-organizations)
	getOrganizationTableData() {
		// organizations
	}
	
	getOrganizationFormData(id: number): Observable<Organization> {
		const url = "";
		return this.http.get<Organization>(url);
	}

	addOrganization(organization: Organization) {
		//
	}
	
	updateOrganization(organization: Organization) {
		//
	}
	
	deleteOrganization(organization: Organization | number) {
		//
	}

	// people table (/people-organizations)
	getPeopleTableData() {
		// people
	}
	
	getPersonFormData(id: number) {
		const url = "";
		return this.http.get<Person>(url);
	}
	
	addPerson(person: Person) {
		//
	}
	
	updatePerson(person: Person) {
		//
	}
	
	deletePerson(person: Person) {
		//
	}
	
	setCountry(country: Country): void {
		this.selectedCountry = country;
	}
	
	//---------------------------------------------------------------------------------------------------------
	
	filterDocuments(
		filterProject = 0,
		filterCategory = 0,
		showArchived = 1,
		find = '',
		sortColumn = '_rid',
		sortOrder = 'asc',
		pageNumber = 0,
		pageSize = 25): Observable<DocumentData[]> {
			return this.http.get<DocumentData[]>(this.documentsUrl2, {
				params: new HttpParams()
					.set('filterProject', filterProject.toString())
					.set('filterCategory', filterCategory.toString())
					.set('showArchived', showArchived.toString())
					.set('find', find)
					.set('columnID', sortColumn)
					.set('sortOrder', sortOrder)
					.set('pageNumber', pageNumber.toString())
					.set('pageSize', pageSize.toString())
					.set('selectedCountry', this.selectedCountry._rid.toString())
			});
	}
	
	filterDocuments2(
		filterProject = 0,
		filterCategory = 0,
		showArchived = 1,
		find = '',
		sortColumn = '_rid',
		sortOrder = 'asc',
		pageNumber = 0,
		pageSize = 25): Observable<Data[]> {
		console.log(sortColumn);
		let data: Observable<Data[]>;
			return this.http.get<Data[]>(this.documentsUrl2, {
				params: new HttpParams()
					.set('filterProject', filterProject.toString())
					.set('filterCategory', filterCategory.toString())
					.set('showArchived', showArchived.toString())
					.set('find', find)
					.set('columnID', sortColumn)
					.set('sortOrder', sortOrder)
					.set('pageNumber', pageNumber.toString())
					.set('pageSize', pageSize.toString())
					.set('selectedCountry', this.selectedCountry._rid.toString())
			});
	}
	
}
