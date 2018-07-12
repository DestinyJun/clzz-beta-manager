import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideosRoutersModule} from './videos.routers.module';
import {VideosComponent} from './videos.component';
import {VideoWindowComponent} from './video-window/video-window.component';
import {VideoManagerComponent} from './video-manager/video-manager.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TreeModule } from 'ng2-tree';
import {PagevideoComponent} from '../../based/pagevideo/pagevideo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VideosRoutersModule,
    ReactiveFormsModule,
    TreeModule
  ],
  declarations: [
    VideosComponent,
    VideoWindowComponent,
    VideoManagerComponent,
    PagevideoComponent
  ],
  exports: [],
  providers: [],
})
export class  VideosModule { }
