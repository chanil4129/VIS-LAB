import { Injectable } from '@angular/core';
import { map } from 'd3';
import { Observable,Subject } from 'rxjs';
import { ChartDataService, ChartItem, typeMap } from './chart-data.service';

@Injectable({
  providedIn: 'root'
})
export class ClickedStudyService {
  selectedData=new Subject<ChartItem>();
  // public selectedData$=this.selectedData.asObservable();
  storeData=new Subject<ChartItem[]>();
  public storeData$=this.storeData.asObservable();
  type:string;
  study:string;

  constructor() {
    this.selectedData.subscribe(d=>{
      console.log('data',d);
      this.type=d.Type;
      this.study=d.Study;
      const storeData=[d];
      this.storeData.next(storeData);
    });
  }
}
