import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartItem } from 'src/app/shared/chart-data.service';
import { TableItem } from 'src/app/shared/data.service';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, OnChanges {
  @Input() data: (ChartItem | TableItem)[];
  @Input() drug: string;
  @ViewChild('rootsvg') rootsvg: ElementRef<SVGElement>;

  margin = {top: 100, right: 100, bottom: 100, left: 100};
  width = 500 - this.margin.left - this.margin.right;
  height = 420 - this.margin.top - this.margin.bottom;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      // console.log(`bubble-chart data : `,changes.data.currentValue);
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
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    // Add X axis
    const x = d3.scaleLinear()
      .domain([2009, Math.max(...this.data.map((v, i) => v.Year))]) 
                        // [2010, 2012, 2014]
                        // ...[2010, 2012, 2014] => 2010, 2012, 2014
      .range([0, this.width]);
    svg.append("g")
      .attr("transform", `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add a scale for bubble size
    const z = d3.scaleSqrt()
      .domain([Math.min(...this.data.map((v, i) => +v.patients)), Math.max(...this.data.map((v, i) => +v.patients))])
      .range([4, 15]);

    // Add a scale for bubble color
    let study=[];
    const myColor = d3.scaleOrdinal<string>()
      .domain(this.data.map((v)=>v.Study))
      .range(d3.schemeSet2);

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(this.data)
      .join("circle")
      .attr("cx", d => x(d.Year))
      .attr("cy", d => y(+d[this.drug]))
      .attr("r", d => z(+d.patients))
      .style("fill", d => myColor(d.Study))
      .style("opacity", "0.7")
      .attr("stroke", "white")
      .style("stroke-width", "2px")
  }
}
