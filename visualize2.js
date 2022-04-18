function draw(data) {

  var width = 1200;
  var height = 800;
  var padding = 60;
  var leg_width = 160;
  var leg_height = 80;
  var title_height = 75;
  var sqsz = 10; //easier to change size one i figured almost immediately


// cleaning the out of bounds data for the plot.
// Would likely do in python if not trying to get JS experience
  clean = []
  for (var i = 0; i < data.length; i++) {
    if (isNaN(data[i]["Age"]) || data[i]["Fare"] == 0) {
      continue;
    }
    else {
        clean.push(data[i])
    }
  }
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

        
        
  var age_scale = d3.scale.linear().domain([-2, 82]).range([padding, width-leg_width]);
  var fare_scale = d3.scale.log().domain([3, 550]).range([height - padding, title_height]);
               
  
  var shapes = svg.selectAll(".shape")
    .data(clean)
    .enter()
 
    shapes.append('rect')
    .filter(function(d){return d["Sex"] == "male";})
    .attr('x',function(d) {
      return age_scale(d["Age"]) - sqsz/2;
    })
    .attr("y", function(d) {
      return fare_scale(d["Fare"]) - sqsz/2;
    })
    .attr('width', sqsz)
    .attr('height', sqsz)
    .attr("fill", function(d) {
      if (d["Survived"] == 1) {
        return "grey";
      } else {
        return "red";
      }
    })
    .attr("opacity", 0.5);
   
    shapes.append('circle')
    .filter(function(d){return d.Sex == "female";})
    .attr("cx", function(d) {
      return age_scale(d["Age"]);
    })
    .attr("cy", function(d) {
      return fare_scale(d["Fare"]);
    }).attr('r',5)
    .attr("fill", function(d) {
      if (d["Survived"] == 1) {
        return "grey";
      } else {
        return "red";
      }
    })
    .attr("opacity", 0.5);
 
    var formatAsPercentage = d3.format(".1%");
 
    var xAxis =  d3.svg.axis()
                 .scale(age_scale)
                 //.orient("bottom");

    var yAxis =  d3.svg.axis()
                 .scale(fare_scale)
                 .orient("left")
                 .ticks(20, ",s");

    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + (height - padding) + ")")
       .call(xAxis);
        
    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(" + padding + ",0)")
       .call(yAxis);
       
    svg.append("text")
    .attr("class", "x label")
    .attr("x", (width-padding)/2)
    .attr("y", height-15)
    .text("Passenger Age in Years");
    
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")
    .text("Fare in Dollars")

     svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (title_height / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Titanic Survivor Attributes");
    
    
    
}

d3.csv("Data/titanic.csv", draw);