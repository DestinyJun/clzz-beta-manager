import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeviceInspectionComponent} from './device-inspection.component';

const routes: Routes = [
  {path: '', component: DeviceInspectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceInspectionRoutingModule { }
