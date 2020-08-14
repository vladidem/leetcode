/**
 * @param {number[]} groupSizes
 * @return {number[][]}
 */
var groupThePeople = function (groupSizes) {
  const fullGroups = [];
  const nonFullGroups = {};

  groupSizes.forEach((groupSize, number) => {
    const group = nonFullGroups[groupSize] || [];
    group.push(number);

    if (group.length === groupSize) {
      fullGroups.push(group);
      nonFullGroups[groupSize] = null;
    } else {
      nonFullGroups[groupSize] = group;
    }
  });
  return fullGroups;
};

module.exports = { groupThePeople };
