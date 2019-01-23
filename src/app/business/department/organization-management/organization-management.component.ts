import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Field, OrganizationList, PageBody, ValidMsg} from '../../../shared/global.service';
import {emailValidator, faxValidator, mobileValidators, postCodeValidator} from '../../../validator/Validators';
import {CommonFunService} from '../../../shared/common-fun.service';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';


@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.css']
})
export class OrganizationManagementComponent implements OnInit, OnDestroy {
  public datas: Array<OrganizationList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: OrganizationList;
  public Fmodalid: any;
  public baseVar: BaseVar;
  private componentName: string;
  private queryForm: FormGroup;
  private deleteForm: FormGroup;
  constructor(
    private postRequest: PostRequest,
    private commonOperation: CommonOperation<OrganizationList>,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {}
  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'OrganizationComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    // 增加表单信息
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      otype: ['', [Validators.required]],
      tel: ['', [Validators.required, mobileValidators]],
      fax: ['', [Validators.required, faxValidator]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      corpphone: ['', [Validators.required, mobileValidators]],
      corpname: ['', [Validators.required]],
      registerdate: ['', [Validators.required]],
      zipcode: ['', [Validators.required, postCodeValidator]],
      pid: ['-1', [Validators.required]]
    });
    // 修改表单信息
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      otype: ['', [Validators.required]],
      tel: ['', [Validators.required, mobileValidators]],
      fax: ['', [Validators.required, faxValidator]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      corpphone: ['', [Validators.required, mobileValidators]],
      corpname: ['', [Validators.required]],
      registerdate: ['', [Validators.required]],
      zipcode: ['', [Validators.required, postCodeValidator]],
      pid: ['', [Validators.required]]
    });
    this.deleteForm = this.fb.group({
      id: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    this.fieldsAdd = [
      new Field('名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('编码', 'code', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('机构类型', 'otype', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('联系电话', 'tel', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      new Field('传真号码', 'fax', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('fax', '请输入正确的传真号码')]),
      new Field('机构地址', 'address', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('单位邮箱', 'email', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('email', '请输入正确的邮箱')]),
      new Field('法人电话', 'corpphone', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      new Field('法人代表', 'corpname', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('成立日期', 'registerdate', 'date', [new ValidMsg('required', '* 必填项')]),
      new Field('邮编', 'zipcode', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('postCode', '请输入正确的邮编号')]),
    ];
    this.fieldsModify = [
      // new Field('编号', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('编码', 'code', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('机构类型', 'otype', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('联系电话', 'tel', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      new Field('传真号码', 'fax', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('fax', '请输入正确的传真号码')]),
      new Field('机构地址', 'address', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('单位邮箱', 'email', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('email', '请输入正确的邮箱')]),
      new Field('法人电话', 'corpphone', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
      new Field('法人代表', 'corpname', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('成立日期', 'registerdate', 'date', [new ValidMsg('required', '* 必填项')]),
      new Field('邮编', 'zipcode', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('postCode', '请输入正确的邮编号')]),
      // new Field('父机构', 'pid', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.postRequest.post(Url.Data.departmentBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values.organizations;
    });
  }
  public SelectAddModalId(value): void {
    this.addForm.patchValue({'pid': value});
  }
  public SelectModifyModalId(value): void {
    this.modifyForm.patchValue({'pid': value});
  }
  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    this.foundByPage();
  }
  public openModal(template: TemplateRef<any>, i): void {
    this.commonOperation.openModal(template, i);
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
    this.commonOperation.delete(this.deleteForm, Url.Data.organizationManager.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.organizationManager.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.organizationManager.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.organizationManager.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<OrganizationList>): void {
    this.datas = data;
  }
  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }
  public cleanScreen(): void {
    this.baseVar.openStatus = true;
    this.baseVar.state = 0;
  }
}
