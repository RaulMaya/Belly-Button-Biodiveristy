function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

path = "data/samples.json";


d3.json(path).then(function(data) {
  console.log(data);
  var metadata = data.metadata;
  var names = data.names;
  var samples =  data.samples;

  console.log(metadata);
  console.log(names);
  console.log(samples);
});
