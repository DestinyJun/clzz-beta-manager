import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutersModule} from './users .routers.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {CustomFormsModule} from 'ng4-validators';
import {BasedModule} from '../../based/based.module';
@NgModule({
  imports: [
    CommonModule,
    UsersRoutersModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    BasedModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [],
})
export class  UsersModule { }
