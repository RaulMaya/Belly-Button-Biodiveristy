
console.log("Raul Maya");

var ids = [];

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

var dropdownMenu = d3.select("#selDataset");
var dataset = dropdownMenu.node().value;

path = "data/samples.json";


d3.json(path).then(function(data) {

  var metadata = data.metadata;
  var names = data.names;
  var samples =  data.samples;
  console.log(metadata[0].id)
  for (let i = 0; i < metadata.length; i++) {
    ids.push(metadata[i].id);
    console.log(metadata[i]);
  }
  ids.map(ids => {
    dropdownMenu.append("optionChanged(this.value)").text(ids);
  });

});
console.log(ids)
