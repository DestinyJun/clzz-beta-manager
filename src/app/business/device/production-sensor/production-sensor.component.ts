import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {DeviceProductionSensorList, Field, PageBody} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-production-sensor',
  templateUrl: './production-sensor.component.html',
  styleUrls: ['./production-sensor.component.css']
})
export class ProductionSensorComponent implements OnInit {
  public datas: Array<DeviceProductionSensorList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public listenDescModal: boolean;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: any;
  public hasChecked: Array<number> = [];
  public checked: string;
  public openstatus: boolean;
  public status: number;
  public Fmodalid: any;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  constructor(
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    private commonfun: CommonfunService
  ) {
  }

  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    // 对表格的初始化
    this.pageBody = new PageBody(1, 10);
    // 显示页面增，修表单控件
    this.fieldsAdd = [
      new Field('监控器sid',	'sid'),
      new Field('名称',	'sname'),
      new Field('类型',	'stype'),
      new Field('数据类型',	'sdatatype'),
      new Field('变量地址',	'saddress'),
      new Field('状态',	'sstatus'),
      new Field('数值最大值',	'smax'),
      new Field('初始值',	'initialvalue')
      // new Field('推荐值',	'srecomm'),
      // new Field('设备id',	'did')
    ];
    this.fieldsModify = this.fieldsAdd;
    // 模态框表单
    this.addForm = this.fb.group({
      sid: ['', Validators.required],
      sname: ['', Validators.required],
      stype: ['', Validators.required],
      sdatatype: ['', Validators.required],
      saddress: ['', Validators.required],
      sstatus: ['', Validators.required],
      smax: ['', Validators.required],
      initialvalue: ['', Validators.required],
      did: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      sid: ['', Validators.required],
      sname: ['', Validators.required],
      stype: ['', Validators.required],
      sdatatype: ['', Validators.required],
      saddress: ['', Validators.required],
      sstatus: ['', Validators.required],
      smax: ['', Validators.required],
      initialvalue: ['', Validators.required],
      did: ['', Validators.required]
    });
    this.Update();
    this.req.FindDeviceDeviceid().subscribe(value => {
      this.Fmodalid = value.values;
      // this.proSensorAddForm.patchValue({'did': this.Fmodalid[0].did});
    });
  }
// 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // this.controlSearchText = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      // console.log('这是详情查看');
      this.listenDescModal = true;
      this.detail = this.datas[i];
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          this.modifyForm.reset(this.detail);
          this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
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
        this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
        this.listenDescModal = false;
      }

    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      // console.log('增加');
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
  }

  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
  }
// 选择增加设备id
  public SelectAddModalId(value): void {
    this.addForm.patchValue({'did': value});
  }
// 选择修改设备id
  public SelectModifyModalId(value): void {
    this.modifyForm.patchValue({'did': value});
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
    let haschecklen = this.hasChecked.length;
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
      this.req.DeviceProductionSensorAdd(this.commonfun.parameterSerialization(this.addForm.value))
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
    let haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'sname')) {
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
      this.req.DeviceProductionSensorModify(this.commonfun.parameterSerialization(this.modifyForm.value))
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
    this.req.getDeviceProductionSensor(this.commonfun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.num = Math.ceil(value.values.num / 10);
        this.datas = value.values.datas;
        // 阻止用户点击 复选框时，会弹出查看模态框
        const setinter = setInterval(() => {
          const trs = document.getElementsByTagName('tr');
          for (let i = 1; i < trs.length; ++i) {
            trs[i].children[0].addEventListener('click', (e) => {
              e.stopImmediatePropagation();
            });
          }
          // trs 长度大于 1时， 取消setInterval
          if (trs.length > 1) {
            clearInterval(setinter);
          }
        });
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
        this.hasChecked = [];
        this.checked = '';
      });
  }

}
