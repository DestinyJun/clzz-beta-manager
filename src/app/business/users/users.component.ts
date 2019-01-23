import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Field, PageBody, UsersManager, ValidMsg} from '../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailValidator, idCardValidators, mobileValidators, passwordValidator} from '../../validator/Validators';
import {CommonFunService} from '../../shared/common-fun.service';
import {Url} from '../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../user-defined-service/CommonOperation';
import {PostRequest} from '../../user-defined-service/PostRequest';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  public datas: Array<UsersManager>;
  public fieldsAdd: Array<Field> = [];
  public fieldsModify: Array<Field> = [];
  public pageBody: PageBody;
  public num: number;
  public detail: UsersManager;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public organizationId: any;
  // userLineIds 用来保存所有的生产线的id，增，修，查 共用。在切换到另一种模式下，userLineIds所有的sys_status 初始化为0
  public userLineIds: Array<SelectLineIdsStatus>;
  public componentName: string;
  public baseVar: BaseVar;
  private queryForm: FormGroup;
  private deleteForm: FormGroup;

  constructor(
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService,
    private commonOperation: CommonOperation<UsersManager>
  ) {
  }

  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'UsersComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    // userLineIds 先初始化为空
    this.userLineIds = [];
    // 对表格的初始化
    //  增加模态框表单
    this.addForm = this.fb.group({
      userCode: ['', Validators.required],
      idCode: ['', [Validators.required, idCardValidators]],
      realName: ['', Validators.required],
      userName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      homeTelephone: ['', [Validators.required, mobileValidators]],
      organizationId: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator]],
      phone: ['', [Validators.required, mobileValidators]],
      email: ['', [Validators.required, emailValidator]],
      birthday: ['', Validators.required],
      sysids: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      id: ['', Validators.required],
      userCode: ['', Validators.required],
      idCode: ['', [Validators.required, idCardValidators]],
      realName: ['', Validators.required],
      userName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      homeTelephone: ['', [Validators.required, mobileValidators]],
      organizationId: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator]],
      phone: ['', [Validators.required, mobileValidators]],
      email: ['', [Validators.required, emailValidator]],
      birthday: ['', Validators.required],
      sysids: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.deleteForm = this.fb.group({
      id: ['']
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: ['']
    });
    // 显示页面增，修表单控件
    this.fieldsAdd = [
      new Field('工号', 'userCode', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('身份证', 'idCode', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('真实姓名', 'realName', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('用户名', 'userName', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('家庭住址', 'homeAddress', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('家庭联系电话', 'homeTelephone', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      // new Field('所属组织id',	'organizationId'),
      new Field('密码', 'password', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('password', '密码长度为6-18位，不包含中文')]),
      new Field('联系电话', 'phone', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      new Field('邮箱', 'email', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('email', '请输入正确的邮箱')]),
      new Field('生日', 'birthday', 'date', [new ValidMsg('required', '* 必填项')]),
      // new Field('生产线列表', 'sysids', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('性别', 'gendernew', 'text', [new ValidMsg('required', '* 必填项')])
    ];
    this.fieldsModify = [
      new Field('用户数据库编号', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('工号', 'userCode', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('身份证', 'idCode', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('真实姓名', 'realName', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('用户名', 'userName', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('家庭住址', 'homeAddress', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('家庭联系电话', 'homeTelephone', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      // new Field('所属组织id',	'organizationId'),
      new Field('密码', 'password', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('password', '密码长度为6-18位，不包含中文')]),
      new Field('联系电话', 'phone', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      new Field('邮箱', 'email', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('email', '请输入正确的邮箱')]),
      new Field('生日', 'birthday', 'date', [new ValidMsg('required', '* 必填项')]),
    ];
    this.req.post(Url.Data.departmentBaseInfo.find, null).subscribe(value => {
      this.organizationId = value.values;
    });
    // 查找系统所有id
    this.req.post(Url.Data.productionLineBaseInfo.find, null).subscribe(value => {
      // 再初始化 userLineIds 并向里面增加所有生产线，sys_status 为 0 时，没有该权限，反之为1时，有权限。
      for (let i = 0; i < value.values.length; ++i) {
        this.userLineIds.push(new SelectLineIdsStatus(value.values[i].sid, value.values[i].name, 0));
      }
    });
  }

// 打开模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.reset_userLineIds();
    this.commonOperation.openModal(template, i);
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc' ||
      Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      this.userLineIds = this.change_userLineIds(this.detail);
    }
  }

  // 选择部门id
  public selectOrganization(value, form): void {
    form.patchValue({'organizationId': value});
  }

  // 增加 和 修改 时，选择用户性别
  public selectGender(value): void {
    this.addForm.patchValue({gender: value});
  }

  // 选择生产线 ID 并保存在 userLineIds 数组里面，增，修，查 共用
  public selectProLineId(e, id): void {
    // 不需要考虑到 index = -1 的情况
    const index = this.userLineIds.indexOf(id);
    if (e.srcElement.checked) {
      this.userLineIds[index].sys_status = 1;
      e.target.parentElement.children[1].style.color = '#646464';
    } else {
      this.userLineIds[index].sys_status = 0;
      e.target.parentElement.children[1].style.color = 'red';
    }
  }

  public getPageBody(event): void {
    this.pageBody = event;
    this.foundByPage();
  }

  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public save(): void {
    // 在增加之前把 生产线 id 转换成字符串放到增加表单的 sysids 中
    const sysidsStr = [];
    for (let i = 0; i < this.userLineIds.length; ++i) {
      if (this.userLineIds[i].sys_status === 1) {
        sysidsStr.push(this.userLineIds[i].sys_id);
      }
    }
    this.addForm.patchValue({sysids: sysidsStr.toString()});
    this.commonOperation.save(this.addForm, Url.Data.usersManagement.save);
  }

//  修改表格内容
  public update(): void {
    // 在增加之前把 生产线 id 转换成字符串放到增加表单的 sysids 中
    const sySidsStr = [];
    for (let i = 0; i < this.userLineIds.length; ++i) {
      if (this.userLineIds[i].sys_status === 1) {
        sySidsStr.push(this.userLineIds[i].sys_id);
      }
    }
    this.modifyForm.patchValue({sysids: sySidsStr.toString()});

    this.commonOperation.update(this.modifyForm, Url.Data.usersManagement.update);
  }

  // 重置userLineIds
  public reset_userLineIds(): void {
    for (let i = 0; i < this.userLineIds.length; ++i) {
      this.userLineIds[i].sys_status = 0;
    }
  }

  // 改变userLineIds在哪种情况下使用的sys_status 的内容
  public change_userLineIds(detail): Array<SelectLineIdsStatus> {
    if (detail) {
      const ids = detail['sysids'].split(',');
      // 如果存在某个 生产线权限，则相应的 sys_status 变成 1
      // 第一个 for 用来 遍历modifyids
      // 第二个for 用来 找查 modifyids 中的每一个 生产线id。如果存在，则相应的sysb
      for (let i = 0; i < ids.length; ++i) {
        for (let j = 0; j < this.userLineIds.length; ++j) {
          if (this.userLineIds[j].sys_id === ids[i]) {
            this.userLineIds[j].sys_status = 1;
          }
        }
      }
    }
    return this.userLineIds;
  }

  public closeModal(): void {
    this.commonOperation.closeModal();
  }

  public checkAll(e): void {
    this.commonOperation.checkAll(e);
  }

  public checkOne(e, data): void {
    this.commonOperation.checkOne(e, data);
  }

  public delete(): void {
    this.commonOperation.delete(this.deleteForm, Url.Data.usersManagement.delete);
  }

  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.usersManagement.foundByPage); }

  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }

  public setData(data: Array<UsersManager>): void {
    this.datas = data;
  }

  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
    this.req.post(Url.Data.usersManagement.queryCount, null).subscribe((count) => {
      this.baseVar.totalPage = Math.ceil(count.data / 10);
    });
  }

  public cleanScreen(): void {
    this.baseVar.openStatus = true;
    this.baseVar.state = 0;
  }
}

export class SelectLineIdsStatus {
  constructor(public sys_id: string,
              public sys_name: string,
              public sys_status: number // 0 表示被点击的复选框没有被选中， 1 表示被点击的复选框已被选中
  ) {
  }
}
