import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-karma-test-basic',
  templateUrl: './karma-test-basic.component.html',
  styleUrls: ['./karma-test-basic.component.scss']
})
export class KarmaTestBasicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fun(): string {
    return 'hello world';
  }
}
