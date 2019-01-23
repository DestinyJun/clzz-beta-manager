import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';


@Injectable()
export class PostRequest {
  constructor(
    private httpClient: HttpClient
  ) {}
  public post(url: string, object: any, headers ?: any): Observable<any> {
    if (headers !== undefined && headers !== null) {
      return this.httpClient.post(url, object, headers);
    }
    return this.httpClient.post(url, object);
  }
}
