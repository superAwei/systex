//把會使用到的模組導入
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//把共用資料也導入進來
import { UserService } from '../user.service';
;


// 建立元件
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

// 把元件分享出去
//implements OnInit 表示這個類別實現了 OnInit 介面，因此它必須實作 ngOnInit() 方法。
//宣告了 users、showAddUserForm、userForm、isEditing、editingIndex 和 totalSalary 
export class UserlistComponent implements OnInit {
  users: any[] = [];   //用於存儲使用者資料
  showAddUserForm: boolean = false;  //控制新增使用者表單的顯示
  userForm!: FormGroup;//存儲使用者表單的資料
  isEditing: boolean = false; //標記是否正在編輯使用者
  editingIndex: number | null = null; //、編輯的使用者索引
  totalSalary: number = 0; //計算總薪水
  searchTerm:string = '' //新增搜尋關鍵字變數


  //類別的建構函式，用於初始化類別的實例。在這裡來注入了 UserService 服務作為這個元件的資料來源或叫做依賴。
  constructor(private userService: UserService,) { }


  //ngOnInit() 方法是 Angular 的生命周期鉤子之一，在元件初始化後立即調用。在這裡，我們初始化使用者表單，然後載入使用者資料。
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),// 添加必填驗證器
      country: new FormControl('',Validators.required),// 添加必填驗證器
      salary: new FormControl('',[Validators.required, Validators.min(1)]),// 添加必填和最小值驗證器
      email: new FormControl('',[Validators.required, Validators.email])// 添加必填和 email 格式驗證器
    });
    this.loadUsers();  //載入使用者資料
  }

  //loadUsers() 方法用於從 UserService 中獲取使用者資料並更新到 users 變數中，然後計算總薪水。
  loadUsers() {
   //  把從 userService 用 getUsers()取得的資料丟到 userService 中
    this.users = this.userService.getUsers();
    this.calculateTotalSalary();
  }




  // 新增搜尋使用者方法
  searchUsers(searchTerm:string):void {
    // 新增這段
     // 將搜索詞保存在屬性中以供使用
  // this.searchTerm = searchTerm;
   if (searchTerm.trim() === '') {
     this.loadUsers(); // 如果搜尋關鍵字為空，載入所有使用者
   } else {
     this.users = this.userService.getUsers().filter(user =>
       user.name.toLowerCase().includes(searchTerm.toLowerCase()) // 使用姓名進行大小寫不敏感的部分匹配
     );
     this.calculateTotalSalary(); // 重新計算總薪水
   }
 }
 
  //addUser() 方法用於顯示新增使用者表單，並將標誌設置為新增模式。
  addUser() {
    this.showAddUserForm = true;
    this.isEditing = false;
    this.editingIndex = null;
    this.userForm.reset(); //重設表單這樣就可以清空所有資料呈現一個全新的表單
  }

  // 在 addUser()、updateUser() 方法中對用戶輸入的值進行清理，避免潛在的 HTML 注入

  submitAddUserForm() {
    const user = this.userForm.value;
    if (this.userService.isEmailExists(user.email)) { // Check if email already exists
      alert('哈哈！這 email 被搶走了！再試一個吧！');
    } else {
      this.userService.addUser(user);
      this.showAddUserForm = false;
      this.userForm.reset();
      this.loadUsers();
    }
  }

  //editUser() 方法用於將選定的使用者資料填入編輯表單中，並將標誌設置為編輯模式
  editUser(index: number) {
    this.userForm.setValue(this.users[index]);
    this.showAddUserForm = true;
    this.isEditing = true;
    this.editingIndex = index;
  }

  //updateUser() 方法用於更新已編輯的使用者資料並將其保存到資料庫中，然後重新載入使用者資料。
  updateUser() {
    if (this.editingIndex !== null) {
      this.userService.updateUser(this.editingIndex, this.userForm.value);
      this.showAddUserForm = false;
      this.userForm.reset();
      this.isEditing = false;
      this.editingIndex = null;
      this.loadUsers();
    }
  }


  // 舊有的方法
  //deleteUser() 方法用於刪除指定索引位置的使用者資料後，再重新載入使用者資料。這樣做是為了保持元件中顯示的使用者清單與資料庫中的資料同步。
  
  deleteUser(index: number) {
    this.userService.deleteUser(index);
    this.loadUsers();
  }





  //calculateTotalSalary() 方法用於計算所有使用者的總薪水
  calculateTotalSalary() {
    this.totalSalary = this.users.reduce((acc, user) => acc + user.salary, 0);
  }

  showAllUsers() {
    this.loadUsers();
  }
}

