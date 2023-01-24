import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartDataService, ChartItem } from '../shared/chart-data.service';
import { TableItem } from '../shared/data.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  selection1: ChartItem;
  selection2: ChartItem;
  dataArray : ChartItem[];
  chartData$: Observable<ChartItem[]>;
  A_type : ChartItem[];
  B_type : ChartItem[];
  C_type : ChartItem[];
  D_type : ChartItem[];
  drugList=['Oxaliplatin','Irinotecan','push','civ'];

  constructor(private cds: ChartDataService) { 
    this.chartData$ = this.cds.chartData$;
    // #3. 전처리한 데이터 받아와 사용
    this.cds.chartData$.subscribe(res => {
      this.A_type = [];
      this.B_type = [];
      this.C_type = [];
      this.D_type = [];
      console.log({res});
      this.dataArray=res
      res.forEach(d => {
        if(d.Type=='A') this.A_type.push(d)
        if(d.Type=='B') this.B_type.push(d)
        if(d.Type=='C') this.C_type.push(d)
        if(d.Type=='D') this.D_type.push(d)
      });
      // console.log(this.B_type);
    })
  }

  ngOnInit(): void {
  }

  event(arg) {
    console.log(`selection1 : `,{selection1: arg})
    this.selection2 = this.dataArray.find(v => (v.Study == this.selection1.Study) && (v.Type != this.selection1.Type))
  }
}
