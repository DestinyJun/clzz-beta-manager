import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductionLineComponent} from './production-line/production-line.component';
import {DeviceComponent} from './device.component';
import {ProductionIcmComponent} from './production-icm/production-icm.component';
import {ProductionDataComponent} from './production-data/production-data.component';
import {ProductionSensorComponent} from './production-sensor/production-sensor.component';
const routes: Routes = [
  {
    path: '', component: DeviceComponent,
    children: [
      {path: 'proline', component: ProductionLineComponent},
      {path: 'prolicm', component: ProductionIcmComponent},
      {path: 'proldata', component: ProductionDataComponent},
      {path: 'prolsen', component: ProductionSensorComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DeviceRoutersModule {}
