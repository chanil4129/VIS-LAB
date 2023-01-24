import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartDataService, ChartItem, typeMap } from '../shared/chart-data.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit{
  selection1: ChartItem;
  selection2: ChartItem;
  dataArray: ChartItem[][];
  chartData$: Observable<ChartItem[]>;

  drugList = ['Oxaliplatin','Irinotecan','push','civ'];
  constructor(private cds: ChartDataService) {
    this.chartData$ = this.cds.chartData$;

    // #3. 전처리한 데이터 받아와 사용
    this.cds.chartData$.subscribe(res => {
      this.dataArray = res.reduce((acc, val) => {
        acc[typeMap[val.Type]].push(val);
        return acc;
      }, [[],[],[],[]]);
      console.log(this.dataArray);
    });
  }

  ngOnInit(): void {
  }

  findAnotherStudy(arg: ChartItem) {
    const index = typeMap[arg.Type];
    const offset = index % 2 ? -1 : 1;
    this.selection2 = this.dataArray[index + offset].find(v => v.Study === arg.Study);
  }

  toUpperCase(str: string) {
    return str.toUpperCase();
  }
}
