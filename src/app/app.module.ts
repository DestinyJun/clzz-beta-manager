 import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {AppRouterModule} from './app.router.module';
import {AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {GlobalService} from './shared/global.service';
import {ReqService} from './shared/req.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LoginGuard} from './guard/login.guard';
import {TreeModule} from 'ng2-tree';
 import {CommonfunService} from './shared/commonfun.service';
 import {CommonFunService} from './shared/common-fun.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreeModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    GlobalService,
    ReqService,
    CommonFunService,
    CommonfunService,
    LoginGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
