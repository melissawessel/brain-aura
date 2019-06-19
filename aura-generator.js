
var colors = [ "Red", "Orange", "Yellow", "Green",
    "Blue", "Violet" ];

// Configuration
var width = 900;
var height = 900;

// SVG element for aura
var svgContainer = d3.select(".aura").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

// Defining array of 6 randomized brain state scores
var scores = Array.from({length: 6}, () => Math.floor(Math.random() * 100));
console.log(scores);

//Define arcs
var arc = d3.arc()
    .innerRadius(function(d, i) {
        return width/2 - width/15 * i + scores[i]/2.5
    })
    .outerRadius(function(d, i) {
        return width/3 - width/20 * i - scores[i]/2.5
    })
    .startAngle(function(d, i) {
        return -Math.PI / 1.2 + .08 * i

    })
    .endAngle(function(d, i) {
        return Math.PI / 1.2 - .08 * i
    })

// Container for blur
var defs = svgContainer.append("defs");

// Blur filter
var filter = defs.append("filter")
    .attr("id","glow");
filter.append("feGaussianBlur")
    .attr("stdDeviation","20");

// Placing base image
svgContainer.append('svg:image')
    .attr("xlink:href", "aura-base.png")
    .attr("x", "-450")
    .attr("y", "-450")
    .attr("width", "900")
    .attr("height", "900");

//Adding all colors arc
var path = svgContainer.selectAll("g.arc")
    .data(colors)
    .enter().append("g")
    .attr("class", "arc")
    .style("opacity", function(d, i) {
      return scores[i]/200.0;
    })
    .style("filter", "url(#glow)");

//Adding to path
path.append("path")
    .attr("fill", function(d, i) {
        return d;
    })
    .attr("d", arc);
