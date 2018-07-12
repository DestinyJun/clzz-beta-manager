import {Component, OnDestroy} from '@angular/core';
import {ReqService} from './shared/req.service';
import {GlobalService} from './shared/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private req: ReqService,
    public localSessionStorage: GlobalService
  ) {
  }

}
