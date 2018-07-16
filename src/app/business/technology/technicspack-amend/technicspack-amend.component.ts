import {Component, OnInit, TemplateRef} from '@angular/core';
import {PageBody, TechnologyAmendQueryList, TechnologyParamsPackWord} from '../../../shared/global.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-technicspack-amend',
  templateUrl: './technicspack-amend.component.html',
  styleUrls: ['./technicspack-amend.component.css']
})
export class TechnicspackAmendComponent implements OnInit {
  public technologyParamsPackWordList: Array<TechnologyParamsPackWord>;
  public Paramdatas: Array<TechnologyAmendQueryList>
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public Detail: any;
  public paramAddForm: FormGroup;
  public paramModifyForm: FormGroup;
  public paramLookDetailForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  constructor(
    private modalService: BsModalService,
    private req: ReqService,
    private fb: FormBuilder,
    private commonfun: CommonfunService
  ) {
  }
  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.pageBody = new PageBody(1, 10);
    this.paramAddForm = this.fb.group({
      name: ['', Validators.required],
      finish_type: ['', Validators.required],
      bottom_dry_thickness: ['', Validators.required],
      bottom_dry_thickness_d: ['', Validators.required],
      bottom_dry_thickness_d_l: ['', Validators.required],
      bottom_dry_thickness_d_r: ['', Validators.required],
      bottom_wet_thickness: ['', Validators.required],
      bottom_wet_thickness_d: ['', Validators.required],
      bottom_wet_thickness_d_l: ['', Validators.required],
      bottom_wet_thickness_d_r: ['', Validators.required],
      back_dry_thickness: ['', Validators.required],
      back_dry_thickness_d: ['', Validators.required],
      back_dry_thickness_d_l: ['', Validators.required],
      back_dry_thickness_d_r: ['', Validators.required],
      back_wet_thickness: ['', Validators.required],
      back_wet_thickness_d: ['', Validators.required],
      back_wet_thickness_d_l: ['', Validators.required],
      back_wet_thickness_d_r: ['', Validators.required],
      surface_dry_thickness: ['', Validators.required],
      surface_dry_thickness_d: ['', Validators.required],
      surface_dry_thickness_d_l: ['', Validators.required],
      surface_dry_thickness_d_r: ['', Validators.required],
      surface_wet_thickness: ['', Validators.required],
      surface_wet_thickness_d: ['', Validators.required],
      surface_wet_thickness_d_l: ['', Validators.required],
      surface_wet_thickness_d_r: ['', Validators.required],
      exhaust_air_volume_1: ['', Validators.required],
      exhaust_air_volume_1_d: ['', Validators.required],
      exhaust_air_volume_2: ['', Validators.required],
      exhaust_air_volume_2_d: ['', Validators.required]
    });
    this.paramModifyForm = this.fb.group({
      name: ['', Validators.required],
      finish_type: ['', Validators.required],
      bottom_dry_thickness: ['', Validators.required],
      bottom_dry_thickness_d: ['', Validators.required],
      bottom_dry_thickness_d_l: ['', Validators.required],
      bottom_dry_thickness_d_r: ['', Validators.required],
      bottom_wet_thickness: ['', Validators.required],
      bottom_wet_thickness_d: ['', Validators.required],
      bottom_wet_thickness_d_l: ['', Validators.required],
      bottom_wet_thickness_d_r: ['', Validators.required],
      back_dry_thickness: ['', Validators.required],
      back_dry_thickness_d: ['', Validators.required],
      back_dry_thickness_d_l: ['', Validators.required],
      back_dry_thickness_d_r: ['', Validators.required],
      back_wet_thickness: ['', Validators.required],
      back_wet_thickness_d: ['', Validators.required],
      back_wet_thickness_d_l: ['', Validators.required],
      back_wet_thickness_d_r: ['', Validators.required],
      surface_dry_thickness: ['', Validators.required],
      surface_dry_thickness_d: ['', Validators.required],
      surface_dry_thickness_d_l: ['', Validators.required],
      surface_dry_thickness_d_r: ['', Validators.required],
      surface_wet_thickness: ['', Validators.required],
      surface_wet_thickness_d: ['', Validators.required],
      surface_wet_thickness_d_l: ['', Validators.required],
      surface_wet_thickness_d_r: ['', Validators.required],
      exhaust_air_volume_1: ['', Validators.required],
      exhaust_air_volume_1_d: ['', Validators.required],
      exhaust_air_volume_2: ['', Validators.required],
      exhaust_air_volume_2_d: ['', Validators.required]
    });
    this.technologyParamsPackWordList = [
      new TechnologyParamsPackWord('方 案 名 称', 'name', '', ''),
      new TechnologyParamsPackWord('面 漆 颜 色', 'finish_type', '', ''),
      new TechnologyParamsPackWord('底漆干膜厚度',	'bottom_dry_thickness',	'微米', '	float	1000.00 	模板厚度'),
      new TechnologyParamsPackWord('底漆干膜厚度误差',	'bottom_dry_thickness_d', '微米'	, '模板厚度误差（厚度安全值）'),
      new TechnologyParamsPackWord('底漆干膜厚度修正左',	'bottom_dry_thickness_d_l', '微米', '	模板厚度测量仪（左侧）参数矫正值'),
      new TechnologyParamsPackWord('底漆干膜厚度修正右',	'bottom_dry_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值'),
      new TechnologyParamsPackWord('底漆湿膜厚度',	'bottom_wet_thickness', '微米'	, '模板厚度'),
      new TechnologyParamsPackWord('底漆湿膜厚度误差',	'bottom_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）'),
      new TechnologyParamsPackWord('底漆湿膜厚度修正左',	'bottom_wet_thickness_d_l', '微米', '模板厚度测量仪（左侧）参数矫正值'),
      new TechnologyParamsPackWord('底漆湿膜厚度修正右',	'bottom_wet_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值'),
      new TechnologyParamsPackWord('背漆干膜厚度',	'back_dry_thickness', '微米', '模板厚度'),
      new TechnologyParamsPackWord('背漆干膜厚度误差',	'back_dry_thickness_d', '微米', '模板厚度误差（厚度安全值）'),
      new TechnologyParamsPackWord('背漆干膜厚度修正左',	'back_dry_thickness_d_l', '微米'	, '模板厚度测量仪（左侧）参数矫正值'),
      new TechnologyParamsPackWord('背漆干膜厚度修正右',	'back_dry_thickness_d_r', '微米'	, '模板厚度测量仪（右侧）参数矫正值'),
      new TechnologyParamsPackWord('背漆湿膜厚度',	'back_wet_thickness', '微米', '模板厚度'),
      new TechnologyParamsPackWord('背漆湿膜厚度误差',	'back_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）'),
      new TechnologyParamsPackWord('背漆湿膜厚度修正左',	'back_wet_thickness_d_l', '微米', '模板厚度测量仪（左侧）参数矫正值'),
      new TechnologyParamsPackWord('背漆湿膜厚度修正右',	'back_wet_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值'),
      new TechnologyParamsPackWord('面漆干膜厚度',	'surface_dry_thickness', '	微米', '模板厚度'),
      new TechnologyParamsPackWord('面漆干膜厚度误差',	'surface_dry_thickness_d', '	微米', '模板厚度误差（厚度安全值）'),
      new TechnologyParamsPackWord('面漆干膜厚度修正左',	'surface_dry_thickness_d_l', '	微米', '模板厚度测量仪（左侧）参数矫正值'),
      new TechnologyParamsPackWord('面漆干膜厚度修正右',	'surface_dry_thickness_d_r', '微米	', '模板厚度测量仪（右侧）参数矫正值'),
      new TechnologyParamsPackWord('面漆湿膜厚度',	'surface_wet_thickness', '	微米', '模板厚度'),
      new TechnologyParamsPackWord('面漆湿膜厚度误差', 'surface_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）'),
      new TechnologyParamsPackWord('面漆湿膜厚度修正左',	'surface_wet_thickness_d_l', '	微米', '模板厚度测量仪（左侧）参数矫正值'),
      new TechnologyParamsPackWord('面漆湿膜厚度修正右',	'surface_wet_thickness_d_r', '	微米', '模板厚度测量仪（右侧）参数矫正值'),
      new TechnologyParamsPackWord('一涂排气风量',	'exhaust_air_volume_1', 'CMH	', '一涂排气风量设定'),
      new TechnologyParamsPackWord('一涂排气风量差值',	'exhaust_air_volume_1_d', 'CMH	', '一涂排气风量安全值设定'),
      new TechnologyParamsPackWord('二涂排气风量',	'exhaust_air_volume_2', 'CMH	', '二涂排气风量设定'),
      new TechnologyParamsPackWord('二涂排气风量差值',	'exhaust_air_volume_2_d', 'CMH', '二涂排气风量安全值设定'),
    ];
    this.Update();
  }
  // 控制模态框
  public openModal(template: TemplateRef<any>): void {
    this.inputvalid = false;
    this.gtone = false;
    if (this.hasChecked.length > 1 || this.hasChecked.length === 0) {
      this.mustone = true;
    } else {
      let detail1: any = {name: this.Detail.name, finish_type: this.Detail.finishtype};
      this.inputvalid = false;
      this.Detail.did = String(this.Detail.did);
      this.paramModifyForm.reset();
      this.paramModifyForm.patchValue(detail1);
      this.paramModifyForm.patchValue(this.Detail.amenddata);
      this.modalRef = this.modalService.show(template);
    }
  }
  // 控制模态框增加
  public openAddModal(template: TemplateRef<any>): void {
    this.mustone = false;
    this.gtone = false;
    this.inputvalid = false;
    this.modalRef = this.modalService.show(template);
  }
  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
  }
  // 全选 或 全不选
  public getAllCheckBoxStatus(e): void {
    if (e.srcElement.checked === true) {
      this.hasChecked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.hasChecked.splice(this.Paramdatas.length, 10);
      this.checked = 'checked';
    } else {
      this.hasChecked = [];
      this.checked = '';
    }
  }
  // 得到已选择的checkBox
  public getCheckBoxStatus(e, i): void {
    let haschecklen = this.hasChecked.length;
    if (e.srcElement.checked === true) {
      this.hasChecked.push(i);
    } else {
      for (let j = 0; j < haschecklen; j++ ) {
        if (this.hasChecked[j] === i) {
          this.hasChecked.splice(j, 1);
        }
      }
    }
    if (this.hasChecked.length === 1) {
      this.Detail = this.Paramdatas[this.hasChecked[0]];
    } else {
      this.Detail = null;
    }
  }
 // 删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public Delete(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      this.mustone = false;
      this.openstatus = false;
      for (let j = 0; j < haschecklen; j++) {
        this.req.DeleteTechnicsPackAmend('finish_type=' +  this.Paramdatas[this.hasChecked[j]].finishtype)
          .subscribe(res => {
            if (j === haschecklen - 1) {
              this.resMessage = res.message;
              this.status = Number(res.status);
              this.Update();
            }
          });
      }
    }
  }
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public paramsAdd(): void {
    if (this.paramAddForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.AddTechnicsPackAmend(this.paramAddForm.value)
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public paramsModify(): void {
    if (1) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.UpdateTechnicsPackAmend(this.paramModifyForm.value)
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    } else {
      this.inputvalid = true;
    }
  }
  // 刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.FindTechnicsPackAmend(this.commonfun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.num = Math.ceil(value.values.num / 10);
        this.Paramdatas = value.values.amenddata;
        for (let i = 0; i < this.Paramdatas.length; i++) {
          this.Paramdatas[i]['amenddata'] = JSON.parse(this.Paramdatas[i]['amenddata']);
        }
        setTimeout(() => {
          this.openstatus = true;
          this.status = 0;
        }, 2500);
        this.hasChecked = [];
        this.checked = '';
      });
  }

}
