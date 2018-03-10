// a closure to calculate the nth percentile
var percentile = function(responses) {
  responses.sort();
  var nthpercentile = function(n) {
    var index = (n / 100) * responses.length;
    var percentile = 0;
    if (Math.floor(index) == index)
      percentile = (responses[index] + responses[index-1])/2;
    else
      percentile = responses[Math.floor(index)];
    return percentile;
  };

  return nthpercentile;
};

module.exports = percentile;
