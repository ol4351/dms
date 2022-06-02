import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PeopleOrganizationsComponent } from './people-organizations/people-organizations.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { ExperimentalComponent } from './experimental/experimental.component';

const routes: Routes = [
	{ path: '', component: ExperimentalComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	//{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'document/:id', component: DocumentDetailComponent, canActivate: [AuthGuard] },
	{ path: 'organization/:id', component: OrganizationDetailComponent, canActivate: [AuthGuard] },
	{ path: 'person/:id', component: PersonDetailComponent, canActivate: [AuthGuard] },
	{ path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
	{ path: 'people-organizations', component: PeopleOrganizationsComponent, canActivate: [AuthGuard] },
	{ path: 'experimental/:id', component: ExperimentalComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
