import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideosRoutersModule} from './videos.routers.module';
import {VideosComponent} from './videos.component';
import {VideoWindowComponent} from './video-window/video-window.component';
import {VideoManagerComponent} from './video-manager/video-manager.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TreeModule } from 'ng2-tree';
import {BasedModule} from '../../based/based.module';
import {CameraComponent} from './video-manager/camera/camera.component';
import {CameraGroupComponent} from './video-manager/camera-group/camera-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VideosRoutersModule,
    ReactiveFormsModule,
    TreeModule,
    BasedModule
  ],
  declarations: [
    VideosComponent,
    VideoWindowComponent,
    VideoManagerComponent,
    CameraComponent,
    CameraGroupComponent
  ],
  exports: [],
  providers: [],
})
export class  VideosModule { }
