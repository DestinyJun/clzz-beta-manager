import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceInspectionRoutingModule } from './device-inspection-routing.module';
import {BasedModule} from '../../based/based.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxQRCodeModule} from 'ngx-qrcode3';
import {DeviceInspectionComponent} from './device-inspection.component';

@NgModule({
  imports: [
    CommonModule,
    BasedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    DeviceInspectionRoutingModule
  ],
  declarations: [
    DeviceInspectionComponent
  ]
})
export class DeviceInspectionModule { }
