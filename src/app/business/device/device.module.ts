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
import {PagedeviceComponent} from '../../based/pagedevice/pagedevice.component';
import {SlimLoadingBarModule} from './../../../../node_modules/ng2-slim-loading-bar';
@NgModule({
  imports: [
    CommonModule,
    DeviceRoutersModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SlimLoadingBarModule
  ],
  declarations: [
    DeviceComponent,
    ProductionLineComponent,
    ProductionIcmComponent,
    ProductionDataComponent,
    ProductionSensorComponent,
    PagedeviceComponent
  ],
  providers: [],
  exports: [SlimLoadingBarModule]
})
export class DeviceModule { }
