var MapUtilityClass = function ($) {
  var self = this;
  this.geoJson;
  this.initMap = function ( ) {

      var mymap = L.map('map').setView([37.5851, -79.0514], 7);
      return mymap;
  }

  this.fetchRawJson = function () {
    return new Promise((resolve, reject) => {
      fetch('../va-counties-town-cities-extended.json')
      .then((data) => data.json())
      .then((json) => {
        resolve(json)
      })
    })
  }

  this.createCountyBoundries = function (map) {
    return new Promise((resolve, reject) => {
      this.fetchRawJson().then(json => {
        const geoJson = L.geoJSON(json, {
          style: this.processStyles
        })
        this.geoJson = geoJson
        geoJson.addTo(map)
        resolve()
      })
    })
  }

  this.processStyles = function(feature) {
    const democraticSupportChecked = document.querySelector('.interactive.democraticSupport').checked
    const republicanSupportChecked = document.querySelector('.interactive.republicanSupport').checked
    const vbscChecked = document.querySelector('.interactive.vbsc').checked
    //TODO: Play around with default styles and find a lighter shade of grey

    const styleObject = {
      weight: 1,
      opacity: .9,
      color: '#6A6A6A',
      fillColor: '#F6F6F6',
      fillOpacity: 1
    }
    if (feature.properties.data.SUPPORT_REP_1881 === '' && democraticSupportChecked){
      // apply current default styles
      styleObject.fillColor = '#DCDCDC'
    }


    if (feature.properties.data.SUPPORT_REP_1881 && republicanSupportChecked === true) {
      styleObject.fillColor = '#6A6A6A'
      styleObject.color = '#F6F6F6'
    }

    if (feature.properties.data.VBSC_1881_CH && vbscChecked === true) {
      styleObject.color = '#FFFFFF'
      styleObject.weight = 3
    }
    return styleObject

  }

  this.createNewLegend = (map) => {
    return new Promise((resolve, reject)=> {
      const legend = L.control({position: 'bottomleft'})
      this.legendControl = legend
      legend.onAdd = (map) => {
        var div = L.DomUtil.create('div', 'info legend')
        div.in = 'legend'
        let legendContents = '<h4>1881 Gubernatorial Election Results</h4>'
        legendContents += '<h5>Percentage of Votes for Republicans</h5>'
        legendContents += '<input type="checkbox" class="interactive democraticSupport" value="democraticSupport" checked>&nbsp;<i style="background:#DCDCDC;"></i>22% - 50%<br>'
        legendContents += '<input type="checkbox" class="interactive republicanSupport" value="republicanSupport" checked>&nbsp;<i style="background:#6A6A6A;"></i>51% - 93%<br><br>'
        legendContents += '<input type="checkbox" class="interactive vbsc" value="vbsc" checked>&nbsp;White Outline: Virginia Baptist State Convention 1881<br>'
        div.innerHTML = legendContents
        return div
      }
      legend.addTo(map)
      resolve()
    })
  }


}

var MapTool = new MapUtilityClass();

const map = MapTool.initMap();

MapTool.createNewLegend(map).then(() => {
  MapTool.createCountyBoundries(map).then(() => {
    document.querySelector('.interactive.democraticSupport').addEventListener('change', (e) => MapTool.geoJson.setStyle(MapTool.processStyles))
    document.querySelector('.interactive.republicanSupport').addEventListener('change', (e) => MapTool.geoJson.setStyle(MapTool.processStyles))
    document.querySelector('.interactive.vbsc').addEventListener('change', (e) => MapTool.geoJson.setStyle(MapTool.processStyles))
  });
});