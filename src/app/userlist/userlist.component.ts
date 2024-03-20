// import { Component, OnInit } from '@angular/core';
// // 引入 reactiveFormsModule 元件
// import { FormGroup, FormControl } from '@angular/forms';



// @Component({
//  selector: 'app-userlist',
//  templateUrl: './userlist.component.html',
//  styleUrls: ['./userlist.component.css']
// })
// export class UserlistComponent implements OnInit {
//  users: any[] = [
//    { name: '小淇', country: '彰化', salary: 1000, email: 'user1@example.com' },
//    { name: '阿偉', country: '新莊', salary: 2000, email: 'user2@example.com' },
//    { name: '67', country: '大陸', salary: 3000, email: 'user3@example.com' }
//  ];
//  showAddUserForm: boolean = false; //定義一個布林值變數來控制是否顯示新增使用者的表單
//  userForm!: FormGroup; //定義一個 FormGroup 變數來存儲使用者表單的資料，使用 ! 表示這個變數一定會被初始化
//  isEditing:boolean = false; //定義一個布林值變數來標記是否正在編輯使用者資料
//  editingIndex:number | null = null;
//  totalSalary:number = 0;

//  constructor() {}


// //當組件初始化時會執行的方法
//  ngOnInit() {
//     //使用 reactiveFormModule
//     this.userForm = new FormGroup({ // 初始化使用者表單，並設定每個欄位的初始值為空字串
//       name: new FormControl(''),
//       country: new FormControl(''),
//       salary: new FormControl(''),
//       email: new FormControl('')
//     });
//     this.calculateTotalSalary(); // 計算所有使用者的總薪水
//  }
// //  新增使用者
//  addUser() {
//     this.showAddUserForm = true; // 顯示新增使用者的表單
//     this.isEditing = false; // 新增使用者模式
//     this.editingIndex = null; // 重置編輯索引
//  }

// //  送出使用者
//  submitAddUserForm() { // 提交新增使用者表單的方法
//      const user = this.userForm.value;
//     this.users.push(user); // 將新使用者加入到 users 陣列中
//     this.showAddUserForm = false;
//     this.userForm.reset(); // 重置表單
//     this.isEditing = false; // 重置編輯模式
//     this.editingIndex = null; // 重置編輯索引
//     this.calculateTotalSalary(); // 重新計算總薪水

//  }

// //  編輯使用者
//  editUser(index: number) {
//     this.userForm.setValue(this.users[index]);
//     this.showAddUserForm = true;
//     this.isEditing = true; // 編輯模式
//     this.editingIndex = index;

//  }

// // 更新使用者資料的方法
//  updateUser() { 
//   if (this.editingIndex !== null) { // 如果有正在編輯的使用者
//        this.users[this.editingIndex] = this.userForm.value; // 使用編輯索引來更新使用者資料
//        this.showAddUserForm = false; // 隱藏表單
//        this.userForm.reset(); // 重置表單的值
//        this.isEditing = false; // 重置編輯模式
//        this.editingIndex = null; // 重置編輯索引
//        this.calculateTotalSalary(); // 重新計算總薪水
//   }
//   }

// // 刪除使用者的方法
//  deleteUser(index: number) {
//     this.users.splice(index, 1);
//  }

// //  計算總薪水
//  calculateTotalSalary() {
//   this.totalSalary = this.users.reduce((acc, user) => acc + user.salary, 0);
// }



// // 顯示所有使用者
// showAllUsers() {
//   // 重新計算總薪水
//   this.calculateTotalSalary();
// }

// }

//把會使用到的模組導入
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//把共用資料也導入進來
import { UserService } from '../user.service';

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


  //類別的建構函式，用於初始化類別的實例。在這裡來注入了 UserService 服務作為這個元件的資料來源或叫做依賴。
  constructor(private userService: UserService) { }


  //ngOnInit() 方法是 Angular 的生命周期鉤子之一，在元件初始化後立即調用。在這裡，我們初始化使用者表單，然後載入使用者資料。
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      country: new FormControl(''),
      salary: new FormControl(''),
      email: new FormControl('')
    });
    this.loadUsers();
  }

  //loadUsers() 方法用於從 UserService 中獲取使用者資料並更新到 users 變數中，然後計算總薪水。
  loadUsers() {
   //  把從 userService 用 getUsers()取得的資料丟到 userService 中
    this.users = this.userService.getUsers();
    this.calculateTotalSalary();
  }


  //addUser() 方法用於顯示新增使用者表單，並將標誌設置為新增模式。
  addUser() {
    this.showAddUserForm = true;
    this.isEditing = false;
    this.editingIndex = null;
  }

  //submitAddUserForm() 方法用於提交新增使用者表單，將新使用者資料添加到資料庫中，然後重新載入使用者資料。
  submitAddUserForm() {
    const user = this.userForm.value;
    this.userService.addUser(user);
    this.showAddUserForm = false;
    this.userForm.reset();
    this.loadUsers();
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

