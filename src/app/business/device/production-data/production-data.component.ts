import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DeviceProductionDataList, Field, PageBody, ValidMsg} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonFunService} from '../../../shared/common-fun.service';
import {digitAndLetterValidator} from '../../../validator/Validators';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-production-data',
  templateUrl: './production-data.component.html',
  styleUrls: ['./production-data.component.css']
})
export class ProductionDataComponent implements OnInit, OnDestroy {
  public datas: Array<DeviceProductionDataList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: any;
  public Fmodalid: any;
  public baseVar: BaseVar;
  private componentName: string;
  private deleteForm: FormGroup;
  private queryForm: FormGroup;
  constructor(
    private commonOperation: CommonOperation<DeviceProductionDataList>,
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {
  }

  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'ProductionDataComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    //  增加表单
    this.addForm = this.fb.group({
      did: ['', Validators.required, digitAndLetterValidator],
      name: ['', Validators.required],
      fnum: ['', Validators.required],
      dvender: ['', Validators.required],
      dmodule: ['', Validators.required],
      dprodate: ['', Validators.required],
      dinstalldate: ['', Validators.required],
      power: ['', Validators.required],
      current: ['', Validators.required],
      voltage: ['', Validators.required],
      usestatus: ['', Validators.required],
      dtype: ['', Validators.required],
      dstatus: ['', Validators.required],
      mid: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      did: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', Validators.required],
      fnum: ['', Validators.required],
      dvender: ['', Validators.required],
      dmodule: ['', Validators.required],
      dprodate: ['', Validators.required],
      dinstalldate: ['', Validators.required],
      power: ['', Validators.required],
      current: ['', Validators.required],
      voltage: ['', Validators.required],
      usestatus: ['', Validators.required],
      dtype: ['', Validators.required],
      dstatus: ['', Validators.required],
      mid: ['', Validators.required]
    });
    this.deleteForm = this.fb.group({
      did: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    this.fieldsAdd = [
      new Field('编号', 'did', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('设备名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('厂家编号', 'fnum', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('生产厂家', 'dvender', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('设备型号', 'dmodule', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('生产日期', 'dprodate', 'date', [new ValidMsg('required', '* 必填项')]),
      new Field('安装日期', 'dinstalldate', 'date', [new ValidMsg('required', '* 必填项')]),
      new Field('额定功率(W)', 'power', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('额定电流(A)', 'current', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('额定电压(V)', 'voltage', 'text', [new ValidMsg('required', '* 必填项')]),
      ];
    this.fieldsModify = [
      new Field('编号',	'did', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('设备名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('厂家编号',	'fnum', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('生产厂家',	'dvender', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('设备型号',	'dmodule', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('生产日期',	'dprodate', 'date', [new ValidMsg('required', '* 必填项')]),
      new Field('安装日期',	'dinstalldate', 'date', [new ValidMsg('required', '* 必填项')]),
      new Field('额定功率(W)',	'power', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('额定电流(A)',	'current', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('额定电压(V)',	'voltage', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.req.post(Url.Data.moduleBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
  //  下面的关于下拉框选择的操作
  public selectUesStatus(value, form): void {
      form.patchValue({'usestatus': value});
  }
  public selectDType(value, form): void {
    form.patchValue({'dtype': value});
  }
  public selectDStatus(value, form): void {
    form.patchValue({'dstatus': value});
  }
  public selectModalId(value, form): void {
    form.patchValue({'mid': value});
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
    this.commonOperation.delete(this.deleteForm, Url.Data.deviceProductionData.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.deviceProductionData.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.deviceProductionData.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.deviceProductionData.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<DeviceProductionDataList>): void {
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
