import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {PageBody, DeviceProductionIcmList} from '../../../shared/global.service';

@Component({
  selector: 'app-production-icm',
  templateUrl: './production-icm.component.html',
  styleUrls: ['./production-icm.component.css']
})
export class ProductionIcmComponent implements OnInit {
  public ProductionIcms: Array<DeviceProductionIcmList>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public proicmDetail: any;
  public proIcmAddForm: FormGroup;
  public proIcmModifyForm: FormGroup;
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
    public modalService: BsModalService,
    public req: ReqService,
    public fb: FormBuilder
  ) {
      this.proIcmAddForm = fb.group({
        mid: ['', Validators.required],
        name: ['', Validators.required],
        sid: ['', Validators.required]
      });
      this.proIcmModifyForm = fb.group({
        mid: ['', Validators.required],
        name: ['', Validators.required],
        sid: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.pageBody = new PageBody(1, 10);
    this.Update();
    // 得到系统id
    this.req.FindsystemSysid().subscribe(value => {
      this.Fmodalid = value.values;
      this.proIcmAddForm.patchValue({'sid': this.Fmodalid[0].sid});
    });
  }

// 选择增加设备id
  public SelectAddModalId(value): void {
    this.proIcmAddForm.patchValue({'sid': value});
  }
// 选择修改设备id
  public SelectModifyModalId(value): void {
    this.proIcmModifyForm.patchValue({'sid': value});
  }
  // 控制模态框
  public openProIcm(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.proicmDetail.sid = String(this.proicmDetail.sid);
      this.proIcmModifyForm.reset(this.proicmDetail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openProIcmAdd(template: TemplateRef<any>): void {
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
      this.hasChecked.splice(this.ProductionIcms.length, 10);
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
      this.proicmDetail = this.ProductionIcms[this.hasChecked[0]];
    } else {
      this.proicmDetail = null;
    }
  }
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public deleteProIcm(): void {
    let haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.mustone = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.DeviceProductionIcmDelete('mid=' +  this.ProductionIcms[this.hasChecked[j]].mid)
            .subscribe(res => {
              this.status = Number(res.status);
              this.resMessage = res.message;
              if (j === haschecklen - 1) {
                this.Update();
              }
            });
          }
        }
  }
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public proIcmAdd(): void {
    if (this.proIcmAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.DeviceProductionIcmAdd(this.parameterSerializationForm(this.proIcmAddForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public proIcmModify(): void {
    this.openstatus = false;
    this.inputvalid = false;
    this.modalRef.hide();
    if (this.proIcmModifyForm.valid) {
      this.req.DeviceProductionIcmModify(this.parameterSerializationForm(this.proIcmModifyForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
  // 刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.getDeviceProductionIcm(this.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.num = Math.ceil(value.values.num / 10);
        this.ProductionIcms = value.values.datas;
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
        this.hasChecked = [];
        this.checked = '';
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
