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
    setInterval(() => {
      this.req.SidUpdate(JSON.stringify({sid: this.localSessionStorage.get('sid')}))
        .subscribe(value => {
          if (Number(value.status) === 10) {
            return true;
          }
          if (Number(value.status) === 13) {
            alert('你的账号登录已经过期!');
            this.router.navigate(['/login']);
          }
        });
    }, 600000);
  }
  // 检查用户登录状态
  public checkLoginStatus(): void {

  }

  public controlMenus(e): void {
    this.pisMenu = !this.pisMenu;
  }

}
