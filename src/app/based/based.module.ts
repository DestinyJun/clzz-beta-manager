import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagingComponent} from './paging/paging.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataloadComponent} from './dataload/dataload.component';
import { DatePluginComponent } from './date-plugin/date-plugin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PagingComponent,
    DataloadComponent,
    DatePluginComponent
  ],
  exports: [
    PagingComponent,
    DataloadComponent,
    DatePluginComponent
  ]
})
export class BasedModule { }
