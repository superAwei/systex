import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 引用 service 共用資料
import { UserService } from './user.service';



@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
 
  ],
  providers: [UserService], // 將 UserService 加入 providers 中
  bootstrap: [AppComponent]
})


export class AppModule { }
