import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavList, NavListChild} from '../../shared/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output()
  public BL: EventEmitter<boolean> =  new EventEmitter();
  public navLists: NavList[] = [
    new NavList('首页', 'main', 'fa fa-university', true, [] , true),
    new NavList('组织管理', '', 'fa fa-laptop', false, [
      new NavListChild('组织管理', false, 'department/organization-management'),
      new NavListChild('部门管理', false, 'department/organization')
    ] , true),
    new NavList('设备管理', '', 'fa fa-th-large', false, [
      new NavListChild('生产线', false, 'device/proline'),
      new NavListChild('模块数据', false, 'device/prolicm'),
      new NavListChild('设备数据', false, 'device/proldata'),
      new NavListChild('传感器', false, 'device/prolsen'),
    ] , true),
    new NavList('权限管理', '', 'fa fa-outdent', false, [
      new NavListChild('模块信息', false, 'jurisdiction/modalma'),
      new NavListChild('按钮管理', false, 'jurisdiction/btnma'),
      new NavListChild('接口信息', false, 'jurisdiction/interma'),
      new NavListChild('用户权限', false, 'jurisdiction/userma')
    ] , true),
    new NavList('移动端管理', 'mobile', 'fa fa-sitemap', false, [] , true),
    new NavList('工艺管理', '', 'fa fa-hdd-o', false, [
      new NavListChild('默认工艺包', false, 'technology/amend'),
      new NavListChild('温度工艺包', false, 'technology/temperature')
    ] , true),
    new NavList('用户管理', 'users', 'fa fa-graduation-cap', false, [] , true),
    new NavList('视频管理', '', 'fa fa-video-camera', false, [
      new NavListChild('监控窗口', false, 'videos/videowin'),
      new NavListChild('视频管理', false, 'videos/videoman')
    ] , true),
    new NavList('设备巡检', 'deviceInspection', 'fa fa-bug', false, [] , true)
  ];
  public slidinghight: number;
  public slidingTop: number;
  public difulHeight: number;
  constructor(
    private router: Router
    ) {}
  ngOnInit() {
  }
  onMouseleave() {
    this.slidingTop = -120;
  }
  mainLiMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
  }
  mainLiClick(mainul, element, list) {
    if (list.children.length === 0) {
      this.BL.emit(true);
    }
    if (list.routers) {
      this.router.navigate(['/home/' + list.routers]);
    }
    this.difulHeight = 0;
    if (!(list.children.length > 0)) {
      // this.router.navigate(['/home']);
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      this.navLists.forEach((item) => {
        item.open = true;
        item.clsstate = false;
        // if (item.children) {
        //   console.log('hello');
        // }
        item.children.forEach((itemchild) => {
          itemchild.setState = false;
        });
      });
      list.clsstate = true;
      return;
    }
    if (element.offsetHeight === 0) {
      this.navLists.forEach((item) => {
        item.open = true;
      });
      list.open = false;
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      for (let i = 0; i < list.children.length; i++) {
        this.difulHeight = this.difulHeight + 40;
      }
      element.style.height = this.difulHeight.toString() + 'px';
    } else {
      list.open = true;
      this.difulHeight = 0;
      element.style.height = this.difulHeight.toString() + 'px';
      setTimeout(() => {
        list.open = true;
      }, 200);
    }
  }
  menuliMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
    element.setState = true;
  }
  menuliClick(element) {
    this.navLists.forEach((item) => {
      item.clsstate = false;
      item.children.forEach((itemchild) => {
        itemchild.setState = false;
      });
    });
    if (!element.setState) {
      this.BL.emit(true);
    }
    element.setState = true;
  }
}
