import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartItem } from 'src/app/shared/chart-data.service';
import { TableItem } from 'src/app/shared/data.service';

@Component({
  selector: 'app-diverging-bar-chart',
  templateUrl: './diverging-bar-chart.component.html',
  styleUrls: ['./diverging-bar-chart.component.css']
})
export class DivergingBarChartComponent implements OnInit, OnChanges {
  @Input() study: (TableItem | ChartItem)[];
  @ViewChild('rootsvg') rootsvg: ElementRef<SVGElement>;

  margin = {top: 20, right: 30, bottom: 40, left: 90};
  width = 460 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;
  drug=['Oxaliplatin','Irinotecan','push','civ'];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['study'].currentValue) {
      // @Input()으로 받은 study의 값이 변경되면 실행할 코드
      console.log("input changes:", this.study);
      this.render();
    }
  }

  ngOnInit(): void {
  }

  render() {
    const svg = d3.select(this.rootsvg.nativeElement)
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, this.width]);
    svg.append("g")
      .attr("transform", `translate(0, ${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleBand()
      .domain(this.drug)
      .range([0, this.height])
      .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
      .data(this.study)
      .join("rect")
      .attr("x", x(0))
      // .attr("y", d => y(d.Oxaliplatin))
      // .attr("width", d => x(d))
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2")
  }
}
