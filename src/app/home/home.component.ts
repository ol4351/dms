import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, fromEvent } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { Activity } from '../_objects/activity';
import { Category } from '../_objects/category';
import { DataService } from '../_services/data.service';
import { DocumentDataSourceService } from '../_services/document.datasource.service';
import { Status } from '../_objects/status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['selected', 'dateCreated', 'description', 'comment', 'isProcessed', 'typeNameLo', 'activityName', 'userCreatedNickName', 'budgetTotal'];
  dataSource: DocumentDataSourceService;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
	@ViewChild('input') input: ElementRef;
  
  filterByActivity: Activity[];
  filterByCategory: Category[];
	selectedActivity: Activity = null;
	selectedCategory: Category = null;
	showProcessed = 1;
	private p_rid = 0;
	private c_rid = 0;
	private s_rid = 0;
  
	private columnID: string;
  pageSizeOptions = [1, 10, 25, 50, 100];
  selectedPageSize = 25; // cislo sa nezmeni, ked zmenim page size option????????
  
	public selection = new SelectionModel<any>(true, []);
	
  constructor(
		private dataService: DataService
	)	{ }
  
  ngOnInit(): void {
		this.dataSource = new DocumentDataSourceService(this.dataService);
		this.dataSource.loadDocuments(this.p_rid, this.c_rid, 1, '', '_rid', 'asc', 0, this.selectedPageSize);
  }
  
	
  ngAfterViewInit(): void {
		// server-side search
		fromEvent(this.input.nativeElement, 'keyup')
			.pipe(
				debounceTime(250),
				distinctUntilChanged(),
				tap(() => {
					this.paginator.pageIndex = 0;
					this.loadDocumentsPage();
				})
			)
			.subscribe();
		
		// reset paginator after sorting
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0, this.columnID = this.sort.active);
	
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => { 
					this.columnID = this.sort.active;
					this.loadDocumentsPage()
				})
			)
			.subscribe();
  }

  getProjects(): void {
	  //this.dataService.getProjects().subscribe(filterByActivity => this.filterByActivity = filterByActivity);
  }
  
  getCategories(): void {
	  //this.dataService.getCategories().subscribe(filterByCategory => this.filterByCategory = filterByCategory);
  }
  
  getStatuses(): void {
	  //this.dataService.getStatuses().subscribe(filterByStatus => this.filterByStatus = filterByStatus);
  }

	public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.dataSource.totalEntries > this.selectedPageSize) ? this.selectedPageSize : this.dataSource.totalEntries;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
			
  }
	
	public checkboxLabel(row?: any): string {
    return (!row)
      ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

	// combo box filtering
  loadDocumentsPage() {
		if (this.selectedActivity == null)
			this.p_rid = 0;
		else {
			this.p_rid = this.selectedActivity._rid;
		}
		if (this.selectedCategory == null)
			this.c_rid = 0;
		else
			this.c_rid = this.selectedCategory._rid;
		
		this.dataSource.loadDocuments(
			this.p_rid,
			this.c_rid,
			this.showProcessed,
			this.input.nativeElement.value,
			this.columnID,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);
	}
  
}
