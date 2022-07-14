import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  templateUrl: './ng-if.component.html',
  styleUrls: ['./ng-if.component.scss']
})
export class NgIfComponent {
  isShow = true;
  click_button(){
    if(this.isShow==true)
      return this.isShow=false;
    else
      return this.isShow=true;
  }

  getnotification() {
    let notification
    if (this.isShow == true)
      return notification = 'Hide';
    else
      return notification = 'Show';
  }

}
