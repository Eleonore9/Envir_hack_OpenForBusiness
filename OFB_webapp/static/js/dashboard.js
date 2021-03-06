var colors = ["#C66D6D", "#E09E69", "#F7EF9E", "#59A372"];

$( document ).ready(function() {
  
  // Create the map:
  L.mapbox.accessToken = 'pk.eyJ1IjoiZWxlb25vcmU5IiwiYSI6IllEQXdyRmcifQ.LG2FsrbRgNy4vSS9DnzKiw';
  var map = L.map('map').setView([51.505, -0.09], 13);
  var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
  }).addTo(map);
  map.setView([51.5020, -0.1239], 11);

  //Add the points on Ajax call:
  $('button').on('click', function() {
    
    $.getJSON('/api/companies/sustainability/', function(data){
      $.each(data, function(index, element){
	console.log(element);
	$(".display_data h4 span").append(element.length);
	var list_scores = [];
	for(i=0; i<element.length; i++){
	  //console.log(i, element[i]['name']);
	  if(element[i]['name'] != undefined){
	    var coord = [element[i]['lat'], element[i]['lon']];
	    var count = i + 1;
	    $(".display_data .table_data").append("<p>"+count+'- '+element[i]['name']+' - Score: '+element[i]['amee_industry_score']+" </p>");

	    //add color depending on score level
	    var score = element[i]['amee_industry_score'];
	    list_scores.push(score);
	    var score_color;
	    if (score<25){score_color = 0;} else if (score<50){score_color=1;}
	    else if (score<75){score_color=2;} else {score_color=3;}
	  
	    var circle = L.circle(coord, 300, {
	      color: 'grey',
	      fillColor: colors[score_color],
	      fillOpacity: 0.7
	    }).addTo(map);

	    //add popups with info
	    var popup = L.popup()
	      .setLatLng(coord)
	      //.setContent('<p>Company: '+ element[i]['name'] +'</p>')
	      .openOn(map);
	    var popupContent = '<p>Company: '+ element[i]['name'] +'</p>'+'<p>Score: '+ element[i]['amee_industry_score'] +'</p>';
	    circle.bindPopup(popupContent).openPopup();

	  }
	}
	//console.log(list_scores);
	//Width and height
      var w = 300;
      var h = 180;
      var barPadding = 1;

      //Create SVG element
      var svg = d3.select("#hist")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

      

      svg.selectAll("rect")
         .data(list_scores)
         .enter()
         .append("rect")
         .attr("x", function(d, i) {
             return i * (w / list_scores.length);
         })
         .attr("width", w / list_scores.length - barPadding)
         .attr("y", function(d) {
             return h - d; 
         })
         .attr("height", function(d){
             return d * 6;
         }).attr("fill", function(d, i){
	    if (d<25){return colors[0];} else if (d<50){return colors[1];}
	    else if (d<75){return colors[2];} else {return colors[3]}
	 });//.attr("fill", "teal")
	

     svg.selectAll("text")
         .data(list_scores)
         .enter()
         .append("text")
         .text(function(d) {
             return d;
         })
        .attr("x", function(d, i) {
          return i * (w / list_scores.length) + (w / list_scores.length - barPadding) / 2;
        })
        .attr("y", function(d) {
             return h - 1 - d; 
        })
        .attr("fill", "black")
        .attr("text-anchor", "middle");
      })
    })
  });
});
