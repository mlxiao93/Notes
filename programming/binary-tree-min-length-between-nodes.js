/**
 * 给定一个二叉树, 找到该树中两个指定节点间的最短距离
 */

 function TreeNode(val) {
   this.val = val;
   this.left = this.right = null;
 }

 const nodes = Array(12).fill(null).map((v, i) => new TreeNode(i));

nodes[1].left = nodes[2];
nodes[1].right = nodes[3];
nodes[2].left = nodes[4];
nodes[2].right = nodes[5];
nodes[3].left = nodes[6];
nodes[3].right = nodes[7];
nodes[4].left = nodes[8];
nodes[4].right = nodes[9];
nodes[6].left = nodes[10];
nodes[6].right = nodes[11];

function maxDepth(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left, root.right)) + 1;
}




/**
 * q与q之间的最短路径长度
 */
function getMinLength(root, p, q) {
  // 1. 先计算最近的共同祖先
  const closestParent = getClosestCommonParent(root, p, q);

  // 2. 计算祖先到p和q的路径长度，相加
  const pathP = getPath(closestParent, p);
  const pathQ = getPath(closestParent, q);
  return pathP.length + pathQ.length - 2;
}

/**
 * p与q之间最近的共同祖先
 */
function getClosestCommonParent(root, p, q) {
  if (!root) return null;
  if (root.val === p.val || root.val === q.val) return root;
  const left = getClosestCommonParent(root.left, p, q);
  const right = getClosestCommonParent(root.right, p, q);
  if (left && right) return root;
  if (left) return left;
  if (right) return right;
  return null;
}

/**
 * root到target的路径
 */
function getPath(root, target, path = []) {
  if (!root) return
  path.push(root);
  if (root.val === target.val) return path;
  let leftPath = getPath(root.left, target, path);
  let rightPath = getPath(root.right, target, path);
  if (!leftPath && !rightPath) {
    path.pop();
    return;
  };
  return path;
}


function getPath2(root, target, path = []) {
  if (!root) return null;
  if (root.val === target.val) {
    path.unshift(root);
    return path;
  };

  const leftPath = getPath2(root.left, target, path);
  const rightPath = getPath2(root.right, target, path);

  if (leftPath || rightPath) {
    path.unshift(root);
    return path;
  };

  return null
}

function allPaths(root, path = [], pathes = []) {
  if (!root) {
    pathes.push(path);
    return pathes;
  };
  path.push(root);
  allPaths(root.left, [...path], pathes);
  allPaths(root.right, [...path], pathes);
  return pathes;
}

// console.log(allPaths(nodes[1]));
// console.log(getPath2(nodes[1], nodes[9]))

// console.log(getMinLength(nodes[1], nodes[8], nodes[5]));