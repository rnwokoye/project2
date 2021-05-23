//define dropdown menu
function dropdown(){
    var ID = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
        var id = data.names;
        id.forEach((sampleid)=>{
            ID.append("option")
            .text(sampleid)
            .property("value",sampleid)
        })
        var sample1 = id[0];
        buildMetadata(sample1);
        buildCharts(sample1);
    })
}

dropdown()