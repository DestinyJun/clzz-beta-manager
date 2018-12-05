import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DeviceProductionDataList, Field, PageBody, ValidMsg} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';
import {digitAndLetterValidator} from '../../../validator/Validators';

@Component({
  selector: 'app-production-data',
  templateUrl: './production-data.component.html',
  styleUrls: ['./production-data.component.css']
})
export class ProductionDataComponent implements OnInit, OnDestroy {
  public datas: Array<DeviceProductionDataList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: any;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  public listenDescModal: boolean;
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
      // new Field('使用状态', 'usestatus', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('设备类型', 'dtype', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('设备运行状态', 'dstatus', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('模块id', 'mid', 'text), [{'required,: '* 必填项
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
      // new Field('使用状态',	'usestatus', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('设备类型',	'dtype', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('设备运行状态',	'dstatus', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('模块id',	'mid', 'text), [{'required,: '* 必填项
    ];
    // 对表格的初始化
    this.pageBody = new PageBody(1, 10);
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
    this.Update();
    this.req.FindmodularMid().subscribe(value => {
      this.Fmodalid = value.values;
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
  // 选择增加设备id
  public SelectAddModalId(value): void {
    this.addForm.patchValue({'mid': value});
  }
// 选择修改设备id
  public SelectModifyModalId(value): void {
    this.modifyForm.patchValue({'mid': value});
  }
  // 监控翻页事件
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
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public deleteProData(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'name')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.DeviceProductionDataDelete('did=' +  this.datas[this.hasChecked[j]].did)
            .subscribe(res => {
              if (j === haschecklen - 1) {
                this.resMessage = res.message;
                this.status = Number(res.status);
                this.Update();
              }
            });
        }
      }
    }
  }
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public proDataAdd(): void {
    console.log(this.addForm.value);
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.DeviceProductionDataAdd(this.commonfun.parameterSerialization(this.addForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    }else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public proDataModify(): void {
    if (this.modifyForm.valid) {
        this.openstatus = false;
        this.inputvalid = false;
        this.modalRef.hide();
        this.req.DeviceProductionDataModify(this.commonfun.parameterSerialization(this.modifyForm.value))
          .subscribe(res => {
            this.resMessage = res.message;
            this.status = Number(res.status);
            this.Update();
          });
    }else {
      this.inputvalid = true;
    }
  }
  // 刷新
  public Update(): void {
    this.addForm.reset();
    this.gtone = false;
    this.mustone = false;
    this.req.getDeviceProductionData(this.commonfun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.hasChecked = [];
        this.checked = '';
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
