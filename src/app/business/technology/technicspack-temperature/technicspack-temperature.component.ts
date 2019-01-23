import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  PageBody,
  TechnologyParamsPackWord,
  TechnologyTemperatureQueryList,
  ValidMsg
} from '../../../shared/global.service';
import {CommonFunService} from '../../../shared/common-fun.service';
import {digitValidator} from '../../../validator/Validators';
import {Url} from '../../../user-defined-service/Url';
import {BaseVar, CommonOperation} from '../../../user-defined-service/CommonOperation';
import {PostRequest} from '../../../user-defined-service/PostRequest';

@Component({
  selector: 'app-technicspack-temperature',
  templateUrl: './technicspack-temperature.component.html',
  styleUrls: ['./technicspack-temperature.component.css']
})
export class TechnicspackTemperatureComponent implements OnInit, OnDestroy {
  public technologyParamsPackWordList: Array<TechnologyParamsPackWord>;
  public datas: Array<TechnologyTemperatureQueryList> = [];
  public pageBody: PageBody;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public deleteForm: FormGroup;
  public queryForm: FormGroup;
  public baseVar: BaseVar;
  private componentName: string;
  constructor(
              private req: PostRequest,
              private fb: FormBuilder,
              private commonOperation: CommonOperation<TechnologyTemperatureQueryList>,
              private commonFun: CommonFunService
  ) {
  }

