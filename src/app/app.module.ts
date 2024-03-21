import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 引用 service 共用資料
import { UserService } from './user.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
// 香水電商
import { PerfumeUIComponent } from './perfume-ui/perfume-ui.component';
import { HeaderComponent } from './perfume-ui/header/header.component';
import { FooterComponent } from './perfume-ui/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    SearchBarComponent,
    PerfumeUIComponent,
    HeaderComponent,
    FooterComponent,
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
