import { Component, OnInit } from '@angular/core';
import {NodeEvent, NodeMenuItemAction, TreeModel} from 'ng2-tree';
import {DomSanitizer} from '@angular/platform-browser';
import {ReqService} from '../../../shared/req.service';
import {PageBody} from '../../../shared/global.service';


@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.css']
})
export class VideoWindowComponent implements OnInit {
  public videoUrl1: string;
  public videoUrl2: string;
  public videoUrl3: string;
  public videoUrl4: string;
  public videoLocation1: any;
  public videoLocation2: any;
  public videoLocation3: any;
  public videoLocation4: any;
  public pageBody: PageBody;
  /**************  ng2-tree ************/
  public tree: TreeModel;
  constructor(
    private req: ReqService,
    public html: DomSanitizer
  ) { }
  ngOnInit() {
    this.pageBody = new PageBody(1, 4);
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
          { action: NodeMenuItemAction.Custom, name: 'Foo', cssClass: 'fa fa-arrow-right' },
          { action: NodeMenuItemAction.Custom, name: 'Bar', cssClass: 'fa fa-arrow-right' },
          { action: NodeMenuItemAction.Custom, name: 'Baz', cssClass: 'fa fa-arrow-right'}
        ]
      },
      children: [
        {
          value: '1号监视窗口',
          children: [
            // {value: '1楼楼梯口', place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
            // {value: '1楼楼梯口', place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
            // {value: '1楼楼梯口', place: '1', url: 'rtsp://admin:12345@58.42.229.135:33335/Streaming/Channels/102?transportmode-unicast'},
          ]
        },
        {
          value: '2号监视窗口',
          settings: {
            static: true,
          },
          children: []
        },
        {
          value: '3号监视窗口',
          settings: {
            static: true,
          },
          children: []
        },
        {
          value: '4号监视窗口',
          settings: {
            static: true,
          },
          children: []
        },
      ]
    };
    this.Request();
  }
  public logEvent(e: NodeEvent): void {
    let videOPlace = e.node.node.place;
    if (videOPlace === '1') {
      console.log(e.node.node.value);
      this.videoLocation1 = e.node.node.value;
      this.videoUrl1 = e.node.node.url;
      document.querySelector('#window1').innerHTML = this.addHtmlVideo1(e.node.node.url);
    } else if (videOPlace === '2') {
      this.videoLocation2 = e.node.node.value;
      document.querySelector('#window2').innerHTML = this.addHtmlVideo1(e.node.node.url);
      this.videoUrl2 = e.node.node.url;
    }  else if (videOPlace === '3') {
      this.videoLocation3 = e.node.node.value;
      this.videoUrl3 = e.node.node.url;
      document.querySelector('#window3').innerHTML = this.addHtmlVideo1(e.node.node.url);
    } else {
      this.videoLocation4 = e.node.node.value;
      this.videoUrl4 = e.node.node.url;
      document.querySelector('#window4').innerHTML = this.addHtmlVideo1(e.node.node.url);
    }
  }
  public addHtmlVideo1(url: string): string {
    let html = `<object type='application/x-vlc-plugin' id='' width="100%" height="100%" events='True'
                pluginspage="http://www.videolan.org"
                codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">
                <param name='mrl' value='${url}' />
                <param name='volume' value='50' />
                <param name='autoplay' value='true' />
                <param name='loop' value='false' />
                <param value="transparent" name="wmode">
                <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin" width="100%" height="100%"
                       pluginspage="http://www.videolan.org" allownetworking="internal" allowscriptaccess="always" quality="high"
                       src="${url}">
            </object>
`;
    return html;
  }

  public Request(): void {
    this.req.findVideomanager(this.parameterSerialization(this.pageBody))
      .subscribe((gvalue) => {
        for (let i = 0; i < gvalue.values.number; ++i) {
          this.req.findVideos('gid=' + gvalue.values.datas[i].id + '&page=1' + '&row=1')
            .subscribe(cvalue => {
              this.req.findVideos('gid=' + gvalue.values.datas[i].id + '&page=' + this.pageBody.page + '&row=' + cvalue.values.number)
                .subscribe(ccvalue => {
                  let value = ccvalue.values.datas;
                  for (let j = 0; j < cvalue.values.number; ++j) {
                    let cc = {
                      value: value[j].name,
                      place: String(i + 1),
                      url: value[j].outer_url
                    };
                    this.tree.children[i].children.push(cc);
                  }
                  console.log(this.tree);
                  console.log('--------------------------------------------------------------------');
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
  constructor (
    public id: string,
    public name: string,
    public place: string,
    public url: string
  ) {}
}
