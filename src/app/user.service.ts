
import { Injectable } from '@angular/core'; //引用注入服務

@Injectable({
  //告訴 Angular，這個服務可以被注入到任何需要它的地方。
  //providedIn: 'root' 表示 Angular 將在根模組中提供此服務的單一實例。
  providedIn: 'root'
})

//把這個資料導出去給別的元件使用
export class UserService {
  getOriginalUsers() {
    throw new Error('Method not implemented.');
  }
  private users: any[] = [
    { name: 'email', country: '彰化', salary: 1000, email: 'user1@example.com' },
    { name: 'awei', country: '新莊', salary: 2000, email: 'user2@example.com' },
    { name: 'jack', country: '大陸', salary: 3000, email: 'user3@example.com' },
    { name: 'marry', country: '台中', salary: 1000, email: 'user4@example.com' },
    { name: 'john', country: '高雄', salary: 2000, email: 'user5@example.com' },
    { name: 'Alex', country: '北京', salary: 3000, email: 'user6@example.com' }
  ];
 

  //UserService 的建構函式，目前沒有特別的邏輯，但如果有初始化服務時需要的操作，可以在這裡執行。
  constructor() { }

  //先得到所有使用者陣列資料
  getUsers(): any[] {
    return this.users;
  }

  //把新的使用者資料添加到 users 陣列中。
  addUser(user: any): void {
    this.users.push(user);
  }


  //編輯使用者資料，而且抓到索引位置只更新這個索引位置的資料
  updateUser(index: number, user: any): void {
    this.users[index] = user;
  }

  //舊的刪除索引位置的使用者
  deleteUser(index: number): void {
    this.users.splice(index, 1);
  }

  // 驗證信箱是否重複
  isEmailExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

}
