import { Injectable } from '@angular/core';

@Injectable()
export class CommonfunService {

  constructor() { }

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

}
