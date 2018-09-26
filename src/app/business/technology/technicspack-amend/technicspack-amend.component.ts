import {Component, OnInit, TemplateRef} from '@angular/core';
import {PageBody, TechnologyAmendQueryList, TechnologyParamsPackWord, ValidMsg} from '../../../shared/global.service';
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
  // technologyParamsPackWordList 用于显示增，修表单，不需要在模板上写太多 input 的 formControlName 控件
  public technologyParamsPackWordList: Array<TechnologyParamsPackWord>;
  public datas: Array<TechnologyAmendQueryList>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public detail: any;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public hasChecked: Array<number> = [];
  public checked: string;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  public listenDescModal: boolean;
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
    this.listenDescModal = false;
    this.pageBody = new PageBody(1, 10);
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      finish_type: ['', [Validators.required]],
      bottom_dry_thickness: ['', [Validators.required]],
      bottom_dry_thickness_d: ['', [Validators.required]],
      bottom_dry_thickness_d_l: ['', [Validators.required]],
      bottom_dry_thickness_d_r: ['', [Validators.required]],
      bottom_wet_thickness: ['', [Validators.required]],
      bottom_wet_thickness_d: ['', [Validators.required]],
      bottom_wet_thickness_d_l: ['', [Validators.required]],
      bottom_wet_thickness_d_r: ['', [Validators.required]],
      back_dry_thickness: ['', [Validators.required]],
      back_dry_thickness_d: ['', [Validators.required]],
      back_dry_thickness_d_l: ['', [Validators.required]],
      back_dry_thickness_d_r: ['', [Validators.required]],
      back_wet_thickness: ['', [Validators.required]],
      back_wet_thickness_d: ['', [Validators.required]],
      back_wet_thickness_d_l: ['', [Validators.required]],
      back_wet_thickness_d_r: ['', [Validators.required]],
      surface_dry_thickness: ['', [Validators.required]],
      surface_dry_thickness_d: ['', [Validators.required]],
      surface_dry_thickness_d_l: ['', [Validators.required]],
      surface_dry_thickness_d_r: ['', [Validators.required]],
      surface_wet_thickness: ['', [Validators.required]],
      surface_wet_thickness_d: ['', [Validators.required]],
      surface_wet_thickness_d_l: ['', [Validators.required]],
      surface_wet_thickness_d_r: ['', [Validators.required]],
      exhaust_air_volume_1: ['', [Validators.required]],
      exhaust_air_volume_1_d: ['', [Validators.required]],
      exhaust_air_volume_2: ['', [Validators.required]],
      exhaust_air_volume_2_d: ['', [Validators.required]]
    });
    this.modifyForm = this.fb.group({
      name: ['', [Validators.required]],
      finish_type: ['', [Validators.required]],
      bottom_dry_thickness: ['', [Validators.required]],
      bottom_dry_thickness_d: ['', [Validators.required]],
      bottom_dry_thickness_d_l: ['', [Validators.required]],
      bottom_dry_thickness_d_r: ['', [Validators.required]],
      bottom_wet_thickness: ['', [Validators.required]],
      bottom_wet_thickness_d: ['', [Validators.required]],
      bottom_wet_thickness_d_l: ['', [Validators.required]],
      bottom_wet_thickness_d_r: ['', [Validators.required]],
      back_dry_thickness: ['', [Validators.required]],
      back_dry_thickness_d: ['', [Validators.required]],
      back_dry_thickness_d_l: ['', [Validators.required]],
      back_dry_thickness_d_r: ['', [Validators.required]],
      back_wet_thickness: ['', [Validators.required]],
      back_wet_thickness_d: ['', [Validators.required]],
      back_wet_thickness_d_l: ['', [Validators.required]],
      back_wet_thickness_d_r: ['', [Validators.required]],
      surface_dry_thickness: ['', [Validators.required]],
      surface_dry_thickness_d: ['', [Validators.required]],
      surface_dry_thickness_d_l: ['', [Validators.required]],
      surface_dry_thickness_d_r: ['', [Validators.required]],
      surface_wet_thickness: ['', [Validators.required]],
      surface_wet_thickness_d: ['', [Validators.required]],
      surface_wet_thickness_d_l: ['', [Validators.required]],
      surface_wet_thickness_d_r: ['', [Validators.required]],
      exhaust_air_volume_1: ['', [Validators.required]],
      exhaust_air_volume_1_d: ['', [Validators.required]],
      exhaust_air_volume_2: ['', [Validators.required]],
      exhaust_air_volume_2_d: ['', [Validators.required]]
    });
    this.technologyParamsPackWordList = [
      new TechnologyParamsPackWord('方 案 名 称', 'name', '', '', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面 漆 颜 色', 'finish_type', '', '', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆干膜厚度',	'bottom_dry_thickness',	'微米', '	float	1000.00 	模板厚度', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆干膜厚度误差',	'bottom_dry_thickness_d', '微米'	, '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆干膜厚度修正左',	'bottom_dry_thickness_d_l', '微米', '	模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆干膜厚度修正右',	'bottom_dry_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆湿膜厚度',	'bottom_wet_thickness', '微米'	, '模板厚度', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆湿膜厚度误差',	'bottom_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆湿膜厚度修正左',	'bottom_wet_thickness_d_l', '微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('底漆湿膜厚度修正右',	'bottom_wet_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆干膜厚度',	'back_dry_thickness', '微米', '模板厚度', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆干膜厚度误差',	'back_dry_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆干膜厚度修正左',	'back_dry_thickness_d_l', '微米'	, '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆干膜厚度修正右',	'back_dry_thickness_d_r', '微米'	, '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆湿膜厚度',	'back_wet_thickness', '微米', '模板厚度', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆湿膜厚度误差',	'back_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆湿膜厚度修正左',	'back_wet_thickness_d_l', '微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('背漆湿膜厚度修正右',	'back_wet_thickness_d_r', '微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆干膜厚度',	'surface_dry_thickness', '	微米', '模板厚度', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆干膜厚度误差',	'surface_dry_thickness_d', '	微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆干膜厚度修正左',	'surface_dry_thickness_d_l', '	微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆干膜厚度修正右',	'surface_dry_thickness_d_r', '微米	', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆湿膜厚度',	'surface_wet_thickness', '	微米', '模板厚度', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆湿膜厚度误差', 'surface_wet_thickness_d', '微米', '模板厚度误差（厚度安全值）', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆湿膜厚度修正左',	'surface_wet_thickness_d_l', '	微米', '模板厚度测量仪（左侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('面漆湿膜厚度修正右',	'surface_wet_thickness_d_r', '	微米', '模板厚度测量仪（右侧）参数矫正值', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('一涂排气风量',	'exhaust_air_volume_1', 'CMH	', '一涂排气风量设定', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('一涂排气风量差值',	'exhaust_air_volume_1_d', 'CMH	', '一涂排气风量安全值设定', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('二涂排气风量',	'exhaust_air_volume_2', 'CMH	', '二涂排气风量设定', [new ValidMsg('required', '* 必填项')]),
      new TechnologyParamsPackWord('二涂排气风量差值',	'exhaust_air_volume_2_d', 'CMH', '二涂排气风量安全值设定', [new ValidMsg('required', '* 必填项')]),
    ];
    this.Update();
  }

  // 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, i): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // this.controlSearchText = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      // console.log('这是详情查看');
      this.listenDescModal = true;
      this.detail = this.datas[i];
      this.modalRef = this.modalService.show(template);
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          // 把 detail 中的 name 和 finish_type 放到 detail 中的 amendata 对象中。
          this.detail.amenddata['name'] = this.detail.name;
          this.detail.amenddata['finish_type'] = this.detail.finishtype;
          this.modifyForm.reset(this.detail.amenddata);
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
        // 把 detail 中的 name 和 finish_type 放到 detail 中的 amendata 对象中。
        this.detail.amenddata['name'] = this.detail.name;
        this.detail.amenddata['finish_type'] = this.detail.finishtype;
        this.modifyForm.reset(this.detail.amenddata);
        this.modalRef = this.modalService.show(template);
        this.listenDescModal = false;
      }

    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      this.modalRef = this.modalService.show(template);
    }
  }

  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
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
      for (let j = 0; j < haschecklen; j++ ) {
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
 // 删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public delete(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      if (this.commonfun.deleteChecked(this.datas, this.hasChecked, 'name')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.DeleteTechnicsPackAmend('finish_type=' +  this.datas[this.hasChecked[j]].finishtype)
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
  }
  // 生产线的添加 并且 重新请求数据，防止增加的是第十一条表格
  public paramsAdd(): void {
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.AddTechnicsPackAmend(this.addForm.value)
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
      this.req.UpdateTechnicsPackAmend(this.modifyForm.value)
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
        this.datas = value.values.amenddata;
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i]['amenddata'] = JSON.parse(this.datas[i]['amenddata']);
        }
        // 阻止用户点击 复选框时，会弹出查看模态框
        const setinter = setInterval(() => {
          const trs = document.getElementsByTagName('tr');
          // trs 长度大于 1时， 取消setInterval
          if (trs.length > 1) {
            for (let i = 1; i < trs.length; ++i) {
              const check = trs[i].children[0];
              // 移除勾选框的title属性
              check.setAttribute('title', '');
              // check.removeAttribute('title');
              // 取消勾选框冒泡默认行为
              check.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
              });
            }
            clearInterval(setinter);
          }
        });
        this.hasChecked = [];
        this.checked = '';
      });
  }
  public cleanScreen(): void {
    this.openstatus = true;
    this.status = 0;
  }
}
