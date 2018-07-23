import {Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ReqService} from '../shared/req.service';
import {Router} from '@angular/router';
import {GlobalService} from '../shared/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pisMenu: boolean;
  constructor(
    private localSessionStorage: GlobalService,
    private req: ReqService,
    public router: Router
  ) {
  }
  ngOnInit() {
    this.pisMenu = false;
  }

  public controlMenus(e): void {
    this.pisMenu = !this.pisMenu;
  }

}
