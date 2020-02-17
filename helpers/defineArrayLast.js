module.exports = () => {
  if (!Array.prototype.last) {
    Array.prototype.last = function() {
      return this.slice(-1)[0];
    };
  }
};
