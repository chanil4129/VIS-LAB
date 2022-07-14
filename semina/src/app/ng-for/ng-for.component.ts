import { Component } from '@angular/core';

interface User {
  id: number;
  name: string
}

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.scss']
})
export class NgForComponent {
  users: User[] = [
    { id: 1, name: 'Sang-jun' },
    { id: 2, name: 'Gue-han' },
    { id: 3, name: 'Jin-wo' },
    { id: 4, name: 'Jin'},
  ];

  // user를 추가
  addUser(name: string) {
    if (name) {
      this.users.push({ id: this.getNewUserId(), name });
    }
  }

  // 추가될 user의 id를 반환
  getNewUserId(): number {
    return this.users.length ? Math.max(...this.users.map(({ id }) => id)) + 1 : 1;
  }

}
