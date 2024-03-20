// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class UserService {
 private users = new BehaviorSubject<any[]>([]);

 constructor() { }

 addUser(user: any) {
    const currentUsers = this.users.getValue();
    this.users.next([...currentUsers, user]);
 }

 updateUser(index: number, user: any) {
    const currentUsers = this.users.getValue();
    currentUsers[index] = user;
    this.users.next(currentUsers);
 }

 deleteUser(index: number) {
    const currentUsers = this.users.getValue();
    currentUsers.splice(index, 1);
    this.users.next(currentUsers);
 }

 getUsers() {
    return this.users.asObservable();
 }
}
