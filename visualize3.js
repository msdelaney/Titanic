function draw(data) {

  var width = 1600;
  var height = 1600;
  var padding = 60;
  var leg_width = 160;
  var leg_height = 80;
  var title_height = 75;
  var sqsz = 10; //easier to change size one i figured almost immediately
  
  
  //Create tooltip - ended up not using it based on finding tip
  // when looking for code to fix it
  function createToolTip(d){
    var xPosition = parseFloat(d3.select(this).attr("x")) + age_scale.rangeBand() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
    
    svg.append("text")
    .attr("id", "tooltip")
    .attr("x", xPosition)
    .attr("y", yPosition)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .text(CreateToolText(d));
  }
  
  
  
  //Create the text for the tool tip
  function createToolText(d){
     //repurposed for d3 tip
  }
  //helper function for the color
  function isDead(d) {
    if (d["Survived"] == 1) {
        return "grey";
      } else {
        return "red";
      }              
}

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
  
    
  var tip = d3.tip().attr("class", "tooltip").html(function(d) {
    var sex, survival;
    if (d["Sex"] == "male") {
      sex = "Male";
    } else {
      sex = "Female";
    }
    if (d["Survived"] == 1) {
      survival = "Survived";
    } else {
      survival = "Died";
    }
    return d["Name"] + "<br>" + sex + ", " + d["Age"] + "<br>" + 
    "Class: " + d['Pclass'] + ", Fare Cost: $" + d["Fare"] + "<br>" + survival;
  });
  svg.call(tip);
  
  
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
    .attr("fill", function(d) { return isDead(d)})
    .attr("opacity", 0.5)
    .on("mouseover", function(d) {
                    d3.select(this)
                    .attr("fill", "blue");
                    tip.show(d); // you have to pass data if you want to do tip plus color change apparently
        })
   // .on("mouseover",tip.show)
    .on("mouseout", function(d) {
            d3.select(this)
              .attr("fill", function(d){return isDead(d)});
              tip.hide(d);
    });
   
    shapes.append('circle')
    .filter(function(d){return d.Sex == "female";})
    .attr("cx", function(d) {
      return age_scale(d["Age"]);
    })
    .attr("cy", function(d) {
      return fare_scale(d["Fare"]);
    }).attr('r',5)
    .attr("fill", function(d) { return isDead(d)})
    .attr("opacity", 0.5)
    .attr("data-legend",function(d) { return d.name})
    .on("mouseover", function(d) {
                    d3.select(this)
                    .attr("fill", "blue");
                    tip.show(d);
                   })
    .on("mouseout", function(d) {
            d3.select(this)
              .attr("fill", function(d){return isDead(d)});
              tip.hide(d);
    });
 
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
    
    legend = svg.append("g")
    .attr("class","legend")
    .attr("transform","translate("+ (width - leg_width) +
    "," + (title_height) + ")")
    .style("font-size","12px")
    .attr("fill", "transparent")
    .call(d3.legend)
    
    legend.append("rect")
    .attr("width", leg_width)
    .attr("height", leg_height)
    .attr("fill", "transparent")
    .attr("stroke", "black")
    .attr("stroke-width", 2);
    
    legend.append("circle")
    .attr('r', 5)
    .attr('cx', 10)
    .attr('cy', 10)
    .attr("fill", "grey")
    legend.append("text")
    .attr('x', 20)
    .attr('y', 15)
    .text("Female, Survived")
    .attr("stroke", "black")
    
    legend.append("circle")
    .attr('r', 5)
    .attr('cx', 10)
    .attr('cy', 30)
    .attr("fill", "red");
  legend.append("text")
    .attr('x', 20)
    .attr('y', 35)
    .text("Female, Died")
    .attr("stroke", "black")
    
    legend.append("rect")
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 5)
    .attr('y', 45)
    .attr("fill", "grey");
  legend.append("text")
    .attr('x', 20)
    .attr('y', 55)
    .text("Male, Survived")
    .attr("stroke", "black")

  legend.append("rect")
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 5)
    .attr('y', 65)
    .attr("fill", "red");
  legend.append("text")
    .attr('x', 20)
    .attr('y', 75)
    .text("Male, Died")
    .attr("stroke", "black")
    
}

d3.csv("Data/titanic.csv", draw);