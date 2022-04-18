function draw(data) {

  var width = 1200;
  var height = 800;
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

        
        
  var age_scale = d3.scale.linear().domain([-2, 82]).range([0, 1200]);
  var fare_scale = d3.scale.linear().domain([3, 550]).range([800, 0]);
  
  
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
    .attr('fill','red');
   
    shapes.append('circle')
    .filter(function(d){return d.Sex == "female";})
    .attr("cx", function(d) {
      return age_scale(d["Age"]);
    })
    .attr("cy", function(d) {
      return fare_scale(d["Fare"]);
    }).attr('r',5)
    .fill('black');;
 
  

}

d3.csv("Data/titanic.csv", draw);