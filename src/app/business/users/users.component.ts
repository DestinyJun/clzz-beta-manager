import { Component, OnInit, TemplateRef} from '@angular/core';
import {Field, PageBody, UsersManager} from '../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../shared/req.service';
import { mobileValidators} from '../../validator/Validators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  public datas: Array<UsersManager>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public listenDescModal: boolean;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public detail: UsersManager;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public organizationId: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  // userLineIds 用来保存所有的生产线的id，增，修，查 共用。在切换到另一种模式下，userLineIds所有的sys_status 初始化为0
  public userLineIds: Array<SelectLineIdsStatus>;
  public openSelectAddProLineId: boolean;
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
    // userLineIds 先初始化为空
    this.userLineIds = [];
    // 对表格的初始化
    this.pageBody = new PageBody(1, 10);
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
      new Field('生产线列表',	'Sysids'),
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
      sysids: ['', Validators.required],
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
      sysids: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.Update();
    this.req.FindDepartOrgani().subscribe(value => {
      this.organizationId = value.values;
    });
    // 查找系统所有id
    this.req.FindsystemSysid().subscribe(value => {
      // 再初始化 userLineIds 并向里面增加所有生产线，sys_status 为 0 时，没有该权限，反之为1时，有权限。
      for (let i = 0; i < value.values.length; ++i) {
        this.userLineIds.push(new SelectLineIdsStatus(value.values[i].sid, value.values[i].name, 0));
      }
    });
  }
// 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    this.openSelectAddProLineId = true;
    this.reset_userLineIds();
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      // console.log('这是详情查看');
      this.listenDescModal = true;
      this.detail = this.datas[i];
      this.userLineIds = this.change_userLineIds(this.detail, this.userLineIds);
      this.modalRef = this.modalService.show(template);
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.userLineIds = this.change_userLineIds(this.detail, this.userLineIds);
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
        this.userLineIds = this.change_userLineIds(this.detail, this.userLineIds);
        this.modalRef = this.modalService.show(template);
        this.listenDescModal = false;
      }
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      console.log(this.userLineIds);
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
  // 增加 和 修改 时，选择用户性别
  public selectGender(value): void {
      this.addForm.patchValue({gender: value});
  }
  // 选择生产线 ID 并保存在 userLineIds 数组里面，增，修，查 共用
  public selectProLineId(id, checkvalue): void {
    // 不需要考虑到 index = -1 的情况
    const index = this.userLineIds.indexOf(id);
    if (checkvalue) {
        this.userLineIds[index].sys_status = 1;
    }else {
        this.userLineIds[index].sys_status = 0;
    }
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
    // 在增加之前把 生产线 id 转换成字符串放到增加表单的 sysids 中
    let sysidsStr = [];
    for (let i = 0; i < this.userLineIds.length; ++i) {
      if (this.userLineIds[i].sys_status === 1) {
        sysidsStr.push(this.userLineIds[i].sys_id);
      }
    }
    console.log(sysidsStr.toString());
    this.addForm.patchValue({sysids: sysidsStr.toString()});
    console.log(this.addForm.value);
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerAdd(this.addForm.value)
        .subscribe(res => {
          console.log(res);
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
    console.log(this.modifyForm.value);
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UsersManagerModify(this.modifyForm.value)
        .subscribe(res => {
          console.log(res);
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
        this.num = Math.ceil(num.data / 10);
      });
  }
  // 重置userLineIds
  public reset_userLineIds(): void {
    for (let i = 0; i < this.userLineIds.length; ++i) {
      this.userLineIds[i].sys_status = 0;
    }
  }
  // 改变userLineIds在哪种情况下使用的sys_status 的内容
  public change_userLineIds(detail, userLineIds): Array<SelectLineIdsStatus> {
    // modifyIds 用来保存用户的生产线权限id
    let sysids = detail['sysids'];
    // 如果用户存在有sysids
    if (sysids) {
      // 用来去掉最后一个中括号
      const firstf = /\]$/;
      // 用来去掉第一个中括号
      const lastf = /^\[/;
      sysids = sysids.replace(lastf, '');
      sysids = sysids.replace(firstf, '');
      let ids = sysids.split(',');
      // 如果存在某个 生产线权限，则相应的 sys_status 变成 1
      // 第一个 for 用来 遍历modifyids
      // 第二个for 用来 找查 modifyids 中的每一个 生产线id。如果存在，则相应的sysb
      for (let i = 0; i < ids.length; ++i) {
        for (let j = 0; j < userLineIds.length; ++j) {
          if (userLineIds[j].sys_id === ids[i]) {
            userLineIds[j].sys_status = 1;
          }
        }
      }
    }
    console.log(userLineIds);
    return userLineIds;
  }
}

export class SelectLineIdsStatus {
  constructor(
    public sys_id: string,
    public sys_name: string,
    public sys_status: number // 0 表示被点击的复选框没有被选中， 1 表示被点击的复选框已被选中
  ) {}
}
