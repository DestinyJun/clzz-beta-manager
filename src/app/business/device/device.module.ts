import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeviceComponent} from './device.component';
import {DeviceRoutersModule} from './device.routers.module';
import {ProductionLineComponent} from './production-line/production-line.component';
import {ProductionIcmComponent} from './production-icm/production-icm.component';
import {ProductionDataComponent} from './production-data/production-data.component';
import {ProductionSensorComponent} from './production-sensor/production-sensor.component';
import { ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasedModule} from '../../based/based.module';

@NgModule({
  imports: [
    CommonModule,
    DeviceRoutersModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BasedModule
  ],
  declarations: [
    DeviceComponent,
    ProductionLineComponent,
    ProductionIcmComponent,
    ProductionDataComponent,
    ProductionSensorComponent
  ],
  providers: [],
  exports: []
})
export class DeviceModule { }
