import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReqService} from '../../../shared/req.service';
import {CameraGroup, Cameras, PageBody} from '../../../shared/global.service';
import 'rxjs/Rx';
import {CommonfunService} from '../../../shared/commonfun.service';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.css']
})
export class VideoManagerComponent implements OnInit {
  public videoGroups: Array<CameraGroup>;
  public videos: Array<Cameras>;
  public modalRef: BsModalRef;
  public boo = false;
  public status: Array<boolean>;
  public DetailCameraGroup: CameraGroup;
  public DetailCamera: Cameras;
  public formModel1: FormGroup;
  public cameraGroupStatus: FormControl;
  public formModel3: FormGroup;
  public formModel1s: FormGroup;
  public formModel3s: FormGroup;
  public downWindow: boolean;
  public pageBody: PageBody;
  public num: number;
  public G_id: number;
  public Fmodalid: any;
  public openstatus: boolean;
  public status1: number;
  public inputvalid: boolean;
  public mustone: boolean;
  public gtone: boolean;
  public resMessage: string;

  constructor(private req: ReqService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private commonfun: CommonfunService
  ) {
  }

  ngOnInit() {
    this.status = [];
    this.status1 = 0;
    this.openstatus = true;
    this.inputvalid = false;
    this.mustone = false;
    this.gtone = false;
    this.pageBody = new PageBody(1, 10);
    this.G_id = -1;
    this.downWindow = true;
    this.formModel1 = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      creator: ['', Validators.required],
      status: ['0', Validators.required],
      p_id: ['', Validators.required]
    });
    this.formModel1s = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      creator: ['', Validators.required],
      inner_url: [''],
      outer_url: ['', Validators.required],
      g_id: ['', Validators.required]
    });
    this.formModel3 = this.fb.group({
      id: [''],
      Update_id: ['', Validators.required],
      value: [''],
      creator: [''],
      status: [''],
      p_id: ['']
    });
    this.formModel3s = this.fb.group({
      id: [''],
      Update_id: ['', Validators.required],
      value: [''],
      creator: [''],
      inner_url: [''],
      outer_url: [''],
      g_id: ['']
    });
    this.Request();
    this.req.FindDepartOrgani().subscribe(value => {
      // this.Fmodalid = value.values.departments;  // 这有问题，id 为undefined， 只有下面才不会出现问题
      this.Fmodalid = value.values;
      for (let i = 0; i < this.Fmodalid.departments.length; i++) {
        this.Fmodalid.departments[i].id = String(this.Fmodalid.departments[i].id);
      }
      // this.formModel1.patchValue({'p_id': this.Fmodalid.departments[0].id});
    });
    // 摄像机组的状态
    this.cameraGroupStatus = new FormControl();
    this.cameraGroupStatus.valueChanges
      .debounceTime(500)
      .subscribe(value => {
    });
  }

  public SelectAddModalId(value): void {
    this.formModel1.patchValue({'p_id': value});
  }

  public SelectModifyModalId(value): void {
    this.formModel3.patchValue({'p_id': value});
  }

  // modal
  public openModal(template: TemplateRef<any>) {
    this.inputvalid = false;
    this.gtone = false;
    this.mustone = false;
    this.modalRef = this.modalService.show(template);
  }

  // 模态框二
  public openModal2(template: TemplateRef<any>) {
    this.inputvalid = false;
    this.gtone = false;
    let i: number, j = -1;
    let n = 0;
    for (i = 0; i < this.videoGroups.length; i++) {
      if (this.status[i] === true) {
        j = i;
        n++;
      }
    }
    if (n === 1 && this.boo !== true) {
      this.mustone = false;
      this.gtone = false;
      if (this.downWindow === true) {
        this.DetailCameraGroup = this.videoGroups[j];
        this.formModel3.patchValue(this.videoGroups[j]);
      } else {
        this.DetailCameraGroup = this.videoGroups[j];
        this.DetailCamera = this.videos[j];
        this.formModel3s.patchValue(this.videos[j]);
      }
      this.modalRef = this.modalService.show(template);
    } else {
      this.mustone = true;
    }
  }

  // 监控翻页事件
  public getPageBody(event): void {
    this.pageBody = event;
    if (this.downWindow === true) {
      this.Request();
    } else {
      this.RequestCamera(this.G_id);
    }
  }

  // 组查看
  public Request(): void {
    this.gtone = false;
    this.mustone = false;
    this.req.findVideomanager(this.commonfun.parameterSerialization(this.pageBody))
      .subscribe((value) => {
        this.videoGroups = value.values.datas;
        this.num = Math.ceil(value.values.number / 10);
        setTimeout(() => {
          this.openstatus = true;
          this.status1 = 0;
        }, 2500);
        const s: Array<boolean> = [];
        const length = this.videoGroups.length;
        for (let i = 0; i < length; i++) {
          s.push(false);
        }
        this.status = s;
      });
  }

  // 选择摄像机组的 状态, 只能输入0 和 1
  // public selectStatusId(): void {
  //   console.log(this.formModel1.get('status').value);
  //   if (this.formModel1.get('status').value !== '0' || this.formModel1.get('status').value !== '1') {
  //       console.log(this.formModel1.get('status').value);
  //   }
  // }

  // 组增加
  public insert() {
    if (this.formModel1.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.addVideomanager(this.commonfun.parameterSerialization(this.formModel1.value))
        .subscribe(res => {
          this.status1 = Number(res.status);
          this.resMessage = res.message;
          this.Request();
        });
    } else {
      this.inputvalid = true;
    }
  }

  // 组删除
  public Delete() {
    let deleteNum = 0;
    this.mustone = false;
    this.openstatus = false;
    let i: number;
    // 判断是否被选中，若选中，则执行删除
    for (i = 0; i < this.status.length; i++) {
      if (this.status[i] === true) {
        deleteNum += 1;
        const body = 'id=' + this.videoGroups[i].id + '&creator=' + this.videoGroups[i].creator;
        this.req.deleteVideomanager(body)
          .subscribe(res => {
            this.status1 = Number(res.status);
            this.resMessage = res.message;
            if (i === this.status.length) {
              this.Request();
            }
          });
      }
    }
    if (deleteNum === 0) {
      this.gtone = true;
    }
  }

  // 组修改
  public Update() {
    if (this.formModel3.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateVideomanager(this.commonfun.parameterSerialization(this.formModel3.value))
        .subscribe(res => {
          try {
            this.status1 = Number(res.status);
            this.resMessage = res.message;
            this.Request();
          }catch (e) {
            console.log('服务器故障！');
          }
        });
    } else {
      this.inputvalid = true;
    }
  }

  // 查看
  public RequestCamera(g_id): void {
    this.gtone = false;
    this.mustone = false;
    this.req.findVideos('gid=' + g_id + '&page=' + this.pageBody.page + '&row=' + this.pageBody.row)
      .subscribe(value => {
        this.videos = value.values.datas;
        this.num = Math.ceil(value.values.number / 10);
        setTimeout(() => {
          this.openstatus = true;
          this.status1 = 0;
        }, 2500);
        this.status = [];
        if (this.videos.length === 0) {
          this.videos = undefined;
        } else {
          const s: Array<boolean> = [];
          const length = this.videos.length;
          for (let i = 0; i < length; i++)
            s.push(false);
          this.status = s;
        }
      });
  }

  // 增加
  public insertCamera() {
    if (this.formModel1s.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.addVideo(this.commonfun.parameterSerialization(this.formModel1s.value))
        .subscribe(res => {
          this.status1 = Number(res.status);
          this.resMessage = res.message;
          this.RequestCamera(this.G_id);
        });
    } else {
      this.inputvalid = true;
    }
  }

  // 删除
  public DeleteCamera() {
    let deleteNum = 0;
    this.openstatus = false;
    this.mustone = false;
    let i: number;
    for (i = 0; i < this.status.length; i++) {
      if (this.status[i] === true) {
        deleteNum += 1;
        const body = 'id=' + this.videos[i].id + '&creator=' + this.videos[i].creator;
        this.req.deleteVideo(body)
          .subscribe(res => {
            if (i === this.status.length) {
              this.status1 = Number(res.status);
              this.resMessage = res.message;
              this.Request();
            }
          });
      }
    }
    if (deleteNum === 0) {
      this.gtone = true;
    }
  }

  // 修改
  public UpdateCamera() {
    this.gtone = false;
    if (this.formModel3s.valid) {
      this.openstatus = false;
      this.inputvalid = false;
      this.modalRef.hide();
      this.req.updateVideo(this.commonfun.parameterSerialization(this.formModel3s.value))
        .subscribe(res => {
          // try {
            this.status1 = Number(res.status);
            this.resMessage = res.message;
            this.RequestCamera(this.G_id);
        });
    } else {
      this.inputvalid = true;
    }
  }

  // 复选框全选
  All2() {
    this.boo = !this.boo;
    for (let i = 0; i < this.status.length; i++) {
      this.status[i] = this.boo;
    }
  }

  // 点击复选框获取需要删除的id
  public Obtain(i) {
    this.status[i] = !this.status[i];
    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i] === false) {
        this.boo = false;
        break;
      }
    }
  }

  // 下拉选择项 切换
  public DownDropSelect(value: any): void {
    this.mustone = false;
    this.gtone = false;
    this.pageBody = new PageBody(1, 10);
    if (Number(value) === -1) {
      this.Request();
      this.downWindow = true;
    } else {
      this.downWindow = false;
      this.G_id = Number(value);
      this.RequestCamera(this.G_id);
    }
  }

}
