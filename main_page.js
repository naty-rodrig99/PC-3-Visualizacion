// Load the data from a Google Spreadsheet
//https://docs.google.com/spreadsheets/d/1UVdl0THA_Su5XDIeRu4Shgl5EXZcDB4dbShReeDF4Bc/edit?usp=sharing
var pais;

Highcharts.data({
    googleSpreadsheetKey: '1UVdl0THA_Su5XDIeRu4Shgl5EXZcDB4dbShReeDF4Bc',

    // Custom handler when the spreadsheet is parsed
    parsed: function (columns) {

        // Read the columns into the data array
        var data = [];
        var data2 = [];
        var arrays = {};
        Highcharts.each(columns[0], function (code, i) {
            data.push({
                type: 'map',
                code: code.toUpperCase(),
                name: columns[1][i],
                value: parseFloat(columns[2][i]),
                drilldown: code.toUpperCase()
            });
            data2 = [
                {
                  //type: 'column',
                  name: "GDP",
                  id: "GDP",
                  y: parseFloat(columns[3][i]),
                  color: '#7DD959'
                },
                {
                  //type: 'column',
                  name: "Social Support",
                  y: parseFloat(columns[4][i]),
                  color: '#B2E35D'
                },
                {
                  //type: 'column',
                  name: "Healthy life expectancy",
                  y: parseFloat(columns[5][i]),
                  color: '#CBCC5D'
                },
                {
                  //type: 'column',
                  name: "Freedom",
                  y: parseFloat(columns[6][i]),
                  color: '#E3D65D'
                },
                {
                  //type: 'column',
                  name: "Generosity",
                  y: parseFloat(columns[7][i]),
                  color: '#D4A54E'
                },
                {
                  //type: 'column',
                  name: 'Corruption',
                  y: parseFloat(columns[8][i]),
                  color: '#C98442'
                },


          ];
            arrays[columns[1][i]] = {
                type: 'bar',
                name: columns[1][i],
                data: data2
              };
            
        });

        
        // Initiate the map chart
        Highcharts.mapChart('container1', {
            chart: {
                map: 'custom/world',
                borderWidth: 1,
                borderColor: '#38362B',
                
                legend: {
                  title: {
                      text: 'Score',
                      style: {
                          color: ( // theme
                              Highcharts.defaultOptions &&
                              Highcharts.defaultOptions.legend &&
                              Highcharts.defaultOptions.legend.title &&
                              Highcharts.defaultOptions.legend.title.style &&
                              Highcharts.defaultOptions.legend.title.style.color
                          ) || 'black'
                      }
                  },
                  align: 'left',
                  verticalAlign: 'bottom',
                  floating: true,
                  layout: 'vertical',
                  valueDecimals: 0,
                  backgroundColor: ( // theme
                      Highcharts.defaultOptions &&
                      Highcharts.defaultOptions.legend &&
                      Highcharts.defaultOptions.legend.backgroundColor
                  ) || 'rgba(255, 255, 255, 0.85)',
                  symbolRadius: 0,
                  symbolHeight: 14
              },

                events: {
                    drilldown: function(e) {
                      
                      if (!e.seriesOptions) {
                        var chart = this;
                        pais = e.point.name; 
                        
                        series = arrays[e.point.name],  
                        name = e.point.name;        
                        chart.addSeriesAsDrilldown(e.point, series);
                        
                        chart.update({
                          chart: {
                            type: 'column',
                            inverted: false,
                            animation: false,
                            stacking: true,
                            colorByPoint: true,
                            colorAxis: false,
                            legend:{ enabled:false }
                          },
                          title: {
                            text: name
                          },
                          xAxis: [{
                            visible: true,
                            categories: [
                              "GDP", 
                              "Social Support",
                              "Healthy life expectancy",
                              "Freedom",
                              "Generosity",
                              "Corruption"
                          ],
                          }],
                          yAxis: [{
                            visible: true,
                            reversed: false
                          }]
                        });
                      }
              
              
                      this.setTitle(null, {
                        text: e.point.name
                      });
                    },
                    drillup: function() {
                      // this.setTitle(null, { text: 'USA' });
                    },
                    drillupall: function() {
              
                      this.update({
                        chart: {
                          type: 'map',
                          inverted: false,
                          animation: true
                        },
                        title: {
                          text: 'World Happiness 2019'
                        },
                        xAxis: [{
                          visible: false
                        }],
                        yAxis: [{
                          visible: false,
                          reversed: true
                        }]
                      });
                    }
                  }

                
            },

            title: {
                text: 'World Happiness 2019'
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                dataClasses: [{
                    to: 0,
                    color: '#BEC99D'
                }, {
                    from: 0,
                    to: 1000,
                    color: '#D2E190'
                }, {
                    from: 2001,
                    to: 3000,
                    color: '#B5CF49'
                }, {
                    from: 3001,
                    to: 4000,
                    color: '#A3BF45'
                }, {
                    from: 4001,
                    to: 5000,
                    color: '#81A140'
                }, {
                    from: 5001,
                    to: 7000,
                    color: '#74923A'
                }, {
                    from: 7000,
                    color: '#617B30'
                }]
            },

            series: [{
                type: 'map',
                data: data,
                joinBy: ['iso-a3', 'code'],
                animation: true,
                name: 'Score',
                states: {
                    hover: {
                        color: '#FFCC01'
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                shadow: false
            }],
    
        }); 

    },
    error: function () {
        document.getElementById('container1').innerHTML = '<div class="loading">' +
            '<i class="icon-frown icon-large"></i> ' +
            'Error loading data from Google Spreadsheets' +
            '</div>';
    }
});


