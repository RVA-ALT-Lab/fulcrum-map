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
            opacity: 1,
            color: '#6A6A6A',
            fillColor: '#DCDCDC',
            fillOpacity: 1
          }

          if (feature.properties.data.SUPPORT_REP_1877) {
            styleObject.fillColor = '#6A6A6A'
            styleObject.color = '#F6F6F6'
          }

          if (feature.properties.data.VBSC_1879_CH) {
            styleObject.color = '#FFFFFF'
            styleObject.weight = 3
          }

          return styleObject

        }
      })
      .addTo(map)
  }


}

var MapTool = new MapUtilityClass();

const map = MapTool.initMap();

MapTool.createCountyBoundries(map);