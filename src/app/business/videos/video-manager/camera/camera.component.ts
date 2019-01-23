import {digitAndLetterValidator} from '../../../../validator/Validators';
import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonFunService} from '../../../../shared/common-fun.service';
import {Camera, Field, PageBody, ValidMsg} from '../../../../shared/global.service';
import {ActivatedRoute} from '@angular/router';
import {Url} from '../../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit, OnDestroy {
  public datas: Array<Camera>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public deleteForm: FormGroup;
  public queryForm: FormGroup;
  public Fmodalid: any;
  public baseVar: BaseVar;
  private componentName: string;
  constructor(
    private commonOperation: CommonOperation<Camera>,
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService,
    private routerInfo: ActivatedRoute
  ) {}
  ngOnInit() {
    this.baseVar = new BaseVar();
    this.addForm = this.fb.group({
      id: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', [Validators.required]],
      creator: ['', [Validators.required]],
      innerUrl: [''],
      outerUrl: ['', [Validators.required]],
      gId: ['', [Validators.required]]
    });
    // 拿到从摄像机组传过来的摄像组的id 值，用来查询该组下面的摄像机
    this.routerInfo.params.subscribe((value) => {
      this.addForm.patchValue({gId: value.id});
      this.componentName = 'CameraComponent' + value.id;
      this.commonFun.setCurrentComponentName(this.componentName);
    });
    this.commonOperation.setOperator(this);
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required, digitAndLetterValidator]],
      Update_id: [''],
      name: [''],
      creator: [''],
      innerUrl: [''],
      outerUrl: [''],
      gId: ['']
    });
    this.deleteForm = this.fb.group({
      id: [''],
      creator: ['']
    });
    this.queryForm = this.fb.group({
      gId: [this.addForm.get('gId').value],
      page: [''],
      row: ['']
    });
    this.fieldsAdd = [
      new Field('摄像机编号', 'id', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('摄像机名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机内网地址', 'innerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机外网地址', 'outerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('所属摄像机组编号', 'gId', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    this.fieldsModify = [
      new Field('摄像机编号', 'id', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('摄像机名称', 'name', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('摄像机创建人', 'creator', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机内网地址', 'innerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('摄像机外网地址', 'outerUrl', 'text', [new ValidMsg('required', '* 必填项')]),
      new Field('所属摄像机组编号', 'gId', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
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
    this.commonOperation.delete(this.deleteForm, Url.Data.videoManager.delete, true);
  }

  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.videoManager.save, true);
  }

  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.videoManager.update, true);
  }

  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.videoManager.foundByPage, true);
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

  public setData(data: Array<Camera>): void {
    this.datas = data;
    for (let i = 0; i < this.datas.length; i++) {
      this.datas[i]['name'] = this.datas[i].value;
    }
  }

  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }
}
