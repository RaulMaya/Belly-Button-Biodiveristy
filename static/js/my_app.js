console.log("Raul Maya");

var id_dict = {};

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
  console.log(metadata)
  console.log(names)
  console.log(samples)

  for (let i = 0; i < names.length; i++) {
    id_dict[names[i]] = i;
  };

  names.map(names => {
    dropdownMenu.append("option").text(names);
  });

  console.log(id_dict[941])

  dropdownMenu.on('change', runEnter);
  function runEnter() {

      var selectedSubject = parseInt(dropdownMenu.property("value"));
      console.log(selectedSubject);
      console.log(metadata[id_dict[selectedSubject]]);
      var ethnicity = metadata[id_dict[selectedSubject]].ethnicity;
      var gender = metadata[id_dict[selectedSubject]].gender;
      var age = metadata[id_dict[selectedSubject]].age;
      var location = metadata[id_dict[selectedSubject]].location;
      var type = metadata[id_dict[selectedSubject]].bbtype;
      var wfreq = metadata[id_dict[selectedSubject]].wfreq;

      console.log(ethnicity);
      console.log(gender);
      console.log(age);
      console.log(location);
      console.log(type);
      console.log(wfreq);

      var demographicInfo = d3.select("#sample-metadata");
      demographicInfo.html("");
    }

});
