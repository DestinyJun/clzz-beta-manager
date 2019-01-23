import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutersModule} from './home.routers.module';
import {HomeComponent} from './home.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap';
import {BasedModule} from '../based/based.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutersModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    // BasedModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule {}
