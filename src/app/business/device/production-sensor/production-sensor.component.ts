import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {DeviceProductionSensorList, Field, JurisdictionInterface, PageBody, ValidMsg} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonFunService} from '../../../shared/common-fun.service';
import {digitAndLetterValidator, digitValidator} from '../../../validator/Validators';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-production-sensor',
  templateUrl: './production-sensor.component.html',
  styleUrls: ['./production-sensor.component.css']
})
export class ProductionSensorComponent implements OnInit, OnDestroy {
  public datas: Array<DeviceProductionSensorList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: DeviceProductionSensorList;
  public Fmodalid: any;
  public sensorType: SensorType[];
  public sensorStatus: SensorStatus[];
  public dataType: DataType[];
  private componentName: string;
  public baseVar: BaseVar;
  private deleteForm: FormGroup;
  private queryForm: FormGroup;
  constructor(
    private commonOperation: CommonOperation<DeviceProductionSensorList>,
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {
  }

  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'ProductionSensorComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    // 模态框表单
    this.addForm = this.fb.group({
      sid: ['', [Validators.required, digitAndLetterValidator]],
      sname: ['', [Validators.required]],
      stype: ['', [Validators.required]],
      sdatatype: ['', [Validators.required]],
      saddress: ['', [Validators.required]],
      sstatus: ['', [Validators.required]],
      smax: ['', [Validators.required, digitValidator]],
      initialvalue: ['', [Validators.required, digitValidator]],
      did: ['', [Validators.required]]
    });
    this.modifyForm = this.fb.group({
      sid: ['', [Validators.required, digitAndLetterValidator]],
      sname: ['', [Validators.required]],
      stype: ['', [Validators.required]],
      sdatatype: ['', [Validators.required]],
      saddress: ['', [Validators.required]],
      sstatus: ['', [Validators.required]],
      smax: ['', [Validators.required, digitValidator]],
      initialvalue: ['', [Validators.required, digitValidator]],
      did: ['', [Validators.required]]
    });
    this.deleteForm = this.fb.group({
      sid: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    // 显示页面增，修改表单控件
    this.fieldsAdd = [
      new Field('传感器编号',	'sid', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('名称',	'sname', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('类型',	'stype', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('数据类型',	'sdatatype', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('变量地址',	'saddress', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('状态',	'sstatus', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('数值最大值',	'smax', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '只能为数字')]),
      new Field('初始值',	'initialvalue', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '只能为数字')]),
    ];
    this.fieldsModify = [
      new Field('传感器编号',	'sid', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('名称',	'sname', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('类型',	'stype', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('数据类型',	'sdatatype', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('变量地址',	'saddress', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('状态',	'sstatus', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('数值最大值',	'smax', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '只能为数字')]),
      new Field('初始值',	'initialvalue', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '只能为数字')]),
    ];
    // 初始化传感器类型
    this.sensorType = [
      {value: 0, note: '普通'},
      {value: 1, note: '温度'},
      {value: 2, note: '厚度'},
      {value: 3, note: '速度'},
      {value: 4, note: '电流'},
      {value: 4, note: '水位'},
    ];
    this.sensorStatus = [
      {value: 1, note: '启用'},
      {value: 0, note: '未启用'},
    ];
    this.dataType = [
      {value: 'BOOL', note: 'BOOL'},
      {value: 'REAL', note: 'REAL'},
    ];
    this.req.post(Url.Data.productionDeviceBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
//  数据类型选择
  public selectDataType(value, form): void {
    form.patchValue({sdatatype: value});
  }
//  类型选择
  public selectSType(value, form): void {
    form.patchValue({stype: value});
  }
  //  状态选择
  public selectStatus(value, form): void {
    form.patchValue({sstatus: value});
  }
// 选择设备id
  public selectDeviceId(value, form): void {
    form.patchValue({did: value});
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
    this.commonOperation.delete(this.deleteForm, Url.Data.deviceProductionSensor.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.deviceProductionSensor.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.deviceProductionSensor.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.deviceProductionSensor.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<DeviceProductionSensorList>): void {
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

// 传感器类型
interface SensorType {
  value: number;
  note: string;
}

// 传感器状态
interface SensorStatus {
  value: number;
  note: string;
}

// 数理类型
interface DataType {
  value: string;
  note: string;
}
