import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Field, JurisdictionInterface, PageBody, UserPowerInfo, ValidMsg} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonFunService} from '../../../shared/common-fun.service';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-interface-manager',
  templateUrl: './interface-manager.component.html',
  styleUrls: ['./interface-manager.component.css']
})
export class InterfaceManagerComponent implements OnInit, OnDestroy {
  public datas: Array<JurisdictionInterface>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public Fmodalid: any;
  public baseVar: BaseVar;
  private componentName: string;
  private deleteForm: FormGroup;
  private queryForm: FormGroup;
  constructor(
    private commonOperation: CommonOperation<JurisdictionInterface>,
    private postRequest: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {}
  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'InterfaceManagerComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    this.deleteForm = this.fb.group({
      id: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    //     增加模态框表单
    this.addForm = this.fb.group({
      iname: ['', Validators.required],
      path: ['', Validators.required],
      pcode: ['', Validators.required],
      mid: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      id: ['', Validators.required],
      iname: ['', Validators.required],
      path: ['', Validators.required],
      pcode: ['', Validators.required],
      mid: ['', Validators.required]
    });
    // 显示页面增，修表单控件
    this.fieldsAdd = [
      new Field('接口名称',	'iname', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('接口路径',	'path', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('权限编码',	'pcode', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('模块id',	'mid'),
    ];
    this.fieldsModify = [
      new Field('接口编号',	'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('接口名称',	'iname', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('接口路径',	'path', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('权限编码',	'pcode', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.postRequest.post(Url.Data.moduleBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
// 选择增加设备id
  public selectAddModalId(value): void {
    this.addForm.patchValue({'mid': value});
  }
// 选择修改设备id
  public selectModifyModalId(value): void {
    this.modifyForm.patchValue({'mid': value});
  }
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
    this.commonOperation.delete(this.deleteForm, Url.Data.interfaceJurisdictionManager.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.interfaceJurisdictionManager.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.interfaceJurisdictionManager.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.interfaceJurisdictionManager.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<JurisdictionInterface>): void {
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
