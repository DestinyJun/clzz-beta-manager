import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {GlobalService} from '../shared/global.service';
import {ReqService} from '../shared/req.service';
import {PostRequest} from '../user-defined-service/PostRequest';
import {Url} from '../user-defined-service/Url';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor (
    private localSessionStorage: GlobalService,
    private req: PostRequest,
    public router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.localSessionStorage.get('logstatus')) {
      if (Number(this.localSessionStorage.get('logstatus')) === 10) {
        return true;
      }
      if (Number(this.localSessionStorage.get('logstatus')) === 14) {
        this.req.post(Url.Data.sidUpdate, JSON.stringify({sid: this.localSessionStorage.get('sid')}))
          .subscribe(value => {
            console.log('value=' + JSON.stringify(value));
            if (Number(value.status) === 10) {
              console.log('刷新成功!');
              return true;
            }
            if (Number(value.status) === 13) {
              alert('你的账号登录已经过期!');
              this.router.navigate(['/login']);
            }
          });
        return true;
      }
    }
    return false;
  }
}
