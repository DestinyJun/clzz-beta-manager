import { Injectable } from '@angular/core';
import {ReqService} from './req.service';

@Injectable()
export class CommonfunService {
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

// 删除的提示信息
  public deleteChecked(datas: Array<any>, indexs: Array<number>, keyName: string): boolean {
    let str = '';
    for (let i = 0; i < indexs.length; ++i) {
      str += datas[indexs[i]][keyName] + '\n';
    }
    return confirm('确定删除项：\n\n' + str);
  }
  // 时间格式化输出, 没有精确到秒
  public defineTimeFormat(time: any): string {
    const t = Number(time);
    let newTime = '';
    if (typeof t === 'number') {
      const strTime = new Date(t);
      newTime = strTime.getFullYear() +
        '/' + (strTime.getMonth() + 1) +
        '/' + strTime.getDate() +
        ' ' + strTime.getHours() +
        ':' + strTime.getMinutes();
    }
    return newTime;
  }

  // 对象深度拷贝
  public objDeepCopy(oldObj: any, newObj: any): any {
    newObj = newObj || {};
    for (const prop in oldObj) {
      if (typeof oldObj[prop] === 'object') {
        newObj[prop] = (oldObj[prop].constructor === 'Array' ? [] : {});
        this.objDeepCopy(oldObj[prop], newObj[prop]);
      }else {
        newObj[prop] = oldObj[prop];
      }
    }
    return newObj;
  }
}
