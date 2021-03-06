import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ReqService} from '../../shared/req.service';
import {PageBody} from '../../shared/global.service';
import {CommonFunService} from '../../shared/common-fun.service';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnDestroy {
  @Input()
  public pageBody: PageBody;
  @Output()
  public pageBodyChange: EventEmitter<PageBody> = new EventEmitter;
  @Input()
  public num: number;
  public nowPage: number;
  public skpPage: string;
  constructor(
    public req: ReqService,
    public commonFun: CommonFunService
  ) {}
  ngOnInit() {
    this.skpPage = '1';
    this.pageBody = this.commonFun.readMark(this.commonFun.getCurrentComponentName()) || new PageBody(1, 10);
    this.nowPage = this.pageBody.page;
    this.pageBodyChange.emit(this.pageBody);
  }

  //  首页页
  public firstPage(): void {
    this.pageBody.page = 1;
    this.nowPage = 1;
    this.pageBodyChange.emit(this.pageBody);
  }

//  上一页
  public previousPage(): void {
    if (this.pageBody.page <= 1) {
      alert('已经到达首页');
    } else {
      this.pageBody.page -= 1;
      this.nowPage = this.pageBody.page;
      this.pageBodyChange.emit(this.pageBody);
    }
  }

//  下一页
  public nextPage(): void {
    if (this.pageBody.page >= this.num) {
      alert('已经到达尾页');
    } else {
      this.pageBody.page += 1;
      this.nowPage = this.pageBody.page;
      this.pageBodyChange.emit(this.pageBody);
    }
  }

  // 尾页
  public lastPage(): void {
    this.pageBody.page = this.num;
    this.nowPage = this.pageBody.page;
    this.pageBodyChange.emit(this.pageBody);
  }

  // 指定跳转页
  public appointPage(event): void {
    if (event.keyCode === 13 || event.type === 'click') {
      if (Number(this.skpPage) > this.num || Number(this.skpPage) <= 0 || this.skpPage === null) {
        alert('你的输入超过最大页数或格式有误');
      } else {
        this.pageBody.page = Number(this.skpPage);
        this.nowPage = Number(this.skpPage);
        this.pageBodyChange.emit(this.pageBody);
      }
    }
  }

  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.commonFun.getCurrentComponentName(), this.pageBody);
  }
}
