let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let xScale = d3.scale.linear().range([0, width]),
    xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
    yScale  = d3.scale.linear().range([height, 0]),
    yAxis = d3.svg.axis().scale(yScale).orient("left"),
    rscale = d3.scale.linear();

let cValue = function(d) { return d.Year;},
    color = d3.scale.category10();
let emotions =["anger","anticipation","disgust","fear","joy","sadness","surprise","trust"];
    
//Setup XScale
let xValue = function(d) { return d.Year;},
    xMap = function(d) { return xScale(xValue(d));}
     
//Setup YScale

let angerValY= function(d) { return d.anger;},
    angerMapY = function(d) { return yScale(angerValY(d));}

let sadValY= function(d) { return d.sadness;},
    sadMapY = function(d) { return yScale(sadValY(d));}

let anticipationValY= function(d) { return d.anticipation;},
    anticipationMapY = function(d) { return yScale(anticipationValY(d));}    


// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1);

// load data
d3.csv("./data/sample.csv", function(error, data) {
 //console.log(data);
  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.Year = +d.Year;
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
 // yScale.domain([d3.min(data, angerValY)-1, d3.max(data, angerValY)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Calories");

  // draw dots
  svg.selectAll(".anger")
      .data(data)
      .enter().append("circle")
      .attr("class", "anger")
      //.attr("r", 3.5)
      .attr("r", function(d){
        console.log(d);
        return (Math.sqrt(d.anger*1000 *4/Math.PI));
      })      
      .attr("cx", xMap)
      .attr("cy", angerMapY)
      .style("fill", function(d) { return "red"}) 
      .style("opacity", 0.6);

  svg.selectAll(".sad")
      .data(data)
      .enter().append("circle")
      .attr("class", "sad")
      //.attr("r", 3.5)
      .attr("r", function(d){
        console.log(d);
        return (Math.sqrt(d.sadness*1000 *4/Math.PI));
      })      
      .attr("cx", xMap)
      .attr("cy", sadMapY)
      .style("fill", function(d) { return "green"}) 
      .style("opacity", 0.6);

 svg.selectAll(".ant")
      .data(data)
      .enter().append("circle")
      .attr("class", "ant")
      //.attr("r", 3.5)
      .attr("r", function(d){
        console.log(d);
        return (Math.sqrt(d.anticipation*1000 *4/Math.PI));
      })      
      .attr("cx", xMap)
      .attr("cy", anticipationMapY)
      .style("fill", function(d) { return "blue"})
      .style("opacity", 0.6);
     

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
});
