// define drop down menu:

var url = 'http://127.0.0.1:5000/data'
// using this portion to test code
// d3.json(url).then(function(data) {
  // console.log(data.Country[0])
  // var country = 'Aruba'
  // var sample = data.Country
  // console.log(sample.name)
  // var filtersample = sample.filter(sampleobject => sampleobject.name == country);
  // console.log(filtersample)
// });
//   var test = data.Country;
//   test.forEach((country)=>{
//     console.log(country.id)
//     // AID.append("name")
//     // .text()
//   })
// });

function dropdown(){
  var url = 'http://127.0.0.1:5000/data'
  var ID = d3.select("#selDataset");
  d3.json(url).then(function(data){
      var countries = data.Country;
      countries.forEach((country)=>{
          ID.append("option")
          .text(country.name)
          // .property("value",country.name)
      })
      var country1 = countries[0];
      buildMetadata(country1);
      // buildCharts(country1);
  })
}
dropdown()

function optionChanged(newCountry){
  buildMetadata(newCountry)
  // buildCharts(newCountry)
  // gguage_plot(newCountry)
}


function buildMetadata(country){
  d3.json(url).then(function(data){
    var countryInfo = data.Country
    var filterdata = countryInfo.filter(sampleobject => sampleobject.name == country);
    var result = filterdata[0];
    var sampleData = d3.select("#sample-metadata");
    sampleData.html("");
    Object.entries(result).forEach(function([key, value]){
      // fix this if condition
      if(result) {
        var row = sampleData.append("p");
        row.text(`${key}: ${value}`)
      }
    })
  })

}

// ToDo Wite code for charts here:

// function buildCharts(sample) {
//   // Use d3.json to get data
//   d3.json(url).then(function(data) {
//       var metadata = data.Country;
//       var filterdata = metadata.filter(sampleobject => sampleobject.Year==sample);
//       var result = filterdata[0];
//       var OTU_ids = result.otu_ids;
//       var OTU_labels = result.otu_labels;
//       var samplevalue = result.sample_values;
//       console.log(metadata)
//   })
// }