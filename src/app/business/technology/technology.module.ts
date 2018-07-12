import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TechnologyComponent} from './technology.component';
import {TechnologyRoutersModule} from './technology.routers.module';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PagetechnologyComponent} from '../../based/pagetechnology/pagetechnology.component';
import {TechnicspackAmendComponent} from './technicspack-amend/technicspack-amend.component';
import {TechnicspackTemperatureComponent} from './technicspack-temperature/technicspack-temperature.component';
@NgModule({
  imports: [
    CommonModule,
    TechnologyRoutersModule,
    ModalModule.forRoot(),
    PaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TechnologyComponent,
    PagetechnologyComponent,
    TechnicspackAmendComponent,
    TechnicspackTemperatureComponent
  ],
  providers: [],
})
export class  TechnologyModule { }
