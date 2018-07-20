import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideosComponent} from './videos.component';
import {VideoWindowComponent} from './video-window/video-window.component';
import {VideoManagerComponent} from './video-manager/video-manager.component';
import {CameraComponent} from './video-manager/camera/camera.component';
import {CameraGroupComponent} from './video-manager/camera-group/camera-group.component';
const mainRoutes: Routes = [
  {
    path: '', component: VideosComponent,
    children: [
      { path: 'videowin', component: VideoWindowComponent},
      { path: 'videoman', component: VideoManagerComponent,
        children: [
          { path: '', component: CameraGroupComponent},
          { path: 'camera/:id', component: CameraComponent}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class VideosRoutersModule {}
