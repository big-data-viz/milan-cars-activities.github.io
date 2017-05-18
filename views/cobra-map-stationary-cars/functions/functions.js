//--------------------------------------------------
// definisco le variabili
//--------------------------------------------------

var margin = {top: 10, right: 10, bottom: 10, left: 10} // 20
	width = 700 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom

var color = {very_low:"#000000", low: "#2d2d2d", medium_low: "#565656", medium: "#0033ff", medium_high: "#33cccc", high: "#ff9999", very_high: "#ff0000"} //color schema F*/

/*var color = {north : "red", south: "blue",  est: "yellow", west: "green"} */

var tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([-10, 0])
	.html(function(d) { 
		return "Id: " + d.id
			//+ "<br/>Avg. speed: " + (Math.ceil(d.avgspeed/1))   //  d.speed (restituisce tanti decimali); 
			//+ "<br/>Direction: " + d.direction
			+ "<br/>Cars: " + d.cars //(Math.ceil(d.cars/1))
	});	

var svg = d3.select("#chart").append("svg")
	.attr("width", (width  + margin.left + margin.right))
	.attr("height", (height + margin.top + margin.bottom))
	.attr("viewBox","-740, -740, 800, 800")
	.attr("class","background map")

svg.call(tip)

var map = svg.append("svg:image")
	.attr("xlink:href", "../../assets/images/milan-map.svg")

	.attr("x",-704)
	.attr("y",-704)
	.attr("width", 700)
	.attr("height",700)

d3.csv("../../assets/data/stationary-cars/stationary-cars.csv",loader);  //stationary-cars(23h-04h)

function loader (data){

	//--------------------------------------------------
	// inserisco gli elementi
	//--------------------------------------------------

	var box = svg.append("g")
		//.attr("transform","translate(740,740)")
		.attr("width", width)
		.attr("height", height)
		.attr ("class","box")

	// creo un gruppo per ogni singolo elemento in modo da applicargli come classe l"id
	var group = box.append("g")
		.selectAll("g")
		.data(data)
		.enter()
		.append("g")
		.attr("class", function(d,i) {
			return (d.id) + " " + (d.direction) //(d.x) + " " + (d.y)
		})
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)   

	var circles = group.append("circle")
		.style("fill", "#999999" ) //yellow  white
		.attr("transform", function(d,i){
			// x =  ((id - intero(id/100))*100)-1)	y = intero(id / 100)   
			return  "translate(" + ((((d.id)-((Math.ceil(d.id/100)))*100)-1)*7) + ",-" +  (Math.ceil(d.id/100)*7) + ")" //  (d.x)*7 + ",-" +   (d.y)*7 + ")" // --> (x,y)		
		})
		// i cerchi appaiono ingrandendosi 
		.attr("r",0 )
		.attr("class","dots")
		.transition()
			.delay(0)
			.duration(100)
			.ease("linear")
			.attr("r", function (d,i) {
				return ((Math.sqrt(d.cars/3.14)) / 1.4 )  
			})
}