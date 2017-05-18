// var opts = {
//   lines: 13 // The number of lines to draw
// , length: 28 // The length of each line
// , width: 14 // The line thickness
// , radius: 42 // The radius of the inner circle
// , scale: 1 // Scales overall size of the spinner
// , corners: 1 // Corner roundness (0..1)
// , color: '#000' // #rgb or #rrggbb or array of colors
// , opacity: 0.25 // Opacity of the lines
// , rotate: 0 // The rotation offset
// , direction: 1 // 1: clockwise, -1: counterclockwise
// , speed: 1 // Rounds per second
// , trail: 60 // Afterglow percentage
// , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
// , zIndex: 2e9 // The z-index (defaults to 2000000000)
// , className: 'spinner' // The CSS class to assign to the spinner
// , top: '50%' // Top position relative to parent
// , left: '50%' // Left position relative to parent
// , shadow: false // Whether to render a shadow
// , hwaccel: false // Whether to use hardware acceleration
// , position: 'absolute' // Element positioning
// }

var margin = {top: 10, right: 10, bottom: 10, left: 10} // 20
	width = 700 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom

var color = {
	very_low:"#000000", 
	low: "#2d2d2d", 
	medium_low: "#565656", 
	medium: "#0033ff", 
	medium_high: "#33cccc",
	high: "#ff9999", 
	very_high: "#ff0000"
} 

var svg = d3.select("#map").append("svg")
	.attr("width", (width  + margin.left + margin.right))
	.attr("height", (height + margin.top + margin.bottom))
	.attr("viewBox","-740, -740, 800, 800")
	.attr("class","background map")

var tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([-10, 0])
	.html(function(d) { 
		return "Id: " + d.id
			+ "<br/>Avg. speed: " + (Math.ceil(d.speed/1))   //  d.speed (restituisce tanti decimali); 
			+ "<br/>Cars: " + (Math.ceil(d.cars/1))
	});	

svg.call(tip)

var map = svg.append("svg:image")
	.attr("xlink:href", "../../assets/images/milan-map.svg")
	.attr("x",-704)
	.attr("y",-704)
	.attr("width", 700)
	.attr("height",700)

var box_legend = d3.select("main").append("svg")
	.attr("class","legend")
	.attr("viewBox","0, 0, 800, 70")

var legend = box_legend.append("svg:image")
	.attr("xlink:href", "../../assets/images/map-legend.svg")
	.attr("x", 50)
	.attr("y", 0)
	.attr("width", 710)
	.attr("height", 70)

d3.csv("../../assets/data/map/nov-dec-night.csv", loader); 

function loader (data){
	//console.log(data)
	
	// divido i dati per speed (operazione trascurabile)
	var speedrange = d3.nest()
		.key (function(d){
			var speed = d.speed;
			if(d.speed >= 0 && d.speed < 45  ) {
				return  0
			}
			if(d.speed >= 45 && d.speed < 65  ){
				return  1
			}
			else {
				return 2
			}
		})
		.sortKeys(d3.ascending) //ordine crescente (corretto)
		.entries(data);

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
			return ("circle " + d.id) //(d.x) + " " + (d.y)
		})
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)   

	var circles = group.append("circle")
		.style("fill", function (d,i) {
			if(d.speed == 0) {
				return  color.very_low 
			}
			if(d.speed > 0 && d.speed < 30  ) { 
				return  color.low
			}
			if(d.speed >= 30 && d.speed < 50  ){
				return  color.medium_low
			}
			if(d.speed >= 50 && d.speed < 70  ){
				return  color.medium
			}
			if(d.speed >= 70 && d.speed < 90  ){
				return  color.medium_high
			}
			if(d.speed >= 70 && d.speed < 100  ){
				return  color.high
			}
			else {
				return color.very_high
			}
		})
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
				if (d.speed > 100 ){

					return (Math.sqrt(d.cars/3.14)) / 1.7  // / 1.5   ///2.4   // 2   // /1.5
				}
				else {
					return (Math.sqrt(d.cars/3.14)) / 3.6  ///3  //2.4
				}
			})
}

function night() {
	// var target = document.getElementById("map")
	// var spinner = new Spinner().spin()
	// target.appendChild(spinner.el)

	d3.selectAll(".box")
		.transition()
		.delay(0)
		.duration(50)
		.remove()
	d3.csv("../../assets/data/map/nov-dec-night.csv", loader );

	// spinner.stop();
}

function morning() {
	d3.selectAll(".box")	   
		.transition()
		.delay(0)
		.duration(100)
		.remove()
	d3.csv("../../assets/data/map/nov-dec-morning.csv", loader );
}

function afternoon() {
	d3.selectAll(".box")
		.transition()
		.delay(0)
		.duration(100)
		.remove()
	d3.csv("../../assets/data/map/nov-dec-afternoon.csv", loader );
}

function evening() {
	d3.selectAll(".box")
		.transition()
		.delay(0)
		.duration(100)
		.remove()
	d3.csv("../../assets/data/map/nov-dec-evening.csv", loader );
}
