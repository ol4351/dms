import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { PeopleOrganizationsComponent } from './people-organizations/people-organizations.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { ExperimentalComponent } from './experimental/experimental.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentDetailComponent,
    TasksComponent,
    AlertComponent,
    LoginComponent,
    PeopleOrganizationsComponent,
    OrganizationDetailComponent,
    PersonDetailComponent,
    ExperimentalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		FormsModule,
		HttpClientModule,
    BrowserAnimationsModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		MatFormFieldModule,
    MatInputModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,
  ],
  exports: [
		MatPaginatorModule,
		MatTableModule,
		AppRoutingModule,
		MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
