import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartItem } from 'src/app/shared/chart-data.service';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, AfterViewInit {
  @Input() data: ChartItem[];
  @Input() drug: string;
  @ViewChild('rootsvg') rootsvg: ElementRef<SVGElement>;
  constructor() { }
  ngAfterViewInit(): void {
    this.render();
  }
  ngOnInit(): void {
  }

  render() {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const svgWidth = 320;
    const svgHeight = 300;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const colorScheme = [
      '#980043','#dd3497','#7a0177','#3288aa','#fee0b6','red','green','yellow',
      '#7fcdbb','#253494','#fec44f','#ec7014','#993404','#807dba','#54278f','#4d004b',
      '#fcbbcc','#fb6a4a','#aaccff','#67000d','#b2df8a','#2166ff','#b2182b','#003c30'
    ]
    const myColor = d3.scaleOrdinal(colorScheme).domain(this.data.map(v => v.Study));
    const svg = d3
      .select(this.rootsvg.nativeElement)
      .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('class', 'container')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([2010, 2022])
      .range([0, width]);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(6).tickSize(-height));

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(6).tickSize(-width));

    const z = d3
      .scaleSqrt()
      .domain([0, 400])
      .range([5, 20]);

    const bubbles = svg
      .append('g')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('class', 'bubbles')
      .attr('opacity', '0.75')
      .attr('cx', (d) => x(d.Year))
      .attr('cy', (d) => y(d[this.drug]))
      .attr('r', (d) => z(+d.patients))
      .sort((a, b) => +b.patients - +a.patients)
      .attr('fill', (d) => myColor(d.Study))
      .append('title')
      .text(d => `${d.Study} ${d.Type}\n${this.drug}: ${d[this.drug]}\npatients: ${d.patients}`)
  }
}
