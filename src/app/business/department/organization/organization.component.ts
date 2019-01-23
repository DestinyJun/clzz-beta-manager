import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeparmentList, Field, JurisdictionInterface, PageBody, ValidMsg} from '../../../shared/global.service';
import {digitAndLetterValidator, mobileValidators} from '../../../validator/Validators';
import {CommonFunService} from '../../../shared/common-fun.service';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {Url} from '../../../user-defined-service/Url';
import {PostRequest} from '../../../user-defined-service/PostRequest';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy {
  public datas: Array<DeparmentList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public baseVar: BaseVar;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: DeparmentList;
  public Fmodalid: any;
  public componentName: string;
  private deleteForm: FormGroup;
  private queryForm: FormGroup;
  constructor(
    private postRequest: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService,
    private commonOperation: CommonOperation<DeparmentList>
  ) {}
  ngOnInit() {
    this.componentName = 'OrganizationComponent';
    this.baseVar = new BaseVar();
    this.commonOperation.setOperator(this);
    this.commonFun.setCurrentComponentName(this.componentName);
    // 增加表单信息
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required, digitAndLetterValidator]],
      tel: ['', [Validators.required, mobileValidators]],
      oid: ['', [Validators.required]],
      pid: ['-1', [Validators.required]]
    });
    // 修改表单信息
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required, digitAndLetterValidator]],
      tel: ['', [Validators.required, mobileValidators]],
      oid: ['', [Validators.required]],
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
      new Field('部门编号', 'dcode', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('部门名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门电话', 'tel', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
    ];
    this.fieldsModify = [
      new Field('部门ID', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门编号', 'dcode', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('部门电话', 'tel', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('mobile', '请输入正确的手机号码')]),
    ];
    this.postRequest.post( Url.Data.departmentBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
  public selectAddModalOrgaId(value): void {
    this.addForm.patchValue({'oid': value});
  }
  public selectAddModalDeparId(value): void {
    this.addForm.patchValue({'pid': value});
  }
  public selectModifyModalOrgaId(value): void {
    this.modifyForm.patchValue({'oid': value});
  }
  public selectModifyModalDeparId(value): void {
    this.modifyForm.patchValue({'pid': value});
  }
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
    this.commonOperation.delete(this.deleteForm, Url.Data.organization.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.organization.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.organization.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.organization.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<DeparmentList>): void {
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
