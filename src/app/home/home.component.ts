import {Component, OnInit} from '@angular/core';
import {ReqService} from '../shared/req.service';
import {GlobalService} from '../shared/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pisMenu: boolean;
  public loginTime: Date;
  constructor(
    private localSessionStorage: GlobalService,
    private req: ReqService,
  ) {
  }
  ngOnInit() {
    // 为了监听用户在电脑在登录了多久，主要原因：在用户电脑进行休眠时，下面的setInterval 将会停止计算，但是后台还在走时。
    this.loginTime = new Date();
    this.pisMenu = false;
    this.req.setCountValidator(0);
    this.req.setLoginTime(this.loginTime);
    this.req.cleanInterval();
    let counter: any = 0;
    const interval = setInterval(() => {
      if ((new Date()).getTime() -  this.loginTime.getTime() > 600000) {
        this.req.setCountValidator(600);
      }
      counter = this.req.getCountValidator();
      this.req.setCountValidator(++counter);
    }, 1000);
    this.req.setInterval(interval);
  }
  // 检查用户登录状态
  public checkLoginStatus(): void {

  }

  public controlMenus(e): void {
    this.pisMenu = !this.pisMenu;
  }

}
