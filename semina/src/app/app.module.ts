import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectiveComponent } from './directive/directive.component';
import { TextBlueDirective } from './text-blue/text-blue.directive';
import { NgClassComponent } from './ng-class/ng-class.component';
import { NgStyleComponent } from './ng-style/ng-style.component';

import { FormsModule } from '@angular/forms';
import { NgIfComponent } from './ng-if/ng-if.component';
import { NgForComponent } from './ng-for/ng-for.component';
import { NgSwitchComponent } from './ng-switch/ng-switch.component';
import { KarmaTestComponent } from './karma-test/karma-test.component';
import { KarmaTestBasicComponent } from './karma-test-basic/karma-test-basic.component';


@NgModule({
  declarations: [
    AppComponent,
    DirectiveComponent,
    TextBlueDirective,
    NgClassComponent,
    NgStyleComponent,
    NgIfComponent,
    NgForComponent,
    NgSwitchComponent,
    KarmaTestComponent,
    KarmaTestBasicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
