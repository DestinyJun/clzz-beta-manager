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
 import {CommonFunService} from './shared/common-fun.service';
 import {DMLOperationImpl} from './user-defined-service/DMLOperationImpl';
 import {CommonOperation} from './user-defined-service/CommonOperation';
 import {ModalModule} from 'ngx-bootstrap';
 import {PostRequest} from './user-defined-service/PostRequest';

@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TreeModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    GlobalService,
    ReqService,
    CommonFunService,
    DMLOperationImpl,
    CommonOperation,
    PostRequest,
    LoginGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
