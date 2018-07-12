import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JurisdictionComponent} from './jurisdiction.component';
import {BtnManagerComponent} from './btn-manager/btn-manager.component';
import {ModalManagerComponent} from './modal-manager/modal-manager.component';
import {InterfaceManagerComponent} from './interface-manager/interface-manager.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
const mainRoutes: Routes = [
  {
    path: '', component: JurisdictionComponent,
    children: [
      {path: 'btnma', component: BtnManagerComponent},
      {path: 'modalma', component: ModalManagerComponent},
      {path: 'interma', component: InterfaceManagerComponent},
      {path: 'userma', component: UserManagerComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class JurisdictionRoutersModule {}
