// a closure to calculate the nth percentile
const percentile = function(responses) {
  let data = responses.slice(0);
  data.sort();
  let nthpercentile = function(n) {
    let index = (n / 100) * data.length;
    let percentile = 0;
    if (Math.floor(index) == index)
      percentile = (data[index] + data[index - 1]) / 2;
    else
      percentile = data[Math.floor(index)];
    return percentile;
  };

  return nthpercentile;
};

module.exports = percentile;
