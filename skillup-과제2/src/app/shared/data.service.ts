import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {parse, ParseResult} from 'papaparse';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ChartItem } from './chart-data.service';

export interface TableItem extends ChartItem{
  Country: string;
  Id: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  id = 0;
  constructor(private http: HttpClient) {}

  private parseCSV(text: any): ParseResult<any> {
    return parse(text, { header: true });
  }

  loadTableInfo(): Observable<TableItem[]> {
    return this.http
      .get('assets/' + 'prospective' + '.csv', { responseType: 'text' })
      .pipe(
        map((r) => this.parseCSV(r).data),
        map((r) => r.map((e): TableItem => {
            this.id++;
            return {
              Study: e.Study,
              Year: e.Year,
              Country: e.Country,
              Type: e.Type,
              patients: e.Patients,
              Oxaliplatin: e.Oxaliplatin,
              Irinotecan: e.Irinotecan,
              push: e.push,
              civ: e.civ,
              Id: this.id,
            };
          })
        )
      );
  }
}
