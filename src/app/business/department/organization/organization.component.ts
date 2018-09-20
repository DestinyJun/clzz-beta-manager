import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {DeparmentList, Field, PageBody} from '../../../shared/global.service';
import {CommonfunService} from '../../../shared/commonfun.service';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  public datas: Array<DeparmentList>;
  public fieldsAdd: Array<Field>;
  public fieldsModify: Array<Field>;
  public modalRef: BsModalRef;
  public pageBody: PageBody;
  public num: number;
  public addForm: FormGroup;
  public modifyForm: FormGroup;
  public detail: DeparmentList;
  public hasChecked: Array<DeparmentList> = [];
  public checked: string;
  public Fmodalid: any;
  public openstatus: boolean;
  public status: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;
  public listenDescModal: boolean;
  public mouseCurrentX;
  public mouseCurrentY;
  public moveX = 0;
  public moveY = 0;
  constructor(
    private req: ReqService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private commonfun: CommonfunService
  ) {}
  ngOnInit() {
    this.status = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.listenDescModal = false;
    this.hasChecked = [];
    this.pageBody = new PageBody(1, 10);
    // 增加表单信息
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      oid: ['', [Validators.required]],
      pid: ['-1', [Validators.required]]
    });
    // 修改表单信息
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dcode: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      oid: ['', [Validators.required]],
      pid: ['', [Validators.required]]
    });
    // 调用查看函数
    this.Update();
    this.req.FindDepartOrgani().subscribe(value => {
      this.Fmodalid = value.values;
    });
  }
  // 控制模态框, 增，修，查
  public openModal(template: TemplateRef<any>, data): void {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    // 先判断要打开的是 哪个 模态框
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'lookdesc') {
      // console.log('这是详情查看');
      this.listenDescModal = true;
      this.detail = data;
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'modify') {
      // console.log('这是修改');
      if (this.hasChecked.length !== 1) {
        if (this.listenDescModal) {
          this.mustone = false;
          this.modifyForm.reset(this.detail);
          this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
          this.listenDescModal = false;
        }else {
          this.mustone = true;
        }
      } else {
        if (!this.listenDescModal) {
          // this.detail = this.datas[this.hasChecked[0]];
        }
        this.mustone = false;
        this.modifyForm.reset(this.detail);
        this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
        this.listenDescModal = false;
      }
    }
    if (Object.getOwnPropertyNames(template['_def']['references'])[0] === 'add') {
      this.modalRef = this.modalService.show(template, this.commonfun.getOperateModalConfig());
    }
  }
  // 关闭模态框, 增，修，查
  public closeModal(): void {
    this.listenDescModal = false;
    this.modalRef.hide();
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
  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    this.Update();
  }
  // 全选 或 全不选
  public checkAll(): void {
    const checks = document.querySelectorAll('input[type=\'checkbox\']');
    for (let i = 1; i < checks.length; i++) {
      if (checks[0]['checked'] === true) {
        checks[i]['checked'] = true;
        // this.hasChecked = this.datas; 不能怎样赋值，因为datas是一个对象地址的引用，如果把datas赋给hasChecked, 那么操作hasCheck就等于操作datas
        this.datas.forEach(value => {
          this.hasChecked.push(value);
        });
      }else {
        checks[i]['checked'] = false;
        this.hasChecked = [];
      }
    }
  }
  // 得到已选择的checkBox
  public check(data, e): void {
    if (e.srcElement['checked'] === true) {
      this.hasChecked.push(data);
    }else {
      document.querySelector('input[type=\'checkbox\']')['checked'] = false;
      this.hasChecked.splice(this.datas.indexOf(data), 1);
    }
  }
//  删除表格 并且 重新请求数据(不管删除多少条，只请求数据刷新一次)
  public delete(): void {
    const haschecklen = this.hasChecked.length;
    if (haschecklen === 0) {
      this.mustone = false;
      this.gtone = true;
    } else {
      const bb = [];
      this.hasChecked.forEach(value => {
        bb.push(value.id);
      });
      if (confirm('你确定删除已勾选项吗?')) {
        this.openstatus = false;
        for (let j = 0; j < haschecklen; j++) {
          this.req.deleteDepartment('id=' +  this.hasChecked[j].id)
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
  public con_add(): void {
    if (this.addForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.addDepartment(this.commonfun.parameterSerialization(this.addForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    }else {
      this.inputvalid = true;
    }
  }
//  修改表格内容
  public con_modify(): void {
    if (this.modifyForm.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateDepartment(this.commonfun.parameterSerialization(this.modifyForm.value))
        .subscribe(res => {
          this.resMessage = res.message;
          this.status = Number(res.status);
          this.Update();
        });
    }else {
      this.inputvalid = true;
    }
  }
  // 刷新
  public Update(): void {
    this.gtone = false;
    this.mustone = false;
    this.addForm.reset({pid: '-1'});
    this.req.findDepartment(this.commonfun.parameterSerialization(this.pageBody)).subscribe(
      (value) => {
        this.hasChecked = [];
        this.checked = '';
        this.num = Math.ceil(value.values.num / 10);
        this.datas = value.values.datas;
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
      });
  }
/**
 *  模态框移动
 * */
// public startDrop(e): void {
//   e.srcElement.parentElement.parentNode.style.position = 'absolute';
//   e.srcElement.parentElement.parentNode.style.top = '0px';
//   e.srcElement.parentElement.parentNode.style.right = '0px';
//   console.log(e.srcElement.parentElement.parentNode);
//   console.log(e.srcElement.parentNode);
//   // let ev = e;
//   // while (true) {
//   //   if (ev.srcElement.parentElement === null) {
//   //     ev.style.backgroundColor = 'red';
//   //     break;
//   //   }else {
//   //     ev = ev.srcElement.parentElement;
//   //   }
//   // }
// }

  public startDrop(e): void {
    e.srcElement.parentElement.parentNode.style.position = 'absolute';
    e.srcElement.parentElement.parentNode.style.top = (e.clientY - e.offsetY) + 'px';
    console.log(e.clientX);
    console.log(e.offsetX);
    e.srcElement.parentElement.parentNode.style.left = (e.clientX - e.offsetX) + 'px';
    console.log('开始拖动');
    this.mouseCurrentX = e.clientX;
    this.mouseCurrentY = e.clientY;
    if (e.target.addEventListener) {
      e.target.addEventListener('mousemove', this.mouseMove, false);
      e.target.addEventListener('mouseup', this.stopMove, false);
      e.target.addEventListener('mouseleave', this.stopMove, false);
    }else if (e.target.attachEventthis) {
      e.target.attachEvent('onmousemove', this.mouseMove, false);
      e.target.attachEvent('onmouseup', this.stopMove, false);
      e.target.attachEvent('onmouseleave', this.stopMove, false);
    }
  }

  public mouseMove(e): void {
    console.log('正在拖动');
    this.moveX = e.clientX - this.mouseCurrentX;
    this.moveY = e.clientY - this.mouseCurrentY;
    const x = e.clientX - e.offsetX + this.moveX;
    const y = e.clientY - e.offsetY + this.moveY;
    // e.target.style.top =  y + 'px';
    // e.target.style.left = x + 'px';
    this.mouseCurrentX = e.clientX;
    this.mouseCurrentY = e.clientY;
  }

  public stopMove(e): void {
    console.log('结束拖动');
    e.target.removeEventListener('mousemove', this.mouseMove);
  }

  public cleanScreen(): void {
    this.openstatus = true;
    this.status = 0;
  }
}
