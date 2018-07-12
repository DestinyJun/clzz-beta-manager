import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizationComponent} from './organization/organization.component';
import {OrganizationManagementComponent} from './organization-management/organization-management.component';
import {DepartmentComponent} from './department.component';
const routes: Routes = [
  {path: '', component: DepartmentComponent,
    children: [
    {path: 'organization-management', component: OrganizationManagementComponent},
    {path: 'organization', component: OrganizationComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DepartmentRoutersModule {}
