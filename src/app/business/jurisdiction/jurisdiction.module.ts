import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JurisdictionComponent} from './jurisdiction.component';
import {JurisdictionRoutersModule} from './jurisdiction.routers.module';
import {BtnManagerComponent} from './btn-manager/btn-manager.component';
import {ModalManagerComponent} from './modal-manager/modal-manager.component';
import {InterfaceManagerComponent} from './interface-manager/interface-manager.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagejurisComponent} from '../../based/pagejuris/pagejuris.component';
@NgModule({
  imports: [
    CommonModule,
    JurisdictionRoutersModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    JurisdictionComponent,
    BtnManagerComponent,
    ModalManagerComponent,
    InterfaceManagerComponent,
    UserManagerComponent,
    PagejurisComponent
  ],
  providers: [],
})
export class JurisdictionModule { }
