import { NgModule } from '@angular/core';
// 引入要切換的元件
import { RouterModule, Routes } from '@angular/router';
import { PerfumeUIComponent } from './perfume-ui/perfume-ui.component';
import { UserlistComponent } from './userlist/userlist.component';

// 要使用路由一定要建立這個檔案，建立路由陣列 
export const routes: Routes = [
  {path:'demo',component:UserlistComponent},
  {path:'perfume',component:PerfumeUIComponent},
  // {path:'',component:PerfumeUIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
