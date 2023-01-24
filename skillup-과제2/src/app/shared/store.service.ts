import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChartItem } from './chart-data.service';
import { ClickedStudyService } from './clicked-study.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  emphasisData = new Subject<ChartItem[]>();
  public emphasisData$ = this.emphasisData.asObservable();

  constructor(private css:ClickedStudyService) {
    css.storeData$.subscribe(d=>{
      console.log('store',d);
    });
  }
}
