import { Injectable } from '@angular/core';
import { map } from 'd3';
import { Observable,Subject } from 'rxjs';
import { ChartDataService, ChartItem, typeMap } from './chart-data.service';

@Injectable({
  providedIn: 'root'
})
export class ClickedStudyService {
  private study=new Set<string>;
  study_data=new Subject<string>;
  selectedData$=new Subject<Set<string>>;

  mo_data=new Subject<string>;
  mo_data$=new Subject<string>;
  
  constructor() {
    this.study_data.subscribe((d)=>{
      this.study.has(d)?this.study.delete(d):this.study.add(d);
      this.selectedData$.next(this.study);
    })
    this.mo_data.subscribe((d)=>{
      this.mo_data$.next(d);
    })
  }
}
