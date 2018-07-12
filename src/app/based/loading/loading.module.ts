import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingRoutingModule } from './loading-routing.module';
import { LoadingComponent } from './loading.component';
import {SlimLoadingBarModule} from './../../../../node_modules/ng2-slim-loading-bar';

@NgModule({
  imports: [
    CommonModule,
    LoadingRoutingModule,
    SlimLoadingBarModule
  ],
  declarations: [LoadingComponent]
})
export class LoadingModule { }
