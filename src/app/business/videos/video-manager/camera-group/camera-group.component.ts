import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CommonFunService} from '../../../../shared/common-fun.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/Rx';
import {Camera, CameraGroup, Field, PageBody, ValidMsg} from '../../../../shared/global.service';
import {digitAndLetterValidator} from '../../../../validator/Validators';
import {Url} from '../../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-camera-group',
  templateUrl: './camera-group.component.html',
  styleUrls: ['./camera-group.component.css']
})
export class CameraGroupComponent implements OnInit, OnDestroy {
  public datas: Array<CameraGroup>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public detail: CameraGroup;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public deleteForm: FormGroup;
  public queryForm: FormGroup;
  public proLineids: any;
  public Fmodalid: any;
  public cameraGroupStatus: CameraGroupStatus[];
  public baseVar: BaseVar;
  private componentName: string;

  constructor(
    private commonOperation: CommonOperation<Camera>,
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {
  }

  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'CameraGroupComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    // 增加模态框表单
    this.addForm = this.fb.group({
      id: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', [Validators.required]],
      creator: ['', [Validators.required]],
      status: ['0'],
      pId: ['', [Validators.required]],
      proSystem: ['']
    });
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required]],
      UpdateId: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', [Validators.required]],
      creator: ['', [Validators.required]],
      status: ['', [Validators.required]],
      pId: ['', [Validators.required]],
      proSystem: ['', [Validators.required]]
    });
    this.deleteForm = this.fb.group({
      id: [''],
      creator: ['']
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: ['']
    });
    this.fieldsAdd = [
      new Field('摄像机组编号', 'id', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('摄像机组名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机组创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机组状态', 'status', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('所属部门ID', 'pId', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.fieldsModify = [
      new Field('原摄像机编号', 'UpdateId', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('请输入修正的摄像机ID', 'id', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机组名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机组创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机组状态', 'status', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('所属部门ID', 'pId', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('操作', 'proSystem', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    // 得到所有的组织id
    this.req.post(Url.Data.departmentBaseInfo.find, null).subscribe(value => {
      // this.Fmodalid = value.values.departments;  // 这有问题，id 为undefined， 只有下面才不会出现问题
      this.Fmodalid = value.values || null;
      for (let i = 0; i < this.Fmodalid.departments.length; i++) {
        this.Fmodalid.departments[i].id = String(this.Fmodalid.departments[i].id);
      }
    });
    // 得到所有的生产线id
    this.req.post(Url.Data.productionLineBaseInfo.find, null).subscribe(value => {
      this.proLineids = value.values || null;
    });
    this.cameraGroupStatus = [
      {status: 1, msg: '开启'},
      {status: 0, msg: '停用'},
    ];
  }

  // 选择状态
  public selectStatus(value, form): void {
      form.patchValue({status: value});
  }
  // 增，修。选择模块id
  public selectModalId(modalId, form): void {
    form.patchValue({pId: modalId});
  }
  // 增，修。选择生产线id
  public selectLineId(lineId, form): void {
    form.patchValue({proSystem: lineId});
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
    this.commonOperation.delete(this.deleteForm, Url.Data.videosManager.delete, true);
  }

  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.videosManager.save, true);
  }

  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.videosManager.update, true);
  }

  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.videosManager.foundByPage, true);
  }

  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }

  public cleanScreen(): void {
    this.baseVar.openStatus = true;
    this.baseVar.state = 0;
  }

  public setData(data: Array<CameraGroup>): void {
    this.datas = data;
    for (let i = 0; i < this.datas.length; i++) {
      this.datas[i]['name'] = this.datas[i].value;
    }
  }

  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }
}


interface CameraGroupStatus {
  status: number;
  msg: string;
}
