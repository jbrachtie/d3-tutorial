$(function() {
    /****************************/
    /******data sets & vars******/
    /****************************/
    // var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
    //     14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
    //     24, 18, 25, 9, 3 ];
    var dataset = [];
    var numDataset = 25;
    for(var i=0; i<numDataset; i++) {
        var num = Math.round(Math.random()*100);
        dataset.push(num);
    }
    var twoDdataset = [
        [ 5,     20 ],
        [ 480,   90 ],
        [ 250,   50 ],
        [ 100,   33 ],
        [ 330,   95 ],
        [ 410,   12 ],
        [ 475,   44 ],
        [ 25,    67 ],
        [ 85,    21 ],
        [ 220,   88 ],
        [ 600,   150]
    ];
    //Dynamic, random dataset
    var randomData = [];
    var numDataPoints = 50;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;
    for (var i = 0; i < numDataPoints; i++) {
        var newNumber1 = Math.round(Math.random() * xRange);
        var newNumber2 = Math.round(Math.random() * yRange);
        randomData.push([newNumber1, newNumber2]);
    }
    var w = 1000;
    var h = 100;
    var padding = 5;
    var barW = 500;
    var barH = 400;
    var barPadding = 2;
    var scatterW = 600;
    var scatterH = 300;
    var scatterPadding = 30;

    d3.select("#dataset").append("p").text("dataset: [" + dataset + "]");
    /****************************/
    /**********circles***********/
    /****************************/
    d3.select("#circles").append("p").text("circles:");
    var svg = d3.select("#circles")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("border", "solid black 1px");
    var circleScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d; })])
        .range([2, w/dataset.length/2 - padding]);
    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle");
    circles.attr("cx", function(d, i) {
            return i*(w/dataset.length) + padding*4;
        })
        .attr("cy", h/2)
        .attr("r", function(d) {
            return circleScale(d);
        })
        .each(function(c) {
            var color = Math.random() * 360;
            d3.select(this)
             .attr("fill", "hsl(" + color + ", 100%, 75%")
             .attr("stroke", "hsl(" + color + ", 100%, 50%")
             .attr("stroke-width", function(d) {
                return circleScale(d)/5;
             });
        });


    /****************************/
    /*********bar chart**********/
    /****************************/
    d3.select("#bar").append("p").text("bar chart:");
    var barSVG = d3.select("#bar")
        .append("svg")
        .attr("width", barW)
        .attr("height", barH)
        .style("border", "solid black 1px");
    var brightnessScale = d3.scaleLinear()
                            .domain([0, 100])
                            .range([10, 50]);
    barSVG.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i*(barW / dataset.length);
        })
        .attr("y", function(d) {
            return barH - d*4;
        })
        .attr("width", barW/dataset.length - barPadding)
        .attr("height", function(d) {
            return d*4;
        })
        .attr("fill", function(d) {
            return "hsl(340, 100%, " + brightnessScale(d) + "%)";
        });
    barSVG.selectAll("text")
        .data(dataset)
        .enter()
        .append("text", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return i*(barW / dataset.length) + (barW / dataset.length - barPadding) / 2;
        })
        .attr("y", function(d) {
            if(d > 5) {
                return barH - d*4 + 13;  
            } else {
                return barH - d*4 -2;
            }
            
        })
        .attr("fill", function(d) {
            if(d > 5) {
                return "white";
            } else {
                return "black";
            }
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("text-anchor", "middle")
    
    /****************************/
    /********scatter plot********/
    /****************************/
    d3.select("#scatter").append("p").text("scatter plot:");
    var scatter = d3.select("#scatter")
        .append("svg")
        .attr("width", scatterW)
        .attr("height", scatterH)
        .style("border", "solid black 1px");
    var xScale = d3.scaleLinear()
                    .domain([0, d3.max(randomData, function(d) { return d[0]; })])
                    .range([scatterPadding, scatterW - scatterPadding*2]);
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(randomData, function(d) { return d[1]; })])
                    .range([scatterH - scatterPadding, scatterPadding]);
    var rScale = d3.scaleLinear()
                    .domain([0, d3.max(randomData, function(d) { return d[1]; })])
                    .range([2,9]);
    scatter.selectAll("circle")
        .data(randomData)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", function(d) {
            return rScale(d[1]);
        })
        .each(function(c) {
            d3.select(this)
            .style("fill", "hsl(" + Math.random() * 360 + ",100%,50%)");
        });
        
    // scatter.selectAll("text")
    //     .data(randomData)
    //     .enter()
    //     .append("text")
    //     .text(function(d) {
    //         return "(" + d[0] + ", " + d[1] + ")";
    //     })
    //     .attr("x", function(d) {
    //         return xScale(d[0]);
    //     })
    //     .attr("y", function(d) {
    //         return yScale(d[1]);
    //     })
    //     .attr("fill", "grey")
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", "10px")
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);
    scatter.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (scatterH - scatterPadding) + ")")
        .call(xAxis);
    scatter.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (scatterPadding) + ")")
        .call(yAxis);
});