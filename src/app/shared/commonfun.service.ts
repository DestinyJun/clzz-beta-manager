import { Injectable } from '@angular/core';
// import {PageBody} from './global.service';
import {ReqService} from './req.service';

@Injectable()
export class CommonfunService {
  // public gtone: boolean;
  // public mustone: boolean;
  // public datas: Array<any>;
  // public num: number;
  // public openstatus: boolean;
  // public status: number;
  // public hasChecked: Array<number>;
  // public checked: string;
  constructor(
    private req: ReqService
  ) { }

  // 参数序列化
  public parameterSerialization(form: Object): string {
    let result: string;
    for (const f in form) {
      if (result) {
        result = result + f + '=' + form[f] + '&';
      } else {
        result = f + '=' + form[f] + '&';
      }
    }
    return result;
  }


  //   // 刷新
  // public Update(pageBody: PageBody): any {
  //   this.mustone = false;
  //   this.req.getDeviceProductionData(this.parameterSerialization(pageBody)).subscribe(
  //     (value) => {
  //       this.hasChecked = [];
  //       this.checked = '';
  //       this.num = Math.ceil(value.values.num / 10);
  //       this.datas = value.values.datas;
  //       return this.datas;
  //       setTimeout(() => {
  //         this.openstatus = true;
  //         this.status = 0;
  //       }, 2500);
  //     });
  // }

}
