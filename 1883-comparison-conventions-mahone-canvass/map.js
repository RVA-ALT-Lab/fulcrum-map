var MapUtilityClass = function ($) {
  var self = this;
  this.geoJson;
  this.initMap = function ( ) {

      var mymap = L.map('map').setView([37.5851, -79.0514], 7);
      return mymap;
  }

  this.processStyles = function(feature) {
    const canvassChecked = document.querySelector('.interactive.canvass').checked
    console.log('Canvass: ' + canvassChecked)
    const associationsChecked = document.querySelector('.interactive.other').checked
    console.log('Associations: ' + associationsChecked)
    const styleObject = {
      weight: 1,
      opacity: .9,
      color: '#6A6A6A',
      fillColor: '#DCDCDC',
      fillOpacity: 1
    }

    if ((
      feature.properties.data.VBSC_1883_CH ||
      feature.properties.data.BBA_1882_CH ||
      feature.properties.data.CSBA_1881_CH ||
      feature.properties.data.NNBA_1881_CH
      ) && associationsChecked === true) {
      let stripes = new L.StripePattern({color:'#A9A9A9',spaceColor: '#DCDCDC',spaceOpacity: 1, angle: -45})
      stripes.addTo(map)
      styleObject.fillPattern = stripes
      styleObject.weight = 1
      // styleObject.color = '#F6F6F6'
    } else {
      styleObject.fillPattern = null
    }

    if (feature.properties.data.MC_TOT_CH_1883 && canvassChecked === true) {
      styleObject.color = '#6A6A6A'
      styleObject.weight = 3
    }

    return styleObject

  }

  this.createCountyBoundries = function (map) {
    return new Promise((resolve, reject) => {
      const geoJson = L.geoJSON(countiesJSON, {
        style: this.processStyles
      })
      this.geoJson = geoJson
      geoJson.addTo(map)
      resolve()
    })
  }

  this.createNewLegend = (map) => {
    return new Promise( (resolve, reject) => {
      const legend = L.control({position: 'bottomleft'})
    this.legendControl = legend
    legend.onAdd = (map) => {
      var div = L.DomUtil.create('div', 'info legend')
      div.in = 'legend'
      let legendContents = '<h4>Comparison of Conventions and Mahone Canvass c. 1883</h4>'
      legendContents += '<input type="checkbox" class="interactive canvass" value="Canvass" checked><i style="box-sizing: border-box;border: 3px solid #6A6A6A;"></i>Mahone 1883 Canvass<br><br>'
      legendContents += '<input type="checkbox" class="interactive other" value="Associations" checked><i style="background: repeating-linear-gradient(-45deg,#A9A9A9,#A9A9A9 5px,#DCDCDC 5px,#DCDCDC 10px)"></i>Baptist Associations, 1881-1883<br>'
      div.innerHTML = legendContents
      return div
    }
    legend.addTo(map)
    resolve()
    })
  }

  this.logInteractivity = (e) => {
    console.log(e.target.value)
    console.log('this is getting called')
  }


}

var MapTool = new MapUtilityClass();

const map = MapTool.initMap();

MapTool.createNewLegend(map).then(() => {
  MapTool.createCountyBoundries(map).then(() => {
    document.querySelector('.interactive.canvass').addEventListener('change', (e) => MapTool.geoJson.setStyle(MapTool.processStyles))
    document.querySelector('.interactive.other').addEventListener('change', (e) => MapTool.geoJson.setStyle(MapTool.processStyles))
  });
});