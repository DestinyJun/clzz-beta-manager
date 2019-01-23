import {IDMLOperation} from './IDMLOperation';
import {FormGroup} from '@angular/forms';
import {CommonFunService} from '../shared/common-fun.service';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PostRequest} from './PostRequest';


@Injectable()
export class DMLOperationImpl implements IDMLOperation {
  private headers: { headers: HttpHeaders };
  constructor(
    private req: PostRequest
  ) {
    this.headers = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  }

  delete(form: FormGroup, url: string, headers ?: boolean): any {
    if (headers) {
      return this.req.post(url, CommonFunService.parameterSerialization1(form.value), this.headers);
    }
    CommonFunService.parameterSerialization1(form.value);
  }

  foundByPage(form: FormGroup, url: string, headers ?: boolean): any {
    if (headers) {
      const data = CommonFunService.parameterSerialization1(form.value);
      return this.req.post(url, data, this.headers);
    }
    return this.req.post(url, form.value);
  }

  save(form: FormGroup, url: string, headers ?: boolean): any {
    if (headers) {
      return this.req.post(url, CommonFunService.parameterSerialization1(form.value), this.headers);
    }
    return this.req.post(url, form.value);
  }

  update(form: FormGroup, url: string, headers ?: boolean): any {
    if (headers) {
      return this.req.post(url, CommonFunService.parameterSerialization1(form.value), this.headers);
    }
    return this.req.post(url, form.value);
  }
}
