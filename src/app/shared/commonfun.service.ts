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
  ) {}

  // 参数序列化
  public parameterSerialization(form: Object): string {
    let result: string;
    for (const f in form) {
      if (result) {
        result = result + '&' + f + '=' + form[f];
      } else {
        result = f + '=' + form[f];
      }
    }
    return result;
  }


  public deleteChecked(datas: Array<any>, indexs: Array<number>): boolean {
    let str = '';
    for (let i = 0; i < indexs.length; ++i) {
        str += datas[indexs[i]].name + '\n';
    }
    return confirm('确定删除项：\n\n' + str);
  }
}
