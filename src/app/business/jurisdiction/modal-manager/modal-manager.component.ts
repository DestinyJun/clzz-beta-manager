import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import { JurisdictionModalList, PageBody} from '../../../shared/global.service';

@Component({
  selector: 'app-modal-manager',
  templateUrl: './modal-manager.component.html',
  styleUrls: ['./modal-manager.component.css']
})
export class ModalManagerComponent implements OnInit {
  public ModalList: Array<JurisdictionModalList>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public Detail: any;
  public modalAddForm: FormGroup;
  public modalModifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public FmodalFid: any;
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
    //     增加模态框表单
    this.modalAddForm = fb.group({
      name: ['', Validators.required],
      pid: ['', Validators.required],
      description: ['', Validators.required],
      mcode: ['', Validators.required],
      oid: ['', Validators.required]
    });
    this.modalModifyForm = fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      pid: ['', Validators.required],
      description: ['', Validators.required],
      mcode: ['', Validators.required],
      oid: ['', Validators.required]
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
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values.organizations;
      if (this.Fmodalid !== undefined) {
        this.modalAddForm.patchValue({'pid': this.Fmodalid[0].id});
      }
    });
    this.req.FindmoduleIdname().subscribe(value => {
      this.FmodalFid = value.values;
      if (this.FmodalFid !== undefined) {
        this.modalAddForm.patchValue({'oid': this.FmodalFid[0].id});
      }
    });
  }
  public SelectAddModalId(value): void {
    this.modalAddForm.patchValue({'oid': value});
  }
  public SelectModifyModalId(value): void {
    this.modalModifyForm.patchValue({'oid': value});
  }
  public SelectAddModalFid(value): void {
    this.modalAddForm.patchValue({'pid': value});
  }
  public SelectModifyModalFid(value): void {
    this.modalModifyForm.patchValue({'pid': value});
  }
  // 控制模态框
  public openModal(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.Detail.oid = String(this.Detail.oid);
      this.modalModifyForm.reset(this.Detail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openModalAdd(template: TemplateRef<any>): void {
    this.mustone = false;
    this.gtone = false;
    this.inputvalid = false;
    this.modalRef = this.modalService.show(template);
  }
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
  }
  // 全选 或 全不选
  public getAllCheckBoxStatus(e): void {
    if (e.srcElement.checked === true) {
      this.hasChecked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.hasChecked.splice(this.ModalList.length, 10);
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
      this.Detail = this.ModalList[this.hasChecked[0]];
    } else {
      this.Detail = null;
    }
  }
//  删除表格 并且 重新请求数据
  public modalDelete(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.openstatus = false;
      const confirm = window.confirm('删除为:' + this.hasChecked.toString());
      if (confirm) {
        for (let j = 0; j < haschecklen; j++) {
          this.req.JurisdictionModalManagerDelete('id=' + this.ModalList[this.hasChecked[j]].id)
            .subscribe(res => {
              this.resMessage = res.message;
              this.status = Number(res.status);
              if (j === haschecklen - 1) {
                this.Update();
              }
            });
        }
      }
    }
  }
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public modalAdd(): void {
    if (this.modalAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionModalManagerAdd(this.parameterSerializationForm(this.modalAddForm.value))
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
  public modalModify(): void {
    if (this.modalModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionModalManagerModify(this.parameterSerializationForm(this.modalModifyForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
  // 在增加， 删除，修改后即时刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.getJurisdictionModalManagerQuery(this.parameterSerialization(this.pageBody))
      .subscribe(value => {
        this.num = Math.ceil(value.values.num / 10);
        this.ModalList = value.values.datas;
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
