import {Component, OnInit, TemplateRef} from '@angular/core';
import {PageBody, UserPowerInfo} from '../../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})

export class UserManagerComponent implements OnInit {
  public UserPowers: Array<UserPowerInfo>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public Detail: any;
  public userPowerAddForm: FormGroup;
  public userPowerModifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public Fmodalid: any;
  public userid: any;
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
    this.userPowerAddForm = fb.group({
      userid: ['', Validators.required],
      moduleid: ['', Validators.required]
    });
    this.userPowerModifyForm = fb.group({
      id: ['', Validators.required],
      userid: ['', Validators.required],
      moduleid: ['', Validators.required]
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
        // this.userPowerAddForm.patchValue({'moduleid': this.Fmodalid[0].id});
      }
    });
    this.req.FinduserIdname().subscribe(value => {
      this.userid = value.values;
      if (this.userid !== undefined) {
        // this.userPowerAddForm.patchValue({'userid': this.userid[0].id});
      }
    });
  }
  public SelectAddModalId(value): void {
    this.userPowerAddForm.patchValue({'moduleid': value});
  }
  public SelectModifyModalId(value): void {
    this.userPowerModifyForm.patchValue({'moduleid': value});
  }
  public SelectAdduserid(value): void {
    this.userPowerAddForm.patchValue({'userid': value});
  }
  public SelectModifyuserid(value): void {
    this.userPowerModifyForm.patchValue({'userid': value});
  }
  // 控制模态框
  public openUserPower(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.Detail.userid = String(this.Detail.userid);
      this.Fmodalid.moduleid = String(this.Fmodalid.moduleid);
      this.userPowerModifyForm.reset(this.Detail);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加打开
  public openUserPowerAdd(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
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
      this.hasChecked.splice(this.UserPowers.length, 10);
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
      for (let j = 0; j < haschecklen; j++) {
        if (this.hasChecked[j] === i) {
          this.hasChecked.splice(j, 1);
        }
      }
    }
    if (this.hasChecked.length === 1) {
      this.Detail = this.UserPowers[this.hasChecked[0]];
    } else {
      this.Detail = null;
    }
  }
//  删除表格 并且 重新请求数据
  public deleteUserPower(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.JurisdictionuUserPowerDelete('id=' + this.UserPowers[this.hasChecked[j]].id)
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
// 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
public userPowerAdd(): void {
  if (this.userPowerAddForm.valid) {
    this.openstatus = false;
    this.inputvalid = false;
    this.modalRef.hide();
    this.req.JurisdictionuUserPowerAdd(this.commonfun.parameterSerialization(this.userPowerAddForm.value))
      .subscribe(res => {
        this.resMessage = res.message;
        this.status = Number(res.status);
        this.Update();
      });
  } else {
    this.inputvalid = false;
  }
}
//  修改表格内容
  public userPowerModify(): void {
    if (this.userPowerModifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionuUserPowerModify(this.commonfun.parameterSerialization(this.userPowerModifyForm.value))
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
    this.req.getJurisdictionuUserPower(this.commonfun.parameterSerialization(this.pageBody))
      .subscribe(value => {
        this.num = Math.ceil(value.values.num / 10);
        this.UserPowers = value.values.datas;
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
        this.hasChecked = [];
        this.checked = '';
      });
  }

}
