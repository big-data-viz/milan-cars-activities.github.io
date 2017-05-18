//--------------------------------------------------
// definisco le variabili
//--------------------------------------------------

var margin = {top: 20, right: 20, bottom: 20, left: 20}
	width = 700 - margin.left - margin.right,
	height = 320 - margin.top - margin.bottom  // 300

var color = {very_low:"#000000", low: "#2d2d2d", medium_low: "#565656", medium: "#0033ff", medium_high: "#33cccc", high: "#ff9999", very_high: "#ff0000"} 

var distanziatore =  32.5 // 28 // 25.6

/*var color = {very_low:"#000000", low: "#2d2d2d", medium_low: "#3d3d3d", medium: "#0033ff", medium_high: "#33cccc", high: "#ff9999", very_high: "#ffff00"} //color schema F */

/*var hour = d3.nest()
	.key(d.hour)
	.entry(data)*/ 

/*
var tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([-10, 0])
	.html(function(d) { 
		return  "Max. speed: " + d.maxspeed
			+   "<br/>Avg. speed: " + d.avgspeed
			+   "<br/>Min. speed: " + d.minspeed
			+   "<br/>Cars: " + d.cars
	}); 
*/

var avg_tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([-10, 0])
	.html(function(d) { 
		return  "Avg. speed: " + d.avgspeed
	}); 

var min_tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([-10, 0])
	.html(function(d) { 
		return  "Min. speed: " + d.minspeed
	});  

var max_tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([-10, 0])
	.html(function(d) { 
		return  "Max. speed: " + d.maxspeed
	}); 

var cars_tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([-10, 0])
	.html(function(d) { 
		return "Cars: " + (Math.ceil(d.cars/30))
	}); 

var svg = d3.select("main").append("svg")
	.attr("width", (width  + margin.left + margin.right))
	.attr("height", (height + margin.top + margin.bottom))
	.attr("viewBox","-40, -250, 800, 350")
	.attr("class","background")

/* Asse  */

var yaxisScale = d3.scale.linear()
	.domain([0,350]) // speed
	.range([0, -190]); // altezza asse

var yAxis = d3.svg.axis()
	.scale(yaxisScale)
	.tickSize(6, 0)
	.orient("left")

typeof(yAxis);

svg.call(avg_tip)
svg.call(min_tip)
svg.call(max_tip)
svg.call(cars_tip)

d3.csv("../../assets/data/hour-chart/cobra_final_result-2ndMacro.csv",loader) //1-speed-per-hour.csv


function loader (data){
	
	//--------------------------------------------------
	// inserisco gli elementi
	//--------------------------------------------------


	var box = svg.append("g")
		.attr("transform","translate(100,100)")
		.attr("width", width)
		.attr("height", height)
		.attr ("class","box")
		.attr("transform","scale(1,1)")  // (1.1,1.1)

	// creo un gruppo per ogni singolo elemento in modo da applicargli come classe l"id
	var group = box.append("g")
		.selectAll("g")
		.data(data)
		.enter()
		.append("g")
		.attr("class", function(d,i) {
			return (i.hour) //(d.x) + " " + (d.y)
		})
		//.on("mouseover", tip.show)
		//.on("mouseout", tip.hide)

	var speed_line = group.append("line")
		.attr("x1", function (d,i) {
			return i * distanziatore
		})
		.attr("y1", function (d,i){
			return  (d.minspeed   * (1-2) ) / 2
		})
		.attr("x2", function (d,i) {
			return i * distanziatore
		})
		.attr("y2", function (d,i){
			return (((d.maxspeed.length) - d.maxspeed) * (2-1)  ) / 2  //avgspeed
		})
		.attr("stroke","white")
		.attr ("class","speed_line")
		/*.on("mouseover", function() {
			d3.select(this)
				.attr("stroke-width",3)
		})
		.on("mouseout", function() {
			d3.select(this)
				.attr("stroke-width",1)
		})*/


	/* --------- */
	var radius = 2.5

	var maxspeed = group.append("circle")
		.attr("r", radius)
		.attr("cx", function(d,i){
			return i * distanziatore
		})
		.attr("cy", function(d,i){
			return  (((d.maxspeed.length) - d.maxspeed) * (2-1)  ) / 2  //avgspeed
		})
		.attr("fill", color.very_high)
		.attr ("class","maxspeed")
		.attr("stroke","white")
		.attr("stroke-width",3)
		.attr("stroke-opacity",0)
		.on("mouseover", max_tip.show)
		.on("mouseout", max_tip.hide) 

	var minspeed = group.append("circle")
		.attr("r", radius)
		.attr("cx", function(d,i){
			return i * distanziatore
		})
		.attr("cy", function(d,i){
			return (d.minspeed * (1-2) ) / 2
		})
		.attr("fill", color.medium)
		.attr ("class","maxspeed")
		.attr("stroke","white")
		.attr("stroke-width",3)
		.attr("stroke-opacity",0)
		.attr ("class","minspeed")
		.on("mouseover", min_tip.show)
		.on("mouseout", min_tip.hide) 

	var avgspeed_circle = group.append("circle")
		.attr("r", radius)
		.attr("cx",function (d,i){
			return (i * distanziatore)  
		})
		.attr("cy", function (d,i) {
			return (d.avgspeed * (1-2) ) / 2 //"-" + d.avgspeed  
		})
		.attr("fill","white") 
		.on("mouseover", avg_tip.show)
		.on("mouseout", avg_tip.hide) 

	/* --------- */

	var cars = group.append("circle")
		.attr("r", function (d,i){
			return (d.cars / 30 ) / 1000 /* novembre - 30 giorni */
		})
		.attr("transform", function(d,i){
			return "translate(" + (i * distanziatore) + ", 65)"  // 35
		})
		//.attr("fill","blue")
		.attr("stroke","white")
		.attr("stroke-width",1)
		.attr("stroke-opacity",1)
		.attr("fill-opacity",0)
		.on("mouseover", cars_tip.show)
		.on("mouseout", cars_tip.hide) 

	/* --------- */


	var hour = group.append("text")
		.attr("x", function (d,i){
			return (( i * distanziatore ) - 8 )
		})
		.attr("y", 30) // 80
		.text(function (d,i) { 
			return (d.hour); 
		})
		.attr("font-size",12)
		.attr("fill","white")

	/*  --------- Asse --------- */

	var yAxisGroup = box.append("g")
		.call(yAxis)
		.attr("class","axis")
		.attr("fill","gray")
		.attr("font-size",12)
		.attr("transform","translate(-10,0)")
	
}