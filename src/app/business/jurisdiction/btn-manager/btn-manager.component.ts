import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Field, JurisdictionBtnManager, JurisdictionInterface, PageBody, UserPowerInfo, ValidMsg} from '../../../shared/global.service';
import {CommonFunService} from '../../../shared/common-fun.service';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-btn-manager',
  templateUrl: './btn-manager.component.html',
  styleUrls: ['./btn-manager.component.css']
})
export class BtnManagerComponent implements OnInit, OnDestroy {
  public datas: Array<JurisdictionBtnManager>;
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
    private commonOperation: CommonOperation<JurisdictionBtnManager>,
    private postRequest: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {}
  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'BtnManagerComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    // 增加模态框表单
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      decription: ['', [Validators.required]],
      mid: ['', [Validators.required]]
    });
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      decription: ['', [Validators.required]],
      mid: ['', [Validators.required]]
    });
    this.deleteForm = this.fb.group({
      id: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    // 显示页面增，修表单控件
    this.fieldsAdd = [
      new Field('名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('描述',	'decription', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('模块id',	'midnew Field')
    ];
    this.fieldsModify = [
      new Field('按钮编号', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('描述', 'decription', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('模块编号', 'mid'),
    ];
    this.postRequest.post(Url.Data.moduleBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values;
      if (this.Fmodalid) {
        // this.btnmanagerAddForm.patchValue({'mid': this.Fmodalid[0].id});
      }
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
    this.commonOperation.delete(this.deleteForm, Url.Data.btnJurisdictionManager.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.btnJurisdictionManager.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.btnJurisdictionManager.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.btnJurisdictionManager.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<JurisdictionBtnManager>): void {
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
