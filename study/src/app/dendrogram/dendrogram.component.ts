import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { cluster } from 'd3';

@Component({
  selector: 'app-dendrogram',
  templateUrl: './dendrogram.component.html',
  styleUrls: ['./dendrogram.component.scss']
})
export class DendrogramComponent implements OnInit {
  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dendrogram();
  }

  dendrogram() {
    const width = 1000;
    const height = 1000;
    const margin = 100;

    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,0)");

    // read json data
    d3.json("./assets/dendrogram.json").then((data) => {
      const cluster = d3.cluster()
        .size([height, width - margin]);

      const root = d3.hierarchy(data, (d:any) => d.children);
      cluster(root);
      console.log('root: ', root);
      console.log('root.descendants: ', root.descendants()); //배열 형태
      console.log('data',data);

      // path
      svg.selectAll('path')
        .data(root.descendants().slice(1))
        .join('path')
        .attr("d", (d:any) => `M${d.y},${d.x}L${d.parent.y},${d.parent.x}`)
        // .attr("d", (d:any) => `M${d.y},${d.x}S${d.parent.y+100},${d.parent.x+100} ${d.parent.y},${d.parent.x}`)
        // .attr("d", (d:any) => `M${d.y},${d.x}Q${d.y+100},${d.x+100} ${d.parent.y},${d.parent.x}`)
        // .attr("d", (d:any) => `M${d.y},${d.x}C${d.parent.y+50},${d.x} ${d.parent.y+150},${d.parent.x} ${d.parent.y},${d.parent.x}`)
        .style("fill", 'none')
        .attr("stroke", '#ccc');
        
      // node
      svg.selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", (d:any) => `translate(${d.y},${d.x})`)
        // .attr("id",`tooltip${get_id()}`) //tooltip
        .append("circle")
        .attr("r", 7)
        .style("fill", "#69b3a2")
        .attr("stroke", "black")
        .style("stroke-width", 2);
        
        

      // //tooltip
      // let tooltip=d3.select("#my_dataviz")
      //   .append("div")
      //   .style("position","absolute")
      //   .style("visibility","hidden")
      //   .text(`data:${get_id()}`);

      // d3.selectAll(`#tooltip${get_id()}`)
      //   .on("mouseover", () => (tooltip.style("visibility", "visible"), console.log('mouse over')))
      //   .on("mousemove", (event:any) => tooltip.style("top", (event.pageY) + "px").style("left", (event.pageX) + "px"))
      //   .on("mouseout", () => tooltip.style("visibility", "hidden"));

      // get_id() : Number{
      //   return 1;
      // }
    });
  }
}
