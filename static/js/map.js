var amee_data = {
  getSustainData: function() {
    $.getJSON('/api/companies/sustainability/', function(data){
      $.each(data, function(index, element){
	console.log(element);
      })
    })
  }
}

$( document ).ready(function() {
  console.log( "ready!" );
  amee_data.getSustainData();
  L.mapbox.accessToken = 'pk.eyJ1IjoiZWxlb25vcmU5IiwiYSI6IllEQXdyRmcifQ.LG2FsrbRgNy4vSS9DnzKiw';
    var map = L.map('map').setView([51.505, -0.09], 13);
    var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }).addTo(map);

    //var marker = L.marker([51.5, -0.09]).addTo(map);
    var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
    }).addTo(map);

  map.setView([51.5020, -0.1239], 12);

  
});
