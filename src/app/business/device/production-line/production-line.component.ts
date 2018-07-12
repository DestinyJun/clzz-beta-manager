import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PageBody, DeviceProductionLineList} from '../../../shared/global.service';
import {ReqService} from '../../../shared/req.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-production-line',
  templateUrl: './production-line.component.html',
  styleUrls: ['./production-line.component.css']
})

export class ProductionLineComponent implements OnInit {
  public ProductionLines: Array<DeviceProductionLineList>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public Detail: any;
  public prolineAddForm: FormGroup;
  public prolineModifyForm: FormGroup;
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
    public fb: FormBuilder,
    public routerInfo: ActivatedRoute
  ) {
    // 增加模态框表单
    this.prolineAddForm = fb.group({
      sid: ['', Validators.required],
      name: ['', Validators.required],
      did: ['', Validators.required]
    });
    this.prolineModifyForm = fb.group({
      sid: ['', Validators.required],
      name: ['', Validators.required],
      did: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.pageBody = new PageBody(1, 10);
    this.Update();
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values['departments'];
      this.prolineAddForm.patchValue({'did': this.Fmodalid[0].id});
    });
  }
  public SelectAddModalId(value): void {
    this.prolineAddForm.patchValue({'did': value});
  }
  public SelectModifyModalId(value): void {
    this.prolineModifyForm.patchValue({'did': value});
  }
  // 控制模态框
  public openProLine(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.inputvalid = false;
      this.Detail.did = String(this.Detail.did);
      this.prolineModifyForm.reset(this.Detail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openProLineAdd(template: TemplateRef<any>): void {
    this.mustone = false;
    this.inputvalid = false;
    this.gtone = false;
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
      this.hasChecked.splice(this.ProductionLines.length, 10);
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
      this.Detail = this.ProductionLines[this.hasChecked[0]];
    } else {
      this.Detail = null;
    }
  }
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public deleteProLine(): void {
    let haschecklen = this.hasChecked.length;
      if (haschecklen === 0) {
        this.mustone = false;
        this.gtone = true;
      } else {
        this.mustone = false;
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
            this.req.DeviceProductionLineDelete('sid=' +  this.ProductionLines[this.hasChecked[j]].sid)
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
  public prolineAdd(): void {
    if (this.prolineAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.DeviceProductionLineAdd(this.parameterSerializationForm(this.prolineAddForm.value))
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
  public prolineModify(): void {
    if (this.prolineModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.DeviceProductionLineModify(this.parameterSerializationForm(this.prolineModifyForm.value))
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
    this.req.getDeviceProductionLine(this.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.num = Math.ceil(value.values.num / 10);
        this.ProductionLines = value.values.datas;
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



