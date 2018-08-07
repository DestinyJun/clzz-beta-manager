import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagingComponent} from './paging/paging.component';
import {FormsModule} from '@angular/forms';
import {DataloadComponent} from './dataload/dataload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PagingComponent,
    DataloadComponent
  ],
  exports: [
    PagingComponent,
    DataloadComponent
  ]
})
export class BasedModule { }
