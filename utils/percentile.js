// a closure to calculate the nth percentile
var percentile = function(responses) {
  var data = responses.slice(0);
  data.sort();
  var nthpercentile = function(n) {
    var index = (n / 100) * data.length;
    var percentile = 0;
    if (Math.floor(index) == index)
      percentile = (data[index] + data[index - 1]) / 2;
    else
      percentile = data[Math.floor(index)];
    return percentile;
  };

  return nthpercentile;
};

module.exports = percentile;
