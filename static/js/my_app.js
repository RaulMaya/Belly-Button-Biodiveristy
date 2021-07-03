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
  var selectedSubject = parseInt(dropdownMenu.property("value"));
  var demographicInfo = d3.select("#sample-metadata");
  demographicInfo.html("");

  Object.entries(metadata[id_dict[selectedSubject]]).map(([key, value]) => {
    demographicInfo.append("p").text(`${key}: ${value}`);
  });

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


      var demographicInfo = d3.select("#sample-metadata");
      demographicInfo.html("");

      Object.entries(metadata[id_dict[selectedSubject]]).map(([key, value]) => {
        demographicInfo.append("p").text(`${key}: ${value}`);
      });

      var otu_names = samples[id_dict[selectedSubject]].otu_ids;
      var sample_value = samples[id_dict[selectedSubject]].sample_values;
      var otu_label = samples[id_dict[selectedSubject]].otu_labels;
      var otu_id_names = [];
      for (let i = 0; i < otu_names.length; i++) {
        otu_id_names.push(`otu ${otu_names[i]}`);
      };
      console.log(otu_id_names);
      console.log(sample_value);

      var sliced_otu_names = otu_id_names.slice(0,10).reverse();
      var sliced_samples = sample_value.slice(0,10).reverse();
      console.log(sliced_otu_names);
      console.log(sliced_samples);

      var trace1 = {
          type: 'bar',
          y: sliced_otu_names,
          x: sliced_samples,
          text: otu_label,
          orientation : "h"
        };

      var data = [trace1]

      var layout = {
          title: {text: "Top 10 Bacteria Cultures Found",
          font: {size: 20,
              family: "Arial"},
          y : .90
            },
          margin: { l: 100, r: 10, t: 100, b: 50 }

        };


      Plotly.newPlot('bar', data, layout);

      var data = [
          {
              mode: "gauge+number",
              value: wfreq,
              type: "indicator",
              domain: { x: [0, 1], y: [0, 1] },
              title: { text: "Belly Button Scrubs per Week",font: {size: 20, family: "Arial"}},
              delta: {'reference': 400, 'increasing': {'color': "RebeccaPurple"}},
              gauge: {
                  axis: { range: [null, 9],
                      bar:{color:"darkblue"},
                      bgcolor:"white",
                      borderwidth: 2,
                      bordercolor:"gray",
                      tickmode:"linear",
                      steps: [{'range': [0, 250], 'color': 'cyan'},
                      {'range': [250, 400], 'color': 'royalblue'}]
                  },
                  threshold: {
                    line: {'color': "red", 'width': 4},
                    thickness: 0.75,
                    value: wfreq
                    }
                  },
                }
              ];

      var layout = {margin: { l: 20, r: 20, t: 20, b: 20 },
      paper_bgcolor:"lavender",
      font:{'color': "darkblue", 'family': "Arial"} };

      Plotly.newPlot('gauge', data, layout);

    };

});
