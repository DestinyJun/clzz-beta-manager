import { Injectable } from '@angular/core';
import {ReqService} from './req.service';
import {Map, PageBody} from './global.service';

@Injectable()
export class CommonfunService {
  private list = Map.getMap();
  constructor(
    private req: ReqService
  ) {}

  /**
   *
   * @param object 需要参数序列化的对象
   * @return 返回序列化好的字符串
   */
  public parameterSerialization(object: Object): string {
    let result: string;
    for (const f in object) {
      if (result) {
        result = result + '&' + f + '=' + object[f];
      } else {
        result = f + '=' + object[f];
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

  /**
   *
   * @param time
   */
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

  /**
   * role: 主要用户在进行一些操作时，不需要对原对象进行修改。就可以通过先对对象进行拷贝然后对副本进行操作
   * @param oldObj 原对象
   * @param newObj 副本
   * @return 返回副本
   */
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

  /**
   * @description 对每个组件进行浏览记忆功能
   */
  public rememeberMark(component: string, data: PageBody): void {
    this.list.put(component, data);
  }
  public readMark(componentName: string): PageBody {
    return this.list.get(componentName);
  }

}
