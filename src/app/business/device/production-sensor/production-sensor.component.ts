import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {DeviceProductionSensorList, Field, PageBody, ValidMsg} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {CommonFunService} from '../../../shared/common-fun.service';
import {digitAndLetterValidator, digitValidator} from '../../../validator/Validators';

@Component({
  selector: 'app-production-sensor',
  templateUrl: './production-sensor.component.html',
  styleUrls: ['./production-sensor.component.css']
})
export class ProductionSensorComponent implements OnInit, OnDestroy {
  public datas: Array<DeviceProductionSensorList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public listenDescModal: boolean;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: DeviceProductionSensorList;
  public hasChecked: Array<number> = [];
  public checked: string;
  public openstatus: boolean;
  public status: number;
  public Fmodalid: any;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  public sensorType: SensorType[];
  public sensorStatus: SensorStatus[];
  public dataType: DataType[];
  constructor(
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {
  }

  ngOnInit() {
    this.commonFun.setCurrentComponentName('ProductionSensorComponent');
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
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
    this.req.FindDeviceDeviceid().subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
// 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      this.listenDescModal = true;
      this.detail = this.datas[i];
      this.modalRef = this.modalService.show(template);
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          this.modifyForm.reset(this.detail);
          this.modalRef = this.modalService.show(template);
          this.listenDescModal = false;
        }else {
          this.mustone = true;
        }
      } else {
        if (!this.listenDescModal) {
          this.detail = this.datas[this.hasChecked[0]];
        }
        this.mustone = false;
        this.modifyForm.reset(this.detail);
        this.modalRef = this.modalService.show(template);
        this.listenDescModal = false;
      }

    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      this.modalRef = this.modalService.show(template);
    }
  }
  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
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
    this.Update();
  }
  // 全选 或 全不选
  public getAllCheckBoxStatus(e): void {
    if (e.srcElement.checked === true) {
      this.hasChecked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.hasChecked.splice(this.datas.length, 10);
      this.checked = 'checked';
    } else {
      this.hasChecked = [];
      this.checked = '';
    }
  }

  // 得到已选择的checkBox
  public getCheckBoxStatus(e, i): void {
    const haschecklen = this.hasChecked.length;
    if (e.srcElement.checked === true) {
      this.hasChecked.push(i);
    } else {
      for (let j = 0; j < haschecklen; j++ ) {
        if (this.hasChecked[j] === i) {
          this.hasChecked.splice(j, 1);
        }
      }
    }
    if (this.hasChecked.length === 1) {
      this.detail = this.datas[this.hasChecked[0]];
    } else {
      this.detail = null;
    }
  }

  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public proSensorAdd(): void {
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.DeviceProductionSensorAdd(this.commonFun.parameterSerialization(this.addForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
//  删除表格 并且 重新请求数据
  public deleteProSensor(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      if (this.commonFun.deleteChecked(this.datas, this.hasChecked, 'sname')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.DeviceProductionSensorDelete('sid=' + this.datas[this.hasChecked[j]].sid)
            .subscribe(res => {
              if (j === haschecklen - 1) {
                this.status = Number(res.status);
                this.resMessage = res.message;
                this.Update();
              }
           });
        }
      }
    }
  }

//  修改表格内容
  public proSensorModify(): void {
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.DeviceProductionSensorModify(this.commonFun.parameterSerialization(this.modifyForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }

  // 增，删，改的及时刷新
  public Update(): void {
    this.addForm.reset();
    this.gtone = false;
    this.mustone = false;
    this.req.getDeviceProductionSensor(this.commonFun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.num = Math.ceil(value.values.num / 10);
        this.datas = value.values.datas;
        // 阻止用户点击 复选框时，会弹出查看模态框
        const setinter = setInterval(() => {
          const trs = document.getElementsByTagName('tr');
          // trs 长度大于 1时， 取消setInterval
          if (trs.length > 1) {
            for (let i = 1; i < trs.length; ++i) {
              const check = trs[i].children[0];
              // 移除勾选框的title属性
              check.setAttribute('title', '');
              // check.removeAttribute('title');
              // 取消勾选框冒泡默认行为
              check.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
              });
            }
            clearInterval(setinter);
          }
        });
        this.hasChecked = [];
        this.checked = '';
      });
  }

  public cleanScreen(): void {
    this.openstatus = true;
    this.status = 0;
  }

  ngOnDestroy(): void {
    if (this.modalRef !== undefined) {
      this.modalRef.hide();
    }
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
