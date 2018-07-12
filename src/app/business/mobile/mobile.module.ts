import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MobileRoutersModule} from './mobile.routers.module';
import {MobileComponent} from './mobile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    MobileRoutersModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MobileComponent
  ],
  providers: [],
})
export class  MobileModule { }
