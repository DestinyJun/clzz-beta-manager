import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReqService} from '../shared/req.service';
import {GlobalService} from '../shared/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public pisMenu: boolean;
  public loginTime: Date;
  private interval;
  constructor(
    private localSessionStorage: GlobalService,
    private req: ReqService,
    private router: Router
  ) {
  }
  ngOnInit() {
    // 为了监听用户在电脑在登录了多久，主要原因：在用户电脑进行休眠时，下面的setInterval 将会停止计算，但是后台还在走时。
    // this.loginTime = new Date();
    this.pisMenu = false;
    // 如果用户还在浏览，但登录账号已经失效，则重新登录来维持用户在线
    // 检测频率：2分钟
    // this.interval = setInterval(() => {
    //   this.req.getUserInfo({'sid': this.localSessionStorage.get('sid')}).subscribe(value => {
    //     if (value.status !== 10) {
    //       const userLoginInfo = {
    //         uname: this.localSessionStorage.get('uname'),
    //         upwd: this.localSessionStorage.get('upwd'),
    //         module: this.localSessionStorage.get('module')
    //       };
    //       this.req.Login(userLoginInfo)
    //         .subscribe(res => {
    //           console.log(res);
    //           if (Number(res.status) === 14 || Number(res.status) === 10) {
    //             this.localSessionStorage.set('realName', res.realName);
    //             this.localSessionStorage.set('sid', res.sid);
    //             this.localSessionStorage.set('logstatus', '10');
    //           }
    //         });
    //     }
    //   });
    // }, 120000);
  }
  // 检查用户登录状态
  public checkLoginStatus(): void {

  }

  public controlMenus(e): void {
    this.pisMenu = !this.pisMenu;
  }

  ngOnDestroy(): void {
    this.localSessionStorage.set('realName', null);
    this.localSessionStorage.set('sid', null);
    this.localSessionStorage.set('uname', null);
    this.localSessionStorage.set('upwd', null);
    this.localSessionStorage.set('module', null);
    this.localSessionStorage.set('logstatus', null);
    clearInterval(this.interval);
  }

}
