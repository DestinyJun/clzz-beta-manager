import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Field, JurisdictionModalList, PageBody, UserPowerInfo, ValidMsg} from '../../../shared/global.service';
import {CommonFunService} from '../../../shared/common-fun.service';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-modal-manager',
  templateUrl: './modal-manager.component.html',
  styleUrls: ['./modal-manager.component.css']
})
export class ModalManagerComponent implements OnInit, OnDestroy {
  public datas: Array<JurisdictionModalList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public Fmodalid: any;
  public FmodalFid: any;
  public baseVar: BaseVar;
  private componentName: string;
  private deleteForm: FormGroup;
  private queryForm: FormGroup;
  constructor(
    private commonOperation: CommonOperation<JurisdictionModalList>,
    private postRequest: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {}
  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'ModalManagerComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    this.deleteForm = this.fb.group({
      id: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    // 增加模态框表单
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      pid: ['', Validators.required],
      description: ['', Validators.required],
      mcode: ['', Validators.required],
      oid: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      pid: ['', Validators.required],
      description: ['', Validators.required],
      mcode: ['', Validators.required],
      oid: ['', Validators.required]
    });
    // 显示页面增，修表单控件
    this.fieldsAdd = [
      new Field('名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('描述',	'description', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('模块代号',	'mcode', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.fieldsModify = [
      new Field('模块数据Id',	'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('父id',	'pid', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('描述',	'description', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('模块代号',	'mcode', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.postRequest.post(Url.Data.departmentBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values.organizations;
        if (this.Fmodalid !== undefined) {
      }
    });
    this.postRequest.post(Url.Data.moduleBaseInfo.find, null).subscribe(value => {
      this.FmodalFid = value.values;
      if (this.FmodalFid !== undefined) {
      }
    });
  }
  // 增加时，选择组织ID
  public selectAddModalOid(value): void {
    this.addForm.patchValue({'oid': value});
  }
  // 修改时，选择组织ID
  public selectModifyModalOid(value): void {
    this.modifyForm.patchValue({'oid': value});
  }
  // 新增时，选择父ID
  public selectAddModalPid(value): void {
    this.addForm.patchValue({'pid': value});
  }
  // 修改时，选择父ID
  public selectModifyModalPid(value): void {
    this.modifyForm.patchValue({'pid': value});
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
    this.commonOperation.delete(this.deleteForm, Url.Data.modalJurisdictionManager.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.modalJurisdictionManager.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.modalJurisdictionManager.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.modalJurisdictionManager.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<JurisdictionModalList>): void {
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
