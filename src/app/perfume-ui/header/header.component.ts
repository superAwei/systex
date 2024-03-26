import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 isShowMenu:boolean = false; //預設先關閉選單

 toggleMenu(){
  this.isShowMenu = !this.isShowMenu; //切換選單的顯示狀態
 }
}
