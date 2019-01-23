import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Field, ItemList, PageBody, ValidMsg} from '../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalService} from 'ngx-bootstrap/modal';
import {ReqService} from '../../shared/req.service';
import {CommonFunService} from '../../shared/common-fun.service';
import {digitAndLetterValidator, digitValidator} from '../../validator/Validators';
import {Url} from '../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../user-defined-service/CommonOperation';

@Component({
  selector: 'app-device-inspection',
  templateUrl: './device-inspection.component.html',
  styleUrls: ['./device-inspection.component.css']
})
export class DeviceInspectionComponent implements OnInit, OnDestroy {
  public datas: Array<ItemList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: ItemList;
  public Fmodalid: any;
  public validTimeFormat: boolean;
  public QRcodeValue: string;
  public baseVar: BaseVar;
  private componentName: string;
  public timeStamp: string;
  private queryForm: FormGroup;
  private deleteForm: FormGroup;
  constructor(
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    private commonOperation: CommonOperation<ItemList>,
    private commonFun: CommonFunService
  ) {
  }

  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'DeviceInspectionComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    this.detail = new ItemList(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.validTimeFormat = false;
    //  增加表单
    this.addForm = this.fb.group({
      itemname: ['', [Validators.required]],
      itemposition: ['', [Validators.required]],
      // longitude: ['', [Validators.required],
      // latitude: ['', [Validators.required],
      itemdetail: ['', [Validators.required]],
      unitcode: ['', [Validators.required]],
      itemmembers: ['', [Validators.required]],
      timecell: ['', [Validators.required]],
      starttime: ['', [Validators.required]]
      // starttime1: ['', [Validators.required]
    });
    this.modifyForm = this.fb.group({
      itemcode: ['', [Validators.required, digitAndLetterValidator]],
      itemname: ['', [Validators.required]],
      itemposition: ['', [Validators.required]],
      longitude: ['', [Validators.required, digitValidator]],
      latitude: ['', [Validators.required, digitValidator]],
      itemdetail: ['', [Validators.required]],
      unitcode: ['', [Validators.required]],
      itemmembers: ['', [Validators.required]],
      starttime: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      timecell: ['', [Validators.required]]
    });
    this.deleteForm = this.fb.group({
      itemcode: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    this.fieldsAdd = [
      new Field('巡检名称',	'itemname', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('巡检位置',	'itemposition', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('巡检位置经度',	'longitude'),
      // new Field('巡检位置纬度',	'latitude'),
      new Field('巡检明细',	'itemdetail', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('生产线编号',	'unitcode'),
      new Field('巡检巡检成员',	'itemmembers', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('开始时间（单位：小时）',	'starttime', 'datetime-local', [new ValidMsg('required', '* 必填项')]),
      new Field('巡检时间间隔（单位：小时）',	'timecell', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.fieldsModify = [
      new Field('巡检编号',	'itemcode', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('巡检名称',	'itemname', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('巡检位置',	'itemposition', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('位置经度',	'longitude', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '只能为数字')]),
      new Field('位置纬度',	'latitude', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '只能为数字')]),
      new Field('巡检明细',	'itemdetail', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('生产线编号',	'unitcode', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('巡检巡检成员',	'itemmembers', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('巡检时间间隔（单位：小时）',	'timecell', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    // 得到系统id
    this.req.FindsystemSysid().subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
  public selectLine(value, form): void {
    form.patchValue({'unitcode': value});
  }
  // 监控翻页事件
  public getPageBody(event: PageBody): void {
    this.pageBody = event;
    this.foundByPage();
  }
  public openModal(e, template: TemplateRef<any>, i): void {
    e.stopPropagation();
    this.commonOperation.openModal(template, i);
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'openQRcode') {
      this.QRcodeValue = this.datas[i].itemcode;
    }
    this.timeStamp = this.detail.starttime;
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
    this.commonOperation.delete(this.deleteForm, Url.Data.deviceInspection.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.deviceInspection.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.deviceInspection.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.deviceInspection.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<ItemList>): void {
    this.datas = data;
    for (let i = 0; i < this.datas.length; i++) {
      this.datas[i].start_time = new Date(this.datas[i].starttime).toLocaleString();
      this.datas[i].end_time = new Date(this.datas[i].endtime).toLocaleString();
    }
  }
  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }
  public cleanScreen(): void {
    this.baseVar.openStatus = true;
    this.baseVar.state = 0;
  }
  public getDateData(e, form: FormGroup): void {
    form.patchValue({
      starttime: e.getTime()
    });
  }
}
