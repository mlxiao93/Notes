// 在排序数组中查找元素的第一个和最后一个位置

const arr = [0, 1, 2, 2, 2, 3, 4, 5, 5, 5, 5, 6, 7, 8, 9, 10, 11, 12];

function binarySearch(arr, target, flag = 0) {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    let mid = parseInt((lo + hi) / 2);
    let midVal = arr[mid];
    if (midVal === target) {
      if (flag === 0) return mid;
      if (flag === -1 && (mid === 0 || arr[mid - 1] !== target)) return mid;
      if (flag === 1 && (mid === arr.length - 1 || arr[mid + 1] !== target)) return mid;

      if (flag === -1) hi = mid - 1;
      if (flag === 1) lo = mid + 1;
    } else if (midVal > target) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return -1;
}

// console.log(binarySearch(arr, 2, -1), binarySearch(arr, 2, 1));
