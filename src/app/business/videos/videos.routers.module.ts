import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideosComponent} from './videos.component';
import {VideoWindowComponent} from './video-window/video-window.component';
import {VideoManagerComponent} from './video-manager/video-manager.component';
const mainRoutes: Routes = [
  {
    path: '', component: VideosComponent,
    children: [
      { path: 'videowin', component: VideoWindowComponent},
      { path: 'videoman', component: VideoManagerComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class VideosRoutersModule {}
