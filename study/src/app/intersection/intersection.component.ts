import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-intersection',
  templateUrl: './intersection.component.html',
  styleUrls: ['./intersection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntersectionComponent implements OnInit, AfterViewInit {
  @ViewChild('rootSvg', { static: false }) rootSvg: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    this.render();
  }

  ngOnInit(): void {
  }

  render(): void {
    let margin = { top: 40, right: 150, bottom: 60, left: 30 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    let n_segments = 100;

    let svgRoot = d3
      .select(this.rootSvg.nativeElement)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    svgRoot.select('g.container').remove();
    const svg = svgRoot.append('g').attr('class', 'container');

    svg.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', `
      M 480 200
      C 580 200 480 450 580 400
      S 580 150 680 100
      S 1030 200 780 300
      S 430 400 180 300
      S 180 50 280 100
      S 280 350 380 400
      S 380 200 480 200
      `)
    let path = svg.select<SVGPathElement>("path");

    let segments_g = svg.append("g");
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let handle = svg.append("g")
        .attr("class", "handle")
        .datum([
          [300, 350],
          [660, 200]
        ]);
    let highlightCircles = svg.append("g");

    handle.append("line")
    .call(drawHandleLine);

    handle.selectAll("circle")
    .data((d) => d)
    .enter()
    .append("circle")
    .call(drawHandleCircle)
    .attr("r", 4.5)
    .call(d3.drag()
      .on("drag", function(event, d) {
        d[0] = event.x,
        d[1] = event.y;
        // circle, line (handle)업데이트
        d3.select(this).call(drawHandleCircle);
        handle.select("line").call(drawHandleLine);
        // 겹침 표시 업데이트
        draw_intersections(line_intersections(pathElem, handleLine))
    }));

    let pathElem = path.node();
    let pathLength = pathElem.getTotalLength();
    let handleLine = handle.select("line");

    draw_intersections(line_intersections(pathElem, handleLine));

    function drawHandleCircle(circle) {
      circle
        .attr("cx", (d) => d[0])
        .attr("cy", (d) => d[1]);
    }

    function drawHandleLine(line) {
      line
        .attr("x1", (d) => d[0][0])
        .attr("y1", (d) => d[0][1])
        .attr("x2", (d) => d[1][0])
        .attr("y2", (d) => d[1][1]);
    }

    function btwn(a, b1, b2) {
        if ((a >= b1) && (a <= b2)) {
            return true;
        }
        if ((a >= b2) && (a <= b1)) {
            return true;
        }
        return false;
    }
//
    function calc_line_intersect(pLine, hLine) {
      let pX1 = pLine.x1, pY1 = pLine.y1,
          pX2 = pLine.x2, pY2 = pLine.y2,
          hX1 = hLine.x1, hY1 = hLine.y1,
          hX2 = hLine.x2, hY2 = hLine.y2;
      let pt_denom = (pX1 - pX2) * (hY1 - hY2) - (pY1 - pY2) * (hX1 - hX2);
      let pt_x_num = (pX1 * pY2 - pY1 * pX2) * (hX1 - hX2) - (pX1 - pX2) * (hX1 * hY2 - hY1 * hX2);
      let pt_y_num = (pX1 * pY2 - pY1 * pX2) * (hY1 - hY2) - (pY1 - pY2) * (hX1 * hY2 - hY1 * hX2);
      if (pt_denom == 0) {
          return "parallel";
      } else {
          let pt = {
            'x': pt_x_num / pt_denom,
            'y': pt_y_num / pt_denom
          };
          if (btwn(pt.x, pX1, pX2) && btwn(pt.y, pY1, pY2) && btwn(pt.x, hX1, hX2) && btwn(pt.y, hY1, hY2)) {
              return pt;
          } else {
              return "not in range";
          }
      }
    }

    function line_intersections(pathEl, handleLine) {
      let pts = [];
      for (let i = 0; i < n_segments; i++) {
          let pos1 = pathEl.getPointAtLength(pathLength * i / n_segments);
          let pos2 = pathEl.getPointAtLength(pathLength * (i + 1) / n_segments);
          let pathPos = {
              x1: pos1.x,
              y1: pos1.y,
              x2: pos2.x,
              y2: pos2.y
          };
          let handlePos = {
              x1: handleLine.attr('x1'),
              y1: handleLine.attr('y1'),
              x2: handleLine.attr('x2'),
              y2: handleLine.attr('y2')
          };
          let pt = calc_line_intersect(pathPos, handlePos);
          if (typeof pt != "string") {
              pts.push(pt);
          }
      }
      console.log(pts.length);
      return pts;

    }

    function draw_intersections(pts) {

      highlightCircles.selectAll("circle").remove();

      pts.forEach(function(pt) {
          highlightCircles.append("circle")
              .attr("cx", pt.x)
              .attr("cy", pt.y)
              .attr("r", 8)
              .attr("fill", "none")
              .attr("stroke", "steelblue");

          highlightCircles.append("circle")
              .attr("cx", pt.x)
              .attr("cy", pt.y)
              .attr("r", 3)
              .attr("fill", "steelblue")
              .attr("stroke", "none");

      });

    }

    function draw_segments() {
      segments_g.selectAll("line").remove();
      for (let i = 0; i < n_segments; i++) {
          let pos1 = pathElem.getPointAtLength(pathLength * i / n_segments);
          let pos2 = pathElem.getPointAtLength(pathLength * (i + 1) / n_segments);
          segments_g.append("line")
              .attr("class", "segment")
              .attr("x1", pos1.x)
              .attr("y1", pos1.y)
              .attr("x2", pos2.x)
              .attr("y2", pos2.y)
              .attr("stroke", color(i.toString()));
      }
    }

    d3.select("#slider").on("change", function(event) {
      const value = event.target.value;
      d3.select("#n_segments_text").text(value);
        n_segments = value;
        draw_intersections(line_intersections(pathElem, handleLine));
        if (d3.select("#cbox").property("checked")) {
            draw_segments();
        }
    });

    d3.select("#cbox").on("change", function(event) {
      const checked = event.target.checked;
      if (checked) {
            draw_segments();
        } else {
            segments_g.selectAll("line").remove();
        }
    });

  }
}
