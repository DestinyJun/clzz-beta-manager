import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NodeEvent, NodeMenuItemAction, TreeModel} from 'ng2-tree';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {PageBody} from '../../../shared/global.service';
import {ReqService} from '../../../shared/req.service';
import {CommonfunService} from '../../../shared/commonfun.service';


@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.css']
})
export class VideoWindowComponent implements OnInit {
  public videoUrl1: any;
  public videoUrl2: any;
  public videoUrl3: any;
  public videoUrl4: any;
  public videoLocation1: any;
  public videoLocation2: any;
  public videoLocation3: any;
  public videoLocation4: any;
  public pageBody: PageBody;
  public c1: Array<any>;
  public c2: Array<any>;
  public c3: Array<any>;
  public c4: Array<any>;
  public domSanitizer: DomSanitizer;
  public treeScrollH: number;
  public catalogH: number;
  /**************  ng2-tree ************/
  public tree: TreeModel;

  constructor(
              private http: HttpClient,
              public html: DomSanitizer,
              private req: ReqService,
              private commonfun: CommonfunService
  ) {}
  ngOnInit() {
    // 初始化树的高度
    this.catalogH = window.innerHeight;
    this.treeScrollH = 0;
    // 初始化四个监视窗口的数据，为空
    this.c1 = [];
    this.c2 = [];
    this.c3 = [];
    this.c4 = [];
    this.pageBody = new PageBody(1, 4);
    // this.videoUrl1 = '';
    // this.videoUrl2 = `${null}`;
    // this.videoUrl3 = `${null}`;
    // this.videoUrl4 = `${null}`;
    this.Request();
  }
  // 控制滚动条
  public operateScroll(e): void {
    this.treeScrollH = e.clientY;
  }
  public logEvent(e: NodeEvent): void {
    if (e.node.parent.positionInParent === 0) {
      this.videoLocation1 = e.node.node.value;
      document.querySelector('#window1').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    } else if (e.node.parent.positionInParent === 1) {
      this.videoLocation2 = e.node.node.value;
      document.querySelector('#window2').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    } else if (e.node.parent.positionInParent === 2) {
      this.videoLocation3 = e.node.node.value;
      document.querySelector('#window3').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    } else {
      this.videoLocation4 = e.node.node.value;
      document.querySelector('#window4').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    }
  }

  public addHtmlVideo1(url: string): string {
    const html = `<object type='application/x-vlc-plugin' id='' style="height: 100%;width: 100%;position: absolute;visibility: visible;z-index: 1030;" events='True'
                pluginspage="http://www.videolan.org"
                codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">
                <param name='mrl' value='${url}' />
                <param name='volume' value='50' />
                <param name='autoplay' value='true' />
                <param name='loop' value='false' />
                <param value="transparent" name="wmode">
            </object>
`
    return html;
  }

  public Request(): void {
    // 发送请求拿到 摄像机组的id, 用来获取该组的全部摄像机
    this.req.findVideomanager(this.commonfun.parameterSerialization(this.pageBody))
      .subscribe((gvalue) => {
        for (let i = 0; i < gvalue.values.number; ++i) {
          // 发送请求拿到摄像机组的摄像机数量
          this.req.findVideos('gid=' + gvalue.values.datas[i].id + '&page=1' + '&row=1')
            .subscribe(cvalue => {
              this.req.findVideos('gid=' + gvalue.values.datas[i].id + '&page=' + this.pageBody.page + '&row=' + cvalue.values.number)
                .subscribe(ccvalue => {
                  // 用 values  拿到该组全部的摄像机
                  const values = ccvalue.values.datas;
                  // console.log(values);
                  values.map((value, index) => {
                    switch (index % 4) {
                      case 0: this.c1.push(value);
                               break;
                      case 1: this.c2.push(value);
                               break;
                      case 2: this.c3.push(value);
                               break;
                      case 3: this.c4.push(value);
                    }
                  });
                  this.tree = {
                    value: '彩铝智能制造视频监控平台',
                    settings: {
                      static: true, // 禁止拖动以及右键删除修改菜单
                      isCollapsedOnInit: true, // 设置隐藏与展开
                      leftMenu: false, // 左菜单栏
                      cssClasses: {
                        expanded: 'fa fa-caret-down',
                        collapsed: 'fa fa-caret-right',
                        leaf: 'fa',
                        empty: 'fa fa-caret-right disabled'
                      },
                      templates: {
                        node: '<i class="fa fa-folder-o"></i>',
                        leaf: '<i class="fa fa-file-o"></i>',
                        leftMenu: '<i class="fa fa-navicon"></i>'
                      },
                      menuItems: [
                        {action: NodeMenuItemAction.Custom, name: 'Foo', cssClass: 'fa fa-arrow-right'},
                        {action: NodeMenuItemAction.Custom, name: 'Bar', cssClass: 'fa fa-arrow-right'},
                        {action: NodeMenuItemAction.Custom, name: 'Baz', cssClass: 'fa fa-arrow-right'}
                      ]
                    },
                    children: [
                      {
                        value: '1号监视窗口',
                        children: this.c1
                      },
                      {
                        value: '2号监视窗口',
                        children: this.c2
                      },
                      {
                        value: '3号监视窗口',
                        children: this.c3
                      },
                      {
                        value: '4号监视窗口',
                        children: this.c4
                      },
                    ]
                  };
                });
            });
        }
      });
  }
}

export class VideoChildrenList {
  constructor(public id: string,
              public name: string,
              public place: string,
              public url: string) {
  }
}
