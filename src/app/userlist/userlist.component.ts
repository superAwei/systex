import { Component, OnInit } from '@angular/core';
// 引入 reactiveFormsModule 元件
import { FormGroup, FormControl } from '@angular/forms';

@Component({
 selector: 'app-userlist',
 templateUrl: './userlist.component.html',
 styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
 users: any[] = [];
 filteredUsers:any[]=[]; //新增一個陣列來存儲過濾後的使用者，這樣做是為了方便進行搜尋過濾
 showAddUserForm: boolean = false; //定義一個布林值變數來控制是否顯示新增使用者的表單
 userForm!: FormGroup; //定義一個 FormGroup 變數來存儲使用者表單的資料，使用 ! 表示這個變數一定會被初始化
 isEditing:boolean = false; //定義一個布林值變數來標記是否正在編輯使用者資料
 editingIndex:number | null = null;
 totalSalary:number = 0;

 constructor() {}


//當組件初始化時會執行的方法
 ngOnInit() {
    //使用 reactiveFormModule
    this.userForm = new FormGroup({ // 初始化使用者表單，並設定每個欄位的初始值為空字串
      name: new FormControl(''),
      country: new FormControl(''),
      salary: new FormControl(''),
      email: new FormControl('')
    });
    this.calculateTotalSalary(); // 計算所有使用者的總薪水
 }
//  新增使用者
 addUser() {
    this.showAddUserForm = true; // 顯示新增使用者的表單
    this.isEditing = false; // 新增使用者模式
    this.editingIndex = null; // 重置編輯索引
 }

//  送出使用者
 submitAddUserForm() { // 提交新增使用者表單的方法
     const user = this.userForm.value;
    this.users.push(user); // 將新使用者加入到 users 陣列中
    this.showAddUserForm = false;
    this.userForm.reset(); // 重置表單
    this.isEditing = false; // 重置編輯模式
    this.editingIndex = null; // 重置編輯索引
    this.calculateTotalSalary(); // 重新計算總薪水

 }

//  編輯使用者
 editUser(index: number) {
    this.userForm.setValue(this.users[index]);
    this.showAddUserForm = true;
    this.isEditing = true; // 編輯模式
    this.editingIndex = index;

 }

// 更新使用者資料的方法
 updateUser() { 
  if (this.editingIndex !== null) { // 如果有正在編輯的使用者
       this.users[this.editingIndex] = this.userForm.value; // 使用編輯索引來更新使用者資料
       this.showAddUserForm = false; // 隱藏表單
       this.userForm.reset(); // 重置表單的值
       this.isEditing = false; // 重置編輯模式
       this.editingIndex = null; // 重置編輯索引
       this.calculateTotalSalary(); // 重新計算總薪水
  }
  }

// 刪除使用者的方法
 deleteUser(index: number) {
    this.users.splice(index, 1);
 }

//  計算總薪水
 calculateTotalSalary() {
  this.totalSalary = this.users.reduce((acc, user) => acc + user.salary, 0);
}



// 顯示所有使用者
showAllUsers() {
  // 重新計算總薪水
  this.calculateTotalSalary();
}
}
