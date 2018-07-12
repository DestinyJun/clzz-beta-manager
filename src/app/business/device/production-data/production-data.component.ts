import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DeviceProductionDataList, PageBody} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';

@Component({
  selector: 'app-production-data',
  templateUrl: './production-data.component.html',
  styleUrls: ['./production-data.component.css']
})
export class ProductionDataComponent implements OnInit {
  public ProductionDatas: Array<DeviceProductionDataList>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public prodataAddForm: FormGroup;
  public prodataModifyForm: FormGroup;
  public prodataDetail: any;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  constructor(
    public modalService: BsModalService,
    public req: ReqService,
    public fb: FormBuilder
  ) {
  //  增加表单
    this.prodataAddForm = fb.group({
      did: ['', Validators.required],
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
    this.prodataModifyForm = fb.group({
      did: ['', Validators.required],
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
  }

  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    // 对表格的初始化
    this.pageBody = new PageBody(1, 10);
    this.Update();
    this.req.FindmodularMid().subscribe(value => {
      this.Fmodalid = value.values;
      this.prodataAddForm.patchValue({'mid': this.Fmodalid[0].mid});
    });
  }
  // 选择增加设备id
  public SelectAddModalId(value): void {
    this.prodataAddForm.patchValue({'mid': value});
  }
// 选择修改设备id
  public SelectModifyModalId(value): void {
    this.prodataModifyForm.patchValue({'mid': value});
  }
  // 控制模态框
  public openProDataModal(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.prodataDetail.mid = String(this.prodataDetail.mid);
      this.prodataModifyForm.reset(this.prodataDetail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openProDataAddMadol(template: TemplateRef<any>): void {
    this.mustone = false;
    this.gtone = false;
    this.inputvalid = false;
    this.modalRef = this.modalService.show(template);
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
      this.hasChecked.splice(this.ProductionDatas.length, 10);
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
      this.prodataDetail = this.ProductionDatas[this.hasChecked[0]];
    } else {
      this.prodataDetail = null;
    }
  }
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public deleteProData(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.mustone = false;
      this.openstatus = false;
      for (let j = 0; j < haschecklen; j++) {
          this.req.DeviceProductionDataDelete('did=' +  this.ProductionDatas[this.hasChecked[j]].did)
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
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public proDataAdd(): void {
    if (this.prodataAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.DeviceProductionDataAdd(this.parameterSerializationForm(this.prodataAddForm.value))
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
    if (this.prodataModifyForm.valid) {
        this.openstatus = false;
        this.inputvalid = false;
        this.modalRef.hide();
        this.req.DeviceProductionDataModify(this.parameterSerializationForm(this.prodataModifyForm.value))
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
    this.gtone = false;
    this.mustone = false;
    this.req.getDeviceProductionData(this.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.hasChecked = [];
        this.checked = '';
        this.num = Math.ceil(value.values.num / 10);
        this.ProductionDatas = value.values.datas;
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
      });
  }
  // 翻页参数序列化
  public parameterSerialization(obj: PageBody): string {
    let result: string;
    for (const prop in this.pageBody) {
      if (this.pageBody.hasOwnProperty(prop)) {
        if (result) {
          result = result + prop + '=' + this.pageBody[prop] + '&';
        } else {
          result = prop + '=' + this.pageBody[prop] + '&';
        }
      }
    }
    return result;
  }
  // 表单参数序列化
  public parameterSerializationForm(form: JSON): string {
    let result: string;
    for (const f in form) {
      if (result) {
        result = result + f + '=' + form[f] + '&';
      } else {
        result = f + '=' + form[f] + '&';
      }
    }
    return result;
  }
}
