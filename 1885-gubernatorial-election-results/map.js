var MapUtilityClass = function ($) {
  var self = this;

  this.initMap = function ( ) {

      var mymap = L.map('map').setView([37.5851, -79.0514], 7);
      return mymap;
  }

  this.createCountyBoundries = function (map) {
      L.geoJSON(countiesJSON, {
        style: function(feature) {
          const styleObject = {
            weight: 1,
            opacity: .9,
            color: '#6A6A6A',
            fillColor: '#DCDCDC',
            fillOpacity: 1
          }

          if (feature.properties.data.SUPPORT_REP_1885) {
            styleObject.fillColor = '#6A6A6A'
            styleObject.color = '#F6F6F6'
          }

          if (feature.properties.data.VBSC_1885_CH) {
            styleObject.color = '#FFFFFF'
            styleObject.weight = 3
          }

          return styleObject

        }
      })
      .addTo(map)
  }

  this.createNewLegend = (map) => {
    const legend = L.control({position: 'bottomleft'})
    this.legendControl = legend
    legend.onAdd = (map) => {
      var div = L.DomUtil.create('div', 'info legend')
      div.in = 'legend'
      let legendContents = '<h4>1885 Gubernatorial Election Results</h4>'
      legendContents += '<h5>Percentage of Votes for Republicans</h5>'
      legendContents += '<i style="background:#DCDCDC;"></i>18% - 50%<br>'
      legendContents += '<i style="background:#6A6A6A;"></i>51% - 100%<br>'
      legendContents += 'White Outline: VBSC_1885<br>'
      div.innerHTML = legendContents
      return div
    }
    legend.addTo(map)
  }


}

var MapTool = new MapUtilityClass();

const map = MapTool.initMap();

MapTool.createCountyBoundries(map);
MapTool.createNewLegend(map);