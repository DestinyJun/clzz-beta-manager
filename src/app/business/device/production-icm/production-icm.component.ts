import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageBody, DeviceProductionIcmList, Field, ValidMsg, JurisdictionInterface} from '../../../shared/global.service';
import {CommonFunService} from '../../../shared/common-fun.service';
import {digitAndLetterValidator} from '../../../validator/Validators';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-production-icm',
  templateUrl: './production-icm.component.html',
  styleUrls: ['./production-icm.component.css']
})
export class ProductionIcmComponent implements OnInit, OnDestroy {
  public datas: Array<DeviceProductionIcmList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public pageBody: PageBody;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public Fmodalid: any;
  public baseVar: BaseVar;
  private componentName: string;
  private deleteForm: FormGroup;
  private queryForm: FormGroup;
  constructor(
    private commonOperation: CommonOperation<DeviceProductionIcmList>,
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {}

  ngOnInit(): void {
    this.baseVar = new BaseVar();
    this.componentName = 'ProductionIcmComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    this.addForm = this.fb.group({
      mid: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', Validators.required],
      sid: ['', Validators.required]
    });
    this.modifyForm = this.fb.group({
      mid: ['', [Validators.required, digitAndLetterValidator]],
      name: ['', Validators.required],
      sid: ['', Validators.required]
    });
    this.deleteForm = this.fb.group({
      mid: [''],
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: [''],
    });
    // 只要是需要选择的下拉框，另放在后面
    this.fieldsAdd = [
      new Field('模块编号',	'mid', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('模块名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
      // new Field('父id',	'sid')
    ];
    this.fieldsModify = [
      new Field('模块编号',	'mid', 'text', [new ValidMsg('required', '* 必填项'), new ValidMsg('digitAndLetter', '编号只能为数字和字母')]),
      new Field('模块名称',	'name', 'text', [new ValidMsg('required', '* 必填项')]),
    ];
    // 得到系统id
    this.req.post(Url.Data.productionLineBaseInfo.find, null).subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
// 选择修改设备id
  public selectLineId(value, form): void {
    form.patchValue({'sid': value});
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
    this.commonOperation.delete(this.deleteForm, Url.Data.deviceProductionModular.delete, true);
  }
  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.deviceProductionModular.save, true);
  }
  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.deviceProductionModular.update, true);
  }
  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.deviceProductionModular.foundByPage, true);
  }
  ngOnDestroy(): void {
    this.commonFun.rememberMark(this.componentName, this.pageBody);
    this.commonOperation.initBaseVar();
    this.commonOperation.closeModal();
  }
  public setData(data: Array<DeviceProductionIcmList>): void {
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
