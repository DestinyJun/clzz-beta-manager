import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutersModule} from './users .routers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {CustomFormsModule} from 'ng4-validators';
import {PageusersComponent} from '../../based/pageusers/pageusers.component';
@NgModule({
  imports: [
    CommonModule,
    UsersRoutersModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  declarations: [
    UsersComponent,
    PageusersComponent
  ],
  providers: [],
})
export class  UsersModule { }
