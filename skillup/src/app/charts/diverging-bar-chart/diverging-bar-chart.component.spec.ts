import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivergingBarChartComponent } from './diverging-bar-chart.component';

describe('DivergingBarChartComponent', () => {
  let component: DivergingBarChartComponent;
  let fixture: ComponentFixture<DivergingBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivergingBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivergingBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
