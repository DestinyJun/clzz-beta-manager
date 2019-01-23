import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {PageBody, TechnologyAmendQueryList, TechnologyParamsPackWord, ValidMsg} from '../../../shared/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonFunService} from '../../../shared/common-fun.service';
import {digitValidator} from '../../../validator/Validators';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-technicspack-amend',
  templateUrl: './technicspack-amend.component.html',
  styleUrls: ['./technicspack-amend.component.css']
})
export class TechnicspackAmendComponent implements OnInit, OnDestroy {
  // technologyParamsPackWordList 用于显示增，修表单，不需要在模板上写太多 input 的 formControlName 控件
  public technologyParamsPackWordList: Array<TechnologyParamsPackWord>;
  public datas: Array<TechnologyAmendQueryList>;
  public pageBody: PageBody;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public baseVar: BaseVar;
  private componentName: string;
  private deleteForm: FormGroup;
  private queryForm: FormGroup;

  constructor(
    private commonOperation: CommonOperation<TechnologyAmendQueryList>,
    private req: PostRequest,
    private fb: FormBuilder,
    private commonFun: CommonFunService
  ) {
  }

  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'TechnicspackAmendComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      finish_type: ['', [Validators.required]],
      bottom_dry_thickness: ['', [Validators.required, digitValidator]],
      bottom_dry_thickness_d: ['', [Validators.required, digitValidator]],
      bottom_dry_thickness_d_l: ['', [Validators.required, digitValidator]],
      bottom_dry_thickness_d_r: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness_d: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness_d_l: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness_d_r: ['', [Validators.required, digitValidator]],
      back_dry_thickness: ['', [Validators.required, digitValidator]],
      back_dry_thickness_d: ['', [Validators.required, digitValidator]],
      back_dry_thickness_d_l: ['', [Validators.required, digitValidator]],
      back_dry_thickness_d_r: ['', [Validators.required, digitValidator]],
      back_wet_thickness: ['', [Validators.required, digitValidator]],
      back_wet_thickness_d: ['', [Validators.required, digitValidator]],
      back_wet_thickness_d_l: ['', [Validators.required, digitValidator]],
      back_wet_thickness_d_r: ['', [Validators.required, digitValidator]],
      surface_dry_thickness: ['', [Validators.required, digitValidator]],
      surface_dry_thickness_d: ['', [Validators.required, digitValidator]],
      surface_dry_thickness_d_l: ['', [Validators.required, digitValidator]],
      surface_dry_thickness_d_r: ['', [Validators.required, digitValidator]],
      surface_wet_thickness: ['', [Validators.required, digitValidator]],
      surface_wet_thickness_d: ['', [Validators.required, digitValidator]],
      surface_wet_thickness_d_l: ['', [Validators.required, digitValidator]],
      surface_wet_thickness_d_r: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_1: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_1_d: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_2: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_2_d: ['', [Validators.required, digitValidator]]
    });
    this.modifyForm = this.fb.group({
      name: ['', [Validators.required]],
      finish_type: ['', [Validators.required]],
      bottom_dry_thickness: ['', [Validators.required, digitValidator]],
      bottom_dry_thickness_d: ['', [Validators.required, digitValidator]],
      bottom_dry_thickness_d_l: ['', [Validators.required, digitValidator]],
      bottom_dry_thickness_d_r: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness_d: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness_d_l: ['', [Validators.required, digitValidator]],
      bottom_wet_thickness_d_r: ['', [Validators.required, digitValidator]],
      back_dry_thickness: ['', [Validators.required, digitValidator]],
      back_dry_thickness_d: ['', [Validators.required, digitValidator]],
      back_dry_thickness_d_l: ['', [Validators.required, digitValidator]],
      back_dry_thickness_d_r: ['', [Validators.required, digitValidator]],
      back_wet_thickness: ['', [Validators.required, digitValidator]],
      back_wet_thickness_d: ['', [Validators.required, digitValidator]],
      back_wet_thickness_d_l: ['', [Validators.required, digitValidator]],
      back_wet_thickness_d_r: ['', [Validators.required, digitValidator]],
      surface_dry_thickness: ['', [Validators.required, digitValidator]],
      surface_dry_thickness_d: ['', [Validators.required, digitValidator]],
      surface_dry_thickness_d_l: ['', [Validators.required, digitValidator]],
      surface_dry_thickness_d_r: ['', [Validators.required, digitValidator]],
      surface_wet_thickness: ['', [Validators.required, digitValidator]],
      surface_wet_thickness_d: ['', [Validators.required, digitValidator]],
      surface_wet_thickness_d_l: ['', [Validators.required, digitValidator]],
      surface_wet_thickness_d_r: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_1: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_1_d: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_2: ['', [Validators.required, digitValidator]],
      exhaust_air_volume_2_d: ['', [Validators.required, digitValidator]]
    });
    this.deleteForm = this.fb.group({
      finish_type: ['']
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: ['']
    });
    this.technologyParamsPackWordList = [
      new TechnologyParamsPackWord('方 案 名 称', 'name', '', '', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面 漆 类 型', 'finish_type', '', '', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆干膜厚度', 'bottom_dry_thickness', '微米', '	float	1000.00 	模板厚度', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('底漆干膜厚度误差', 'bottom_dry_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('底漆干膜厚度修正左', 'bottom_dry_thickness_d_l', '微米', '	模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('底漆干膜厚度修正右', 'bottom_dry_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('底漆湿膜厚度', 'bottom_wet_thickness', '微米', '模板厚度', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('底漆湿膜厚度误差', 'bottom_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('底漆湿膜厚度修正左', 'bottom_wet_thickness_d_l', '微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('底漆湿膜厚度修正右', 'bottom_wet_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆干膜厚度', 'back_dry_thickness', '微米', '模板厚度', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆干膜厚度误差', 'back_dry_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆干膜厚度修正左', 'back_dry_thickness_d_l', '微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆干膜厚度修正右', 'back_dry_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆湿膜厚度', 'back_wet_thickness', '微米', '模板厚度', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆湿膜厚度误差', 'back_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆湿膜厚度修正左', 'back_wet_thickness_d_l', '微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('背漆湿膜厚度修正右', 'back_wet_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆干膜厚度', 'surface_dry_thickness', '	微米', '模板厚度', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆干膜厚度误差', 'surface_dry_thickness_d', '	微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆干膜厚度修正左', 'surface_dry_thickness_d_l', '	微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆干膜厚度修正右', 'surface_dry_thickness_d_r', '微米	', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆湿膜厚度', 'surface_wet_thickness', '	微米', '模板厚度', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆湿膜厚度误差', 'surface_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆湿膜厚度修正左', 'surface_wet_thickness_d_l', '	微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('面漆湿膜厚度修正右', 'surface_wet_thickness_d_r', '	微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂排气风量', 'exhaust_air_volume_1', 'CMH	', '一涂排气风量设定', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂排气风量差值', 'exhaust_air_volume_1_d', 'CMH	', '一涂排气风量安全值设定', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂排气风量', 'exhaust_air_volume_2', 'CMH	', '二涂排气风量设定', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂排气风量差值', 'exhaust_air_volume_2_d', 'CMH', '二涂排气风量安全值设定', [new ValidMsg('required', '* 必填项, '), new ValidMsg('digit', '请输入数字')]),
    ];
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
    this.commonOperation.delete(this.deleteForm, Url.Data.defaultTechnologyPackage.delete, true);
  }

  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.defaultTechnologyPackage.save, true);
  }

  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.defaultTechnologyPackage.update, true);
  }

  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.defaultTechnologyPackage.foundByPage, true);
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

  public setData(data: Array<TechnologyAmendQueryList>): void {
    this.datas = data;
    for (let i = 0; i < this.datas.length; i++) {
      this.datas[i]['finish_type'] = this.datas[i].finishtype;
      this.datas[i].amenddata = JSON.parse(String(this.datas[i].amenddata));
    }
    this.commonOperation.setData(this.datas);
  }

  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }
}