  ngOnInit() {
    this.baseVar = new BaseVar();
    this.componentName = 'TechnicspackTemperatureComponent';
    this.commonFun.setCurrentComponentName(this.componentName);
    this.commonOperation.setOperator(this);
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      al_thickness: ['', [Validators.required, digitValidator]],
      al_width: ['', [Validators.required, digitValidator]],
      temperature_1_1: ['', [Validators.required, digitValidator]],
      temperature_1_1_d: ['', [Validators.required, digitValidator]],
      temperature_1_2: ['', [Validators.required, digitValidator]],
      temperature_1_2_d: ['', [Validators.required, digitValidator]],
      temperature_1_3: ['', [Validators.required, digitValidator]],
      temperature_1_3_d: ['', [Validators.required, digitValidator]],
      temperature_1_4: ['', [Validators.required, digitValidator]],
      temperature_1_4_d: ['', [Validators.required, digitValidator]],
      temperature_1_5: ['', [Validators.required, digitValidator]],
      temperature_1_5_d: ['', [Validators.required, digitValidator]],
      temperature_2_1: ['', [Validators.required, digitValidator]],
      temperature_2_1_d: ['', [Validators.required, digitValidator]],
      temperature_2_2: ['', [Validators.required, digitValidator]],
      temperature_2_2_d: ['', [Validators.required, digitValidator]],
      temperature_2_3: ['', [Validators.required, digitValidator]],
      temperature_2_3_d: ['', [Validators.required, digitValidator]],
      temperature_2_4: ['', [Validators.required, digitValidator]],
      temperature_2_4_d: ['', [Validators.required, digitValidator]],
      temperature_2_5: ['', [Validators.required, digitValidator]],
      temperature_2_5_d: ['', [Validators.required, digitValidator]]
    });
    this.modifyForm = this.fb.group({
      name: ['', [Validators.required]],
      al_thickness: ['', [Validators.required, digitValidator]],
      al_width: ['', [Validators.required, digitValidator]],
      temperature_1_1: ['', [Validators.required, digitValidator]],
      temperature_1_1_d: ['', [Validators.required, digitValidator]],
      temperature_1_2: ['', [Validators.required, digitValidator]],
      temperature_1_2_d: ['', [Validators.required, digitValidator]],
      temperature_1_3: ['', [Validators.required, digitValidator]],
      temperature_1_3_d: ['', [Validators.required, digitValidator]],
      temperature_1_4: ['', [Validators.required, digitValidator]],
      temperature_1_4_d: ['', [Validators.required, digitValidator]],
      temperature_1_5: ['', [Validators.required, digitValidator]],
      temperature_1_5_d: ['', [Validators.required, digitValidator]],
      temperature_2_1: ['', [Validators.required, digitValidator]],
      temperature_2_1_d: ['', [Validators.required, digitValidator]],
      temperature_2_2: ['', [Validators.required, digitValidator]],
      temperature_2_2_d: ['', [Validators.required, digitValidator]],
      temperature_2_3: ['', [Validators.required, digitValidator]],
      temperature_2_3_d: ['', [Validators.required, digitValidator]],
      temperature_2_4: ['', [Validators.required, digitValidator]],
      temperature_2_4_d: ['', [Validators.required, digitValidator]],
      temperature_2_5: ['', [Validators.required, digitValidator]],
      temperature_2_5_d: ['', [Validators.required, digitValidator]]
    });
    this.queryForm = this.fb.group({
      page: [''],
      row: ['']
    });
    this.deleteForm = this.fb.group({
      al_thickness: [''],
      al_width: [''],
    });
    this.technologyParamsPackWordList = [
      new TechnologyParamsPackWord('方 案 名 称', 'name', '', '', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('铝板厚度', 'al_thickness', '毫米', '将（在）生产铝板厚度', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('铝板宽度', 'al_width', '毫米', '将（在）生产铝板宽度', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂一区温度', 'temperature_1_1', '	摄氏度', '一涂一区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂一区温度差值', 'temperature_1_1_d', '	摄氏度', '一涂一区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂二区温度', 'temperature_1_2', '	摄氏度', '一涂二区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂二区温度差值', 'temperature_1_2_d', '	摄氏度', '一涂二区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂三区温度', 'temperature_1_3', '	摄氏度', '一涂三区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂三区温度差值', 'temperature_1_3_d', '	摄氏度', '一涂三区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂四区温度', 'temperature_1_4', '	摄氏度', '一涂四区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂四区温度差值', 'temperature_1_4_d', '	摄氏度', '一涂四区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂五区温度', 'temperature_1_5', '	摄氏度', '一涂五区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('一涂五区温度差值', 'temperature_1_5_d', '	摄氏度', '一涂五区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂一区温度', 'temperature_2_1', '	摄氏度', '二涂一区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂一区温度差值', 'temperature_2_1_d', '	摄氏度', '二涂一区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂二区温度', 'temperature_2_2', '	摄氏度', '二涂二区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂二区温度差值', 'temperature_2_2_d', '	摄氏度', '二涂二区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂三区温度', 'temperature_2_3', '	摄氏度', '二涂三区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂三区温度差值', 'temperature_2_3_d', '	摄氏度', '二涂三区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂四区温度', 'temperature_2_4', '	摄氏度', '二涂四区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂四区温度差值', 'temperature_2_4_d', '	摄氏度', '二涂四区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂五区温度', 'temperature_2_5', '	摄氏度', '二涂五区温度设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
      new TechnologyParamsPackWord('二涂五区温度差值', 'temperature_2_5_d', '	摄氏度', '二涂五区温度安全值设定', [new ValidMsg('required', '* 必填项'), new ValidMsg('digit', '请输入数字')]),
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
    this.commonOperation.delete(this.deleteForm, Url.Data.defaultTemperatureTechnologyPackage.delete, true);
  }

  public save(): void {
    this.commonOperation.save(this.addForm, Url.Data.defaultTemperatureTechnologyPackage.save, true);
  }

  public update(): void {
    this.commonOperation.update(this.modifyForm, Url.Data.defaultTemperatureTechnologyPackage.update, true);
  }

  public foundByPage(): void {
    this.queryForm.patchValue(this.pageBody);
    this.commonOperation.foundByPage(this.queryForm, Url.Data.defaultTemperatureTechnologyPackage.foundByPage, true);
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

  public setData(data: Array<TechnologyTemperatureQueryList>): void {
    this.datas = data;
    for (let i = 0; i < this.datas.length; i++) {
      this.datas[i].temperaturedata = JSON.parse(String(this.datas[i].temperaturedata));
      this.datas[i]['al_thickness'] = this.datas[i].althickness;
      this.datas[i]['al_width'] = this.datas[i].alwidth;
    }
    this.commonOperation.setData(this.datas);
  }
  public setBaseVar(baseVar: BaseVar): void {
    this.baseVar = baseVar;
  }
}
