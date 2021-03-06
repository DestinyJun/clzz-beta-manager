import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepartmentComponent} from './department.component';
import {DepartmentRoutersModule} from './department.routers.module';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrganizationComponent} from './organization/organization.component';
import {OrganizationManagementComponent} from './organization-management/organization-management.component';
import {CustomFormsModule} from 'ng4-validators';
import {BasedModule} from '../../based/based.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentRoutersModule,
    ModalModule.forRoot(),
    PaginationModule,
    CustomFormsModule,
    BasedModule
  ],
  declarations: [
    DepartmentComponent,
    OrganizationComponent,
    OrganizationManagementComponent
  ],
  providers: [],
})
export class DepartmentModule { }
