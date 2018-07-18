import {Component, OnInit, TemplateRef} from '@angular/core';
import {Field, PageBody, UserPowerInfo} from '../../../shared/global.service';
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
  public datas: Array<UserPowerInfo>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public listenDescModal: boolean;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
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
) {}
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
      // new Field('用户编码',	'userCode'),
      // new Field('身份证',	'idCode'),
      // new Field('真实姓名',	'realName'),
      // new Field('用户名',	'userName'),
      // new Field('家庭住址',	'homeAddress'),
      // new Field('家庭联系电话',	'homeTelephone'),
      // // new Field('所属组织id',	'organizationId'),
      // new Field('密码',	'password'),
      // new Field('联系电话',	'phone'),
      // new Field('邮箱',	'email'),
      // new Field('生日',	'birthday'),
      // new Field('性别',	'gendernew'),
      // new Field('用户ID',	'userid'),
      // new Field('模块ID',	'dcode')
    ];
    const id = new Field('用户权限id', 'id');
    this.fieldsModify = this.fieldsAdd;
    this.fieldsModify.push(id);
    this.addForm = this.fb.group({
      userid: ['', Validators.required],
      moduleid: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      id: ['', Validators.required],
      userid: ['', Validators.required],
      moduleid: ['', Validators.required]
    });
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
      this.modalRef = this.modalService.show(template);
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if ((this.hasChecked.length > 1 || this.hasChecked.length === 0) && !this.listenDescModal) {
        this.mustone = true;
      } else {
        this.mustone = false;
        this.modifyForm.reset(this.detail);
        this.modalRef = this.modalService.show(template);
        this.listenDescModal = false;
      }
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      // console.log('增加');
      this.modalRef = this.modalService.show(template);
    }
  }
  public SelectAddModalId(value): void {
    this.addForm.patchValue({'moduleid': value});
  }
  public SelectModifyModalId(value): void {
    this.modifyForm.patchValue({'moduleid': value});
  }
  public SelectAdduserid(value): void {
    this.addForm.patchValue({'userid': value});
  }
  public SelectModifyuserid(value): void {
    this.modifyForm.patchValue({'userid': value});
  }
  // 控制模态框
  public openUserPower(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      this.mustone = false;
      this.detail.userid = String(this.detail.userid);
      this.Fmodalid.moduleid = String(this.Fmodalid.moduleid);
      this.modifyForm.reset(this.detail);
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
      for (let j = 0; j < haschecklen; j++) {
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
//  删除表格 并且 重新请求数据
  public deleteUserPower(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.JurisdictionuUserPowerDelete('id=' + this.datas[this.hasChecked[j]].id)
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
  if (this.addForm.valid) {
    this.openstatus = false;
    this.inputvalid = false;
    this.modalRef.hide();
    this.req.JurisdictionuUserPowerAdd(this.commonfun.parameterSerialization(this.addForm.value))
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
  public userPowerModify(): void {
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.JurisdictionuUserPowerModify(this.commonfun.parameterSerialization(this.modifyForm.value))
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
