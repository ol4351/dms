import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, fromEvent } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Activity } from '../_objects/activity';
import { AlertService } from '../_services/alert.service';
import { Category } from '../_objects/category';
import { DataService } from '../_services/data.service';
import { ExperimentalDataSourceService } from '../_services/experimental.datasource.service';
import { Status } from '../_objects/status';

@Component({
  selector: 'app-experimental',
  templateUrl: './experimental.component.html',
  styleUrls: ['./experimental.component.css']
})
export class ExperimentalComponent implements OnInit {
	@Input()

  public dataSource = new ExperimentalDataSourceService(this.dataService, this.alertService);
  public selection = new SelectionModel<any>(true, []);
	private columnID: string;
	private states = [{'id': 0, 'name': 'document'}, {'id': 1, 'name': 'task'}, {'id': 2, 'name': 'activity'}, {'id': 3, 'name': 'organization'}, {'id': 4, 'name': 'person'}];
	filterByActivity: Activity[];
  filterByCategory: Category[];
  filterByStatus: Status[];
	selectedActivity: Activity = null;
	selectedCategory: Category = null;
	showProcessed = 1;
	state = this.states[0];
	stateId = +this.route.snapshot.paramMap.get('id');
	private p_rid = 0; // project rid
	private c_rid = 0; // category rid
	
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router, private alertService: AlertService) { }

	@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
	@ViewChild('input') input: ElementRef;

  ngOnInit(): void {
		switch (this.stateId) {
			case 0: 
				this.dataSource.loadDocuments(0, 0, 1, '', '_rid', 'asc', 0, 25);		
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			}
  }
	
	ngAfterViewInit(): void {
		// server-side search
		fromEvent(this.input.nativeElement, 'keyup')
			.pipe(
				debounceTime(250),
				distinctUntilChanged(),
				tap(() => {
					this.paginator.pageIndex = 0;
					switch (this.state.id) {
						case 0: 
							this.showDocuments();
							break;
						case 1:
							this.showMyTasks();
							break;
						case 2:
							this.showActivities();
							break;
						case 3:
							this.showOrganizations();
							break;
						case 4:
							this.showPeople();
							break;
						}
				})
			).subscribe();
			
		// reset paginator after sorting
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0, this.columnID = this.sort.active);
	
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => {
					this.columnID = this.sort.active;
					this.dataSource.loadDocuments(this.p_rid, this.c_rid, this.showProcessed, this.input.nativeElement.value, this.columnID, this.sort.direction, this.paginator.pageIndex, 25);
				})
			)
			.subscribe();
  }
	
	public getTableHeaderName(): string {
		switch (this.state.id) {
			case 0: 
				return "Documents";
			case 1:
				return "My tasks";
			case 2:
				return "Activities";
			case 3:
				return "Organizations";
			case 4:
				return "People";
		}
	}
	
	public isAllSelected() {
		if (!this.dataSource.data) {
			return false;
		}
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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

	// if id = 0 then it redirects to detail view with no data preloaded - meaning
	// user wants to create new object
	public rowRedirect(id: number): void {
		this.router.navigate([`/${this.state.name}/${id}`]);
	}

  public showDocuments(): void {
		this.state = this.states[0];
		this.router.navigate([`/experimental/${this.state.id}`]);
		if (this.selectedActivity == null)
			this.p_rid = 0;
		else {
			this.p_rid = this.selectedActivity._rid;
		}
		if (this.selectedCategory == null)
			this.c_rid = 0;
		else
			this.c_rid = this.selectedCategory._rid;

		this.dataSource.loadDocuments(this.p_rid, this.c_rid, 1, this.input.nativeElement.value, '_rid', 'asc', 0, 25);
    this.selection.clear();
  }

	public showMyTasks(): void {
		this.state = this.states[1];
		this.router.navigate([`/experimental/${this.state.id}`]);
		this.selection.clear();
	}
	
	public showActivities(): void {
		this.state = this.states[2];
		this.router.navigate([`/experimental/${this.state.id}`]);
		this.selection.clear();
	}

  public showOrganizations(): void {
		this.state = this.states[3];
		this.router.navigate([`/experimental/${this.state.id}`]);
    this.selection.clear();
  }
	
	public showPeople(): void {
		this.state = this.states[4];
		this.router.navigate([`/experimental/${this.state.id}`]);
		this.selection.clear();
	}
	
	public create(): void {
		this.rowRedirect(0);
	}

}
