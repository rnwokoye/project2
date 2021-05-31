// define drop down menu:

var url = 'http://127.0.0.1:5000/data'
// using this portion to test code
d3.json(url).then(function(data) {
});


function dropdown(){
  var url = 'http://127.0.0.1:5000/data'
  var ID = d3.select("#selDataset");
  d3.json(url).then(function(data){
      var countries = data.Country;
      countries.forEach((country)=>{
          ID.append("option")
          .text(country.Name)
      })
      var country1 = countries[0];
      buildMetadata(country1.Name);
      buildCharts(country1.Name);
  })
}
dropdown()

function optionChanged(newCountry){
  buildMetadata(newCountry);
  buildCharts(newCountry);
}

function buildMetadata(country){
  d3.json(url).then(function(data){
    var countryInfo = data.Country
    var filterdata = countryInfo.filter(sampleobject => sampleobject.Name == country)[0];
    var result = filterdata;
    var sampleData = d3.select("#sample-metadata");
    sampleData.html("");
    Object.entries(result).forEach(function([key, value]){
      var row = sampleData.append("p");
      row.text(`${key}: ${value}`)
    })
  })

}

// ToDo Wite code for charts here:
function buildCharts(sample) {
  // Use d3.json to get data
  d3.json(url).then(function(data) {
      var countryInfo = data.Country;
      // console.log(countryInfo)
      var filterdata = countryInfo.filter(sampleobject => sampleobject.Name == sample)[0];
      var result = filterdata;
      // console.log(result.GDP)
  
      var GDP = result.GDP / 100;
      var Education = result.Education;
      var Food = result.Food;
      var Health = result.Health;
      var Housing = result.Housing;
      var Work = result.Work;
      var QalityOfLife = result.QualityOfLife;
      var yAxis = ['GDP','Education','Food','Health','Work','Housing']
      var yAxis2 = ['Education','Food','Health','Work','Housing']
      var xAxis2 = [Education,Food,Health,Work,Housing,]
      var xAxis = [GDP,Education,Food,Health,Work,Housing,]
      // console.log(QalityOfLife)

      //barchart Horizontal:
      var barchart = [{
        y: yAxis,
        x: xAxis,
        type: 'bar',
        orientation: 'h'
      }];

      var barlayout = {
        title: "Top RIghts Scores"
      }

      Plotly.newPlot('bar', barchart, barlayout)

      // guage_plot
      var gauge_plot = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: QalityOfLife,
        type: "indicator",
        mode: "gauge+number",
        gauge: {
        axis: { range: [null, 100] },
        bar: {color: '7EA397'},
        bgcolor: "white"        
                }

      }];
      var gaugelayout = {
        title: "Quality of Life Score",
        paper_bgcolor: 'white'
      }

      Plotly.newPlot('gauge', gauge_plot, gaugelayout);

      var bubbledata = [{
        x: yAxis2,
        y: xAxis2,
        text: yAxis2,
        mode: 'markers',
        marker: {
          size: xAxis2,
          color: xAxis,
          coloscale: "Earth"
        }
      }];

      var bubblelayout = {
        title: "BubbleChart",
        xaxis: {
          title: "Scores vs GDP"
        }
      }

      Plotly.newPlot('bubble', bubbledata, bubblelayout)
      
  })    



        
}