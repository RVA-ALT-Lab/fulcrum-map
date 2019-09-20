var MapUtilityClass = function ($) {
  var self = this;

  this.initMap = function ( ) {

      var mymap = L.map('map').setView([37.5851, -79.0514], 7);
      L.tileLayer('https://api.mapbox.com/styles/v1/jeffeverhart383/ck0qtifls19re1cmx0xkq0u19/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6IjIwNzVlOTA3ODI2MTY0MjM3OTgxMTJlODgzNjg5MzM4In0.QA1GsfWZccIB8u0FbhJmRg', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6ImNqOXI2aDg5ejZhYncyd3M0bHd6cWYxc2oifQ.fzcb7maGkQhAxRZTotB4tg'
      }).addTo(mymap);
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