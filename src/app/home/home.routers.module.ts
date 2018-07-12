import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', loadChildren: 'app/business/main/main.module#MainModule'},
      {path: 'department', loadChildren: 'app/business/department/department.module#DepartmentModule'},
      {path: 'device', loadChildren: 'app/business/device/device.module#DeviceModule'},
      {path: 'jurisdiction', loadChildren: 'app/business/jurisdiction/jurisdiction.module#JurisdictionModule'},
      {path: 'mobile', loadChildren: 'app/business/mobile/mobile.module#MobileModule'},
      {path: 'technology', loadChildren: 'app/business/technology/technology.module#TechnologyModule'},
      {path: 'users', loadChildren: 'app/business/users/users.module#UsersModule'},
      {path: 'videos', loadChildren: 'app/business/videos/videos.module#VideosModule'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutersModule {}
