const maxModifications = 1;

const getBadPoint = (nums, startingPoint = 0) => {
  for (let i = startingPoint; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      return i + 1;
    }
  }

  return false;
};

const fixBadPoint = (nums, badPoint) => {
  // if bad point is at the end, or if without it order is ok
  if (
    badPoint === nums.length - 1 ||
    nums[badPoint + 1] >= nums[badPoint - 1]
  ) {
    nums[badPoint] = nums[badPoint - 1];
  }
  // else problem is in previous to bad point
  else {
    nums[badPoint - 1] = nums[badPoint];
  }
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  for (i = 0; i < maxModifications; i++) {
    let badPoint = getBadPoint(nums);

    if (!badPoint) {
      break;
    }
    fixBadPoint(nums, badPoint);
  }

  if (getBadPoint(nums)) {
    return false;
  }

  return true;
};

const test = [1, 2, 4, 5, 3];

const res = checkPossibility(test);
