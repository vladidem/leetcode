const generateArray = (length) => {
  const res = {};

  for (let i = 1; i <= length; i++) {
    res[i] = true;
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  const neededPositives = generateArray(nums.length);

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];

    if (num > 0 && neededPositives[num]) {
      neededPositives[num] = false;
    }
  }

  for (let i = 1; i <= nums.length; i++) {
    if (neededPositives[i]) {
      return i;
    }
  }

  return nums.length + 1;
};

const input = [3, 4, -1, 1];

const res = firstMissingPositive(input);

const fin = true;
