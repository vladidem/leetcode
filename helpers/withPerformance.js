const { performance } = require('perf_hooks');

const withPerformance = (cb, label = '') => {
  var t0 = performance.now();
  result = cb();
  var t1 = performance.now();
  console.log(`${label} call took ${(t1 - t0) / 1000} seconds.`);

  return result;
};

module.exports = withPerformance;
