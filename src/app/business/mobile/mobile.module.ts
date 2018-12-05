import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MobileRoutersModule} from './mobile.routers.module';
import {MobileComponent} from './mobile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {NgxQRCodeModule} from 'ngx-qrcode3';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    MobileRoutersModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    FileUploadModule
  ],
  declarations: [
    MobileComponent
  ],
  providers: [],
})
export class  MobileModule { }
