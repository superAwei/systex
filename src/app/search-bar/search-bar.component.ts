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
 
  ngOnInit(): void {
  }
 
  searchUsers(): void {
     this.search.emit(this.searchTerm);
  }
 }
 