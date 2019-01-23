import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PageBody, DeviceProductionLineList, Field, ValidMsg, JurisdictionInterface} from '../../../shared/global.service';
import {ReqService} from '../../../shared/req.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonFunService} from '../../../shared/common-fun.service';
import {digitAndLetterValidator} from '../../../validator/Validators';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-production-line',
  templateUrl: './production-line.component.html',
  styleUrls: ['./production-line.component.css']
})

export class ProductionLineComponent implements OnInit, OnDestroy {
  public datas: Array<DeviceProductionLineList>;
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
    private commonOperation: CommonOperation<DeviceProductionLineList>,
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {
  }
  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'ProductionLineComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    // 增加模态框表单
    this.addForm = this.fb.group({
      sid: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', [Validators.required]],
      did: ['', [Validators.required]]
    });
    this.modifyForm = this.fb.group({
      sid: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', [Validators.required]],
      did: ['', [Validators.required]]
    });
    this.deleteForm = this.fb.group({
      sid: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    // 只要是需要选择的下拉框，另放在后面
    this.fieldsAdd = [
      new Field('生产线编号',	'sid', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('父id',	'did')
    ];
    this.fieldsModify = [
      new Field('生产线编号',	'sid', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.req.post(Url.Data.departmentBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values['departments'];
    });
  }
  public selectDepartments(value, form): void {
    form.patchValue({'did': value});
  }
  // 监控翻页事件
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
    this.commonOperation.delete(this.deleteForm, Url.Data.deviceProductionLine.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.deviceProductionLine.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.deviceProductionLine.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.deviceProductionLine.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<DeviceProductionLineList>): void {
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



