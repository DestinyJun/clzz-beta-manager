import {Component, OnInit, TemplateRef} from '@angular/core';
import {JurisdictionInterface, PageBody} from '../../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-interface-manager',
  templateUrl: './interface-manager.component.html',
  styleUrls: ['./interface-manager.component.css']
})
export class InterfaceManagerComponent implements OnInit {
  public Interfacemanagers: Array<JurisdictionInterface>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public Detail: any;
  public interfacemanagerAddForm: FormGroup;
  public interfacemanagerModifyForm: FormGroup;
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
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    private commonfun: CommonfunService
  ) {
    //     增加模态框表单
    this.interfacemanagerAddForm = fb.group({
      iname: ['', Validators.required],
      path: ['', Validators.required],
      pcode: ['', Validators.required],
      mid: ['', Validators.required]
    });
    this.interfacemanagerModifyForm = fb.group({
      id: ['', Validators.required],
      iname: ['', Validators.required],
      path: ['', Validators.required],
      pcode: ['', Validators.required],
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
        // this.interfacemanagerAddForm.patchValue({'mid': this.Fmodalid[0].id});
      }
    });
  }
// 选择增加设备id
  public SelectAddModalId(value): void {
    this.interfacemanagerAddForm.patchValue({'mid': value});
  }
// 选择修改设备id
  public SelectModifyModalId(value): void {
    this.interfacemanagerModifyForm.patchValue({'mid': value});
  }
  // 控制模态框
  public openInterface(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.Detail.mid = String(this.Detail.mid);
      this.interfacemanagerModifyForm.reset(this.Detail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openInterfaceAdd(template: TemplateRef<any>): void {
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
      this.hasChecked.splice(this.Interfacemanagers.length, 10);
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
      this.Detail = this.Interfacemanagers[this.hasChecked[0]];
    } else {
      this.Detail = null;
    }
  }
//  删除表格 并且 重新请求数据
  public deleteInterface(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.JurisdictionInterfaceManagerDelete('id=' + this.Interfacemanagers[this.hasChecked[j]].id)
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
  public interfacemanagerAdd(): void {
    if (this.interfacemanagerAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionInterfaceManagerAdd(this.commonfun.parameterSerialization(this.interfacemanagerAddForm.value))
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
  public interfacemanagerModify(): void {
    if (this.interfacemanagerModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionInterfaceManagerModify(this.commonfun.parameterSerialization(this.interfacemanagerModifyForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = false;
    }
  }
  // 在增加， 删除，修改后即时刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.JurisdictionInterfaceManager(this.commonfun.parameterSerialization(this.pageBody))
      .subscribe(value => {
        this.num = Math.ceil(value.values.num / 10);
        this.Interfacemanagers = value.values.datas;
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
        this.hasChecked = [];
        this.checked = '';
      });
  }
}
