import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutersModule} from './main.routers.module';


@NgModule({
  imports: [
    CommonModule,
    MainRoutersModule,
  ],
  declarations: [
    MainComponent,
  ],
  providers: [],
})
export class MainModule { }
