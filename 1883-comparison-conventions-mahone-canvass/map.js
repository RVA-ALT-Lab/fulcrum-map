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

        if (
          feature.properties.data.VBSC_1883_CH ||
          feature.properties.data.BBA_1882_CH ||
          feature.properties.data.CSBA_1881_CH ||
          feature.properties.data.NNBA_1881_CH
          ) {
            console.log('true')
          let stripes = new L.StripePattern({color:'#A9A9A9',spaceColor: '#DCDCDC',spaceOpacity: 1, angle: -45})
          stripes.addTo(map)
          console.log(stripes)
          styleObject.fillPattern = stripes
          styleObject.weight = 1
          // styleObject.color = '#F6F6F6'
        }

        if (feature.properties.data.MC_TOT_CH_1883) {
          styleObject.color = '#6A6A6A'
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