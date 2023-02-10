import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartItem } from 'src/app/shared/chart-data.service';

@Component({
  selector: 'app-diverging-bar-chart',
  templateUrl: './diverging-bar-chart.component.html',
  styleUrls: ['./diverging-bar-chart.component.css']
})
export class DivergingBarChartComponent implements OnInit, OnChanges {
  @Input() study: ChartItem[];
  @Input() drugList: string[];
  @ViewChild('rootsvg') rootsvg: ElementRef<SVGElement>;
  studies: ChartItem[];
  update: () => void;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes })
    if (!this.rootsvg) return;
    // @Input()으로 받은 study의 값이 변경되면 실행할 코드
    if (changes['study'].currentValue) {
      // index 0에 A, C가 오도록 정렬
      this.study.sort((f, s) => f.Type > s.Type ? 1 : -1);
      // 깊은 복사
      this.studies = this.study.map(v => v = { ...v });
      // index 0의 약물값은 음수로 변경
      this.drugList.forEach(key => this.studies[0][key] = -+this.studies[0][key]);
      // this.render();
      if (!this.update) this.render();
      else this.update();
    }
  }

  ngOnInit(): void {
  }

  render() {
    const margin = { top: 10, right: 20, bottom: 30, left: 20 };
    const svgWidth = 400;
    const svgHeight = 300;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    const svgRoot = d3.select(this.rootsvg.nativeElement)
      .attr("viewBox", `${0}, ${0} ${svgWidth} ${svgHeight}`)
      .style("font", "9px sans-serif")
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // svgRoot.select('g.container').remove();
    const svg = svgRoot
      .append('g')
      .attr('class', 'container')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const barGroup = svg
      .append("g")
      .attr("class", "bars")
      .selectAll("rect");

    let x = d3
      .scaleLinear()
      .domain([-100, 100])
      .range([0, width]);

    let xAxis = svg
      .append("g")
      .attr("class", "x-axis")
      .style("font", "9px sans-serif")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    xAxis.selectAll('text').text(d => Math.abs(+d));

    let y = d3
      .scaleBand()
      .domain(this.drugList)
      .range([0, height])
      .padding(0.2);

    let yAxis = svg
      .append("g")
      .style("font", "12px sans-serif")
      .attr("class", "y-axis")
      .attr("transform", `translate(${x(0)},0)`)
      .call(d3.axisLeft(y))

    const labels = svg
      .append("g")
      .attr("class", "labels");

    // 연구자 이름, 타입을 상단에 표시
    labels
      .style("font", "10px sans-serif")
      .append('text')
      .attr('x', 10)
      .attr('y', 5)
      .text(this.studies[0].Study);
    labels
      .selectAll('.type')
      .data(["A", "B"])
      .join('text')
      .style("font", "10px sans-serif")
      .attr('class', 'type')
      .attr('x', (_, i) => 165 + i * 20)
      .attr('y', 10)
      .text(d => d);

    // studies는 하나의 object => 하나의 막대만 표시 가능
    (this.update = () => {
        barGroup
          .data(this.studies)
          .join("rect")
          .attr("x", (d) => x(Math.min(0, d[drug])))
          .attr("y", y(drug))
          .attr("width", (d) => Math.abs(x(d[drug]) - x(0)))
          .attr("height", y.bandwidth())
          .attr('fill', ({ Type }) =>
            Type == "A" || Type == "C"
              ? 'darkorange'
              : 'steelblue'
          ).append('title')
          .text(d => `${d.Study} ${d.Type}`);
    })();
  }
}
