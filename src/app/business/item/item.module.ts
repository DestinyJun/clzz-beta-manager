import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import {BasedModule} from '../../based/based.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxQRCodeModule} from 'ngx-qrcode3';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    BasedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  declarations: [ItemComponent]
})
export class ItemModule { }
