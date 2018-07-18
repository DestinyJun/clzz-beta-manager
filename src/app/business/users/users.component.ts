import {Component, OnInit, TemplateRef} from '@angular/core';
import {Field, PageBody, UsersManager} from '../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import { mobileValidators} from '../../validator/Validators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public datas: Array<UsersManager>;
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
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  constructor(
              private modalService: BsModalService,
              private req: ReqService,
              private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    // 对表格的初始化
    this.pageBody = new PageBody(1, 6);
    // 显示页面增，修表单控件
    this.fieldsAdd = [
      new Field('用户编码',	'userCode'),
      new Field('身份证',	'idCode'),
      new Field('真实姓名',	'realName'),
      new Field('用户名',	'userName'),
      new Field('家庭住址',	'homeAddress'),
      new Field('家庭联系电话',	'homeTelephone'),
      // new Field('所属组织id',	'organizationId'),
      new Field('密码',	'password'),
      new Field('联系电话',	'phone'),
      new Field('邮箱',	'email'),
      new Field('生日',	'birthday'),
      new Field('性别',	'gendernew')
    ];
    const id = new Field('用户数据id', 'id');
    this.fieldsModify = this.fieldsAdd;
    this.fieldsModify.push(id);
    //  增加模态框表单
    this.addForm = this.fb.group({
      userCode: ['', Validators.required],
      idCode: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      realName: ['', Validators.required],
      userName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      homeTelephone: ['', Validators.required],
      organizationId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      phone: ['', [Validators.required, mobileValidators]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      id: ['', Validators.required],
      userCode: ['', Validators.required],
      idCode: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      realName: ['', Validators.required],
      userName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      homeTelephone: ['', Validators.required],
      organizationId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      phone: ['', [Validators.required, mobileValidators]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.Update();
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values;
      // this.userAddForm.patchValue({'organizationId': this.Fmodalid.organizations[0].id});
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
  // 增加时，选择部门id
  public SelectAddModalId(value): void {
    this.addForm.patchValue({'organizationId': value});
  }
  // 修改时，选择部门id
  public SelectModifyModalId(value): void {
    this.modifyForm.patchValue({'organizationId': value});
  }
  // 增加时，选择用户性别
  public selectGender(value): void {
      this.addForm.patchValue({gender: value});
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
  public deleteuser(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.openstatus = false;
      for (let j = 0; j < haschecklen; j++) {
        this.req.UsersManagerDelete({id: this.datas[this.hasChecked[j]].id})
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
  public userAdd(): void {
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerAdd(this.addForm.value)
        .subscribe(res => {
          this.status = Number(res.status);
          this.resMessage = res.message;
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public userModify(): void {
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerModify(this.modifyForm.value)
        .subscribe(res => {
          this.status = Number(res.status);
          this.resMessage = res.message;
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
    this.req.getUsersManager(this.pageBody)
      .subscribe(res => {
        this.datas = res.data;
        this.resMessage = res.message;
        const setinter = setInterval(() => {
          // 阻止用户点击 复选框时，会弹出查看模态框
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
    this.req.getUsersManagerCount()
      .subscribe(num => {
        this.num = Math.ceil(num.data / 6);
      });
  }
}
