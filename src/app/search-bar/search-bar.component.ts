import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();
 
  constructor(private userService: UserService) { }
 

//，SearchBarComponent 類別實現了 OnInit 介面，因此必須實現 ngOnInit 方法。
//就算沒有內容為了滿足接口需求還是要放一個空的 ngOnInit()
  ngOnInit(): void {
  }
 
  searchUsers(): void {
     this.search.emit(this.searchTerm);
  }
  
 }
 