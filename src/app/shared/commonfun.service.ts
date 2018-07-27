import { Injectable } from '@angular/core';
// import {PageBody} from './global.service';
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
  // 控制模态框的配置
  public getOperateModalConfig(): any {
    const operateModal = {
      /**控制点击背景时会自动关闭模态框
       */
      backdrop: false,
      /**当按下escape键时，关闭模态框
       */
      keyboard: true,
      focus: true,
      /**初始化时展示这个模态框
       */
      show: true,
      /**忽略点击背景
       */
      ignoreBackdropClick: true,
      /**
       * Css class for opened modal 在打开模态框时加上css样式
       */
      class: null,
      /**
       * Toggle animation  切换动画
       */
      animated: true,
      /**
       * Modal data  模块数据
       */
      initialState: Object
    };
    return operateModal;
  }
}
