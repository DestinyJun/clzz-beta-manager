import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NodeEvent, NodeMenuItemAction, TreeModel} from 'ng2-tree';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {PageBody} from '../../../shared/global.service';
import {ReqService} from '../../../shared/req.service';


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
  /**************  ng2-tree ************/
  public tree: TreeModel;

  constructor(private http: HttpClient,
              public html: DomSanitizer,
              private req: ReqService) {
  }

  ngOnInit() {
    // 初始化四个监视窗口的数据，为空
    this.c1 = [];
    this.c2 = [];
    this.c3 = [];
    this.c4 = [];
    this.pageBody = new PageBody(1, 4);
    this.videoUrl1 = `${null}`;
    this.videoUrl2 = `${null}`;
    this.videoUrl3 = `${null}`;
    this.videoUrl4 = `${null}`;
    this.Request();
  }

  public logEvent(e: NodeEvent): void {
    // console.log(e.node.node.outer_url);
    // console.log(e.node.node.value);
    if (e.node.parent.positionInParent === 0) {
      this.videoLocation1 = e.node.node.value;
      // this.videoUrl1 = `${e.node.node.outer_url}`;
      document.querySelector('#window1').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    } else if (e.node.parent.positionInParent === 1) {
      this.videoLocation2 = e.node.node.value;
      // this.videoUrl2 = e.node.node.outer_url;
      document.querySelector('#window2').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    } else if (e.node.parent.positionInParent === 2) {
      this.videoLocation3 = e.node.node.value;
      // this.videoUrl3 = e.node.node.outer_url;
      document.querySelector('#window3').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    } else {
      this.videoLocation4 = e.node.node.value;
      // this.videoUrl4 = e.node.node.outer_url;
      document.querySelector('#window4').innerHTML = this.addHtmlVideo1(e.node.node.outer_url);
    }
  }

  public addHtmlVideo1(url: string): string {
    const html = `<object type='application/x-vlc-plugin' id='' width="100%" height="100%" events='True'
                pluginspage="http://www.videolan.org"
                codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">
                <param name='mrl' value='${url}' />
                <param name='volume' value='50' />
                <param name='autoplay' value='true' />
                <param name='loop' value='false' />
                <param value="transparent" name="wmode">
                <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin" width="100%" height="100%"
                       pluginspage="http://www.videolan.org" allownetworking="internal" allowscriptaccess="always" quality="high"
                       src='${url}'>
            </object>
`;
    return html;
  }

  public Request(): void {
    // 发送请求拿到 摄像机组的id, 用来获取该组的全部摄像机
    this.req.findVideomanager(this.parameterSerialization(this.pageBody))
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
                    // value = JSON.stringify(value).replace('name', 'value');
                    // value = JSON.parse(value);
                    switch (index % 4) {
                      case 0:
                        this.c1.push(value);
                        break;
                      case 1:
                        this.c2.push(value);
                        break;
                      case 2:
                        this.c3.push(value);
                        break;
                      case 3:
                        this.c4.push(value);
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
                  // 初始化每个摄像机位置的url,如果摄像机窗口里面没有摄像机，则为null
                  this.videoUrl1 = `${this.c1.length === 0 ? null : this.c1[0].outer_url}`;
                  this.videoUrl2 = `${this.c2.length === 0 ? null : this.c2[0].outer_url}`;
                  this.videoUrl3 = `${this.c3.length === 0 ? null : this.c3[0].outer_url}`;
                  this.videoUrl4 = `${this.c4.length === 0 ? null : this.c4[0].outer_url}`;

                  // 初始化摄像机窗口的名称
                  const tooltip = '该窗口没有摄像机';
                  this.videoLocation1 = `${this.c1.length === 0 ? tooltip : this.c1[0].value}`;
                  this.videoLocation2 = `${this.c2.length === 0 ? tooltip : this.c2[0].value}`;
                  this.videoLocation3 = `${this.c3.length === 0 ? tooltip : this.c3[0].value}`;
                  this.videoLocation4 = `${this.c4.length === 0 ? tooltip : this.c4[0].value}`;
                });
            });
        }
      });
  }

  // 翻页参数序列化
  public parameterSerialization(obj: PageBody): string {
    let result: string;
    for (const prop in this.pageBody) {
      if (this.pageBody.hasOwnProperty(prop)) {
        if (result) {
          result = result + prop + '=' + this.pageBody[prop] + '&';
        } else {
          result = prop + '=' + this.pageBody[prop] + '&';
        }
      }
    }
    return result;
  }
}

export class VideoChildrenList {
  constructor(public id: string,
              public name: string,
              public place: string,
              public url: string) {
  }
}
