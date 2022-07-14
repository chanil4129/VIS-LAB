import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntersectionComponent } from './intersection/intersection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { MaterialModule } from './material/material.module';
import { MaterialTutorialComponent } from './material-tutorial/material-tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    IntersectionComponent,
    AutocompleteComponent,
    ToolbarComponent,
    MaterialTutorialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
