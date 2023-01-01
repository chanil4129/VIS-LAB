import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-karma-test',
  templateUrl: './karma-test.component.html',
  styleUrls: ['./karma-test.component.scss']
})
export class KarmaTestComponent implements OnInit {
  users : any;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.all().subscribe(res => {
      this.users = res;
    });
  }

}
