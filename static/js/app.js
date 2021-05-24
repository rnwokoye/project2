// define drop down menu:

data_set = ['Aruba', 'Nigeria', 'Brazil']
myjsonData= {
    "Afghanistan": {
        "GDP_per_capita_": 1758.465636222116, 
        "Income_Adjusted_QOL": NaN, 
        "RT_EducationScore": NaN, 
        "RT_FoodScore": 54.366987443654146, 
        "RT_HealthScore": 69.67353284892195, 
        "RT_HousingScore": 53.75877533367378, 
        "RT_WorkScore": NaN, 
        "Year": 2017, 
        "abv": "AFG", 
        "id": "60a9440fc39de0586f2a867b", 
        "name": "Afghanistan"
      }, 
      "Albania": {
        "GDP_per_capita_": 11796.719184736306, 
        "Income_Adjusted_QOL": 86.49827925584546, 
        "RT_EducationScore": 88.53628516508903, 
        "RT_FoodScore": 69.84808602777255, 
        "RT_HealthScore": 93.57718958727025, 
        "RT_HousingScore": 90.98970000685861, 
        "RT_WorkScore": 89.5401354922369, 
        "Year": 2017, 
        "abv": "ALB", 
        "id": "60a9440fc39de0586f2a8691", 
        "name": "Albania"
      }, 
      "Algeria": {
        "GDP_per_capita_": 47554.921323477196, 
        "Income_Adjusted_QOL": NaN, 
        "RT_EducationScore": 90.2172659984542, 
        "RT_FoodScore": NaN, 
        "RT_HealthScore": NaN, 
        "RT_HousingScore": 94.96165169595236, 
        "RT_WorkScore": 99.42160591566613, 
        "Year": 2017, 
        "abv": "DZA", 
        "id": "60a9440fc39de0586f2a88c2", 
        "name": "Algeria"
      }
}

function dropdown(){
    var ID = d3.select("#selDataset");
    d3.json("/data", function(data) {
        console.log(data)
    })
    console.log(data_set)
    var id = data_set
    id.forEach((sampleName) => {
        ID.append("option")
        .text(sampleName)
        .property('Value', sampleName)
    })
    // var sample1 = id[0];
    // buildMetadata(sample1);
    // buildCharts(sample1);
    // d3.json("samples.json").then((data)=>{
    //     var id = data.names;
    //     id.forEach((sampleid)=>{
    //         ID.append("option")
    //         .text(sampleid)
    //         .property("value",sampleid)
    //     })
    //     var sample1 = id[0];
    //     buildMetadata(sample1);
    //     buildCharts(sample1);
    // })
}


dropdown()
// Test that js is working:
var lettersArray = ["a", "b", "c", "d"];
console.log('My script is working')
console.log(lettersArray)