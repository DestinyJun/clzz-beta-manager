import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Field, PageBody, UserPowerInfo} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonFunService} from '../../../shared/common-fun.service';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})

export class UserManagerComponent implements OnInit, OnDestroy {
  public datas: Array<UserPowerInfo>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public detail: UserPowerInfo;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public deleteForm: FormGroup;
  public queryForm: FormGroup;
  public Fmodalid: any;
  private componentName: string;
  public userId: any;
  public baseVar: BaseVar;
  constructor(
    private fb: FormBuilder,
    private commonFun: CommonFunService,
    private postRequest: PostRequest,
    private commonOperation: CommonOperation<UserPowerInfo>
) {}
  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'UserManagerComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    this.addForm = this.fb.group({
      userid: ['', Validators.required],
      moduleid: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      id: ['', Validators.required],
      userid: ['', Validators.required],
      moduleid: ['', Validators.required]
    });
    this.deleteForm = this.fb.group({
      id: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    this.postRequest.post(Url.Data.moduleBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values;
    });
    this.postRequest.post(Url.Data.userBaseInfo.find, null).subscribe(value => {
      this.userId = value.values;
    });
  }
  public selectAddModalId(value): void {
    this.addForm.patchValue({'moduleid': value});
  }
  public selectModifyModalId(value): void {
    this.modifyForm.patchValue({'moduleid': value});
  }
  public selectAdduserid(value): void {
    this.addForm.patchValue({'userid': value});
  }
  public selectModifyuserid(value): void {
    this.modifyForm.patchValue({'userid': value});
  }
  // 翻页
  public getPageBody(event): void {
    this.pageBody = event;
    this.foundByPage();
  }
  public openModal(template: TemplateRef<any>, i): void {
    this.commonOperation.openModal(template, i);
  }
  public closeModal(): void {
    this.commonOperation.closeModal();
  }
  public checkAll(e): void {
    this.commonOperation.checkAll(e);
  }
  public checkOne(e, data): void {
    this.commonOperation.checkOne(e, data);
  }
  public delete(): void {
    this.commonOperation.delete(this.deleteForm, Url.Data.userPower.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.userPower.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.userPower.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.userPower.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<UserPowerInfo>): void {
    this.datas = data;
  }
  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }
  public cleanScreen(): void {
    this.baseVar.openStatus = true;
    this.baseVar.state = 0;
  }
}
