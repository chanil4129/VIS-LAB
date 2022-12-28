import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BubbleChartComponent } from './charts/bubble-chart/bubble-chart.component';
import { DivergingBarChartComponent } from './charts/diverging-bar-chart/diverging-bar-chart.component';
import { WorkspaceComponent } from './workspace/workspace.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BubbleChartComponent,
    DivergingBarChartComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatGridListModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
