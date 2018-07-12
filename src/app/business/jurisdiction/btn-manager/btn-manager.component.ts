import {Component, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { JurisdictionBtnManager, PageBody} from '../../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ReqService} from '../../../shared/req.service';

@Component({
  selector: 'app-btn-manager',
  templateUrl: './btn-manager.component.html',
  styleUrls: ['./btn-manager.component.css']
})
export class BtnManagerComponent implements OnInit {
  public Btnmanagers: Array<JurisdictionBtnManager>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public Detail: any;
  public btnmanagerAddForm: FormGroup;
  public btnmanagerModifyForm: FormGroup;
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
    //     增加模态框表单
    this.btnmanagerAddForm = fb.group({
      name: ['', Validators.required],
      decription: ['', Validators.required],
      mid: ['', Validators.required]
    });
    this.btnmanagerModifyForm = fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      decription: ['', Validators.required],
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
    this.req.FindmoduleIdname().subscribe(value => {
      this.Fmodalid = value.values;
      if (this.Fmodalid !== undefined) {
        this.btnmanagerAddForm.patchValue({'mid': this.Fmodalid[0].id});
      }
    });
  }
// 选择增加设备id
  public SelectAddModalId(value): void {
    this.btnmanagerAddForm.patchValue({'mid': value});
  }
// 选择修改设备id
  public SelectModifyModalId(value): void {
    this.btnmanagerModifyForm.patchValue({'mid': value});
  }
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
  }
  // 控制模态框
  public openBtnmanager(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.Detail.mid = String(this.Detail.mid);
      this.btnmanagerModifyForm.reset(this.Detail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openBtnmanagerAdd(template: TemplateRef<any>): void {
    this.mustone = false;
    this.gtone = false;
    this.inputvalid = false;
    this.modalRef = this.modalService.show(template);
  }
  // 全选 或 全不选
  public getAllCheckBoxStatus(e): void {
    if (e.srcElement.checked === true) {
      this.hasChecked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.hasChecked.splice(this.Btnmanagers.length, 10);
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
      this.Detail = this.Btnmanagers[this.hasChecked[0]];
    } else {
      this.Detail = null;
    }
  }

//  删除表格 并且 重新请求数据
  public deleteBtnmanager(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.gtone = true;
      this.mustone = false;
    } else {
      this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.JurisdictionBtnManagerDelete('id=' + this.Btnmanagers[this.hasChecked[j]].id)
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
  public btnmanagerAdd(): void {
    if (this.btnmanagerAddForm.value) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionBtnManagerAdd(this.parameterSerializationForm(this.btnmanagerAddForm.value))
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
  public btnmanagerModify(): void {
    if (this.btnmanagerModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionBtnManagerModify(this.parameterSerializationForm(this.btnmanagerModifyForm.value))
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
    this.req.getJurisdictionBtnManager(this.parameterSerialization(this.pageBody))
      .subscribe(value => {
        this.num = Math.ceil(value.values.num / 10);
        this.Btnmanagers = value.values.datas;
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
