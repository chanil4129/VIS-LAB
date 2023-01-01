import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KarmaTestComponent } from './karma-test/karma-test.component';

const routes: Routes = [
  {path: '',component:KarmaTestComponent} //추가
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
