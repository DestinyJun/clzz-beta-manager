import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TechnologyComponent} from './technology.component';
import {TechnologyRoutersModule} from './technology.routers.module';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TechnicspackAmendComponent} from './technicspack-amend/technicspack-amend.component';
import {TechnicspackTemperatureComponent} from './technicspack-temperature/technicspack-temperature.component';
import {BasedModule} from '../../based/based.module';
@NgModule({
  imports: [
    CommonModule,
    TechnologyRoutersModule,
    ModalModule.forRoot(),
    PaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BasedModule
  ],
  declarations: [
    TechnologyComponent,
    TechnicspackAmendComponent,
    TechnicspackTemperatureComponent
  ],
  providers: [],
})
export class  TechnologyModule { }
