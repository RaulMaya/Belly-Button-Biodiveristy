path = "../../samples.json";

// Fetch the JSON data and console log it
d3.json(path).then(function(data) {
  console.log(data);
});
