import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
 selector: 'app-userlist',
 templateUrl: './userlist.component.html',
 styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
 users: any[] = [];
 filteredUsers:any[]=[]; // 新增一個陣列來存儲過濾後的使用者
 showAddUserForm: boolean = false;
 userForm!: FormGroup; // 明確指定型別為 FormGroup
 isEditing:boolean = false;
 editingIndex:number | null = null;
 totalSalary:number = 0;

 constructor() {}


//  初始化
 ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      country: new FormControl(''),
      salary: new FormControl(''),
      email: new FormControl('')
    });
    this.calculateTotalSalary();
 }
//  新增使用者
 addUser() {
    this.showAddUserForm = true;
    this.isEditing = false; // 新增使用者模式
    this.editingIndex = null; // 重置編輯索引
 }

//  送出使用者
 submitAddUserForm() {
    const user = this.userForm.value;
    this.users.push(user);
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


updateUser() {
  if (this.editingIndex !== null) {
      this.users[this.editingIndex] = this.userForm.value; // 使用編輯索引來更新使用者資料
      this.showAddUserForm = false;
      this.userForm.reset();
      this.isEditing = false;
      this.editingIndex = null; // 重置編輯索引
      this.calculateTotalSalary(); // 重新計算總薪水
  }
}

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
