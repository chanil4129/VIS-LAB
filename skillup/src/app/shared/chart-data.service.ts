import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService, TableItem } from './data.service';

export interface ChartItem extends TableItem {
  Value?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private chartData = new Subject<(ChartItem | TableItem)[]>();
  public chartData$ = this.chartData.asObservable();
  
  constructor(private dataService: DataService) { 
    this.dataService.loadTableInfo()
      .subscribe((data) => {
        // #1. 데이터 전처리하기
        console.log({data});
        data.forEach((d)=>{
          d.Year=Number(d.Year);
          d.patients=d.patients.split(' ')[0];
          d.Oxaliplatin=d.Oxaliplatin.split(' ')[0];
          d.Irinotecan=d.Irinotecan.split(' ')[0];
          d.civ=d.civ.split(' ')[0];
          d.push=d.push.split(' ')[0];
        });
        console.log({data});

        // #2. 전처리한 데이터 보내기
        this.chartData.next(data/* 보낼 데이터 */);
      });
  }
}
