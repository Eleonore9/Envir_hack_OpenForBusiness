$( document ).ready(function() {
  console.log( "ready!" );
  
  // Create the map:
  L.mapbox.accessToken = 'pk.eyJ1IjoiZWxlb25vcmU5IiwiYSI6IllEQXdyRmcifQ.LG2FsrbRgNy4vSS9DnzKiw';
  var map = L.map('map').setView([51.505, -0.09], 13);
  var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
  }).addTo(map);
  map.setView([51.5020, -0.1239], 12);

  //Add the points on Ajax call:
  $('button').on('click', function() {
    $(".display_data.table").append("<thead><tr><th>#</th><th>Company</th><th>Score</th></tr></tr></thead>");
    $.getJSON('/api/companies/sustainability/', function(data){
      $.each(data, function(index, element){
	console.log(element);
	for(i=0; i<element.length; i++){
	  var coord = [element[i]['lat'], element[i]['lon']];
	  
	  $(".display_data.table").append("<tr>" + element[i]['name'] + "</tr>");
	  
	  var circle = L.circle(coord, 300, {
	    color: 'green',
	    fillColor: '#449559',
	    fillOpacity: 0.5
	  }).addTo(map);
	  
	  var popup = L.popup()
	      .setLatLng(coord)
	      .setContent('<p>Company: '+ element[i]['name'] +'</p>')
	      .openOn(map);
	  
	  circle.bindPopup(popupContent).openPopup();
	}
      })
    })
  });
});
