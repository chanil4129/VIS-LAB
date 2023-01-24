import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from './data.service';

export interface ChartItem {
  Study: string;
  Year: number;
  patients: string;
  Type: "A" | "B" | "C" | "D";
  Oxaliplatin: string;
  Irinotecan:string;
  push: string;
  civ: string;
}

export enum typeMap { A, B, C, D }

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private chartData = new Subject<ChartItem[]>();
  public chartData$ = this.chartData.asObservable();

  private keyIter = ['patients', 'Oxaliplatin', "Irinotecan", 'push', 'civ'];

  constructor(private dataService: DataService) {
    this.dataService.loadTableInfo()
      .subscribe((data) => {
        const chartData = data.map<ChartItem>(val => {
          this.removeAfterBlank(val);
          return {
            Study: val.Study,
            Year: val.Year,
            patients: val.patients,
            Oxaliplatin: val.Oxaliplatin,
            Irinotecan: val.Irinotecan,
            push: val.push,
            civ: val.civ,
            Type: val.Type
          }
        });
        this.chartData.next(chartData);
      });
  }

  removeAfterBlank(object: ChartItem) {
    this.keyIter.forEach((key) => {
      const str: string = object[key];
      if (str.length > 4) object[key] = str.split(' ')[0];
    });
  }
}
