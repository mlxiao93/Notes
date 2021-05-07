interface TreeNode {
  val: number
  left?: TreeNode
  right?: TreeNode
}

function traverse(root: TreeNode, path: string = '', pathes: string[] = []): string[] {
  // const res: string[] = [];

  if (!root) {
    return pathes;
  }

  if (!path) {
    path += root.val;
  } else {
    path += '->' + root.val;
  }

  if (!root.left && !root.right) {
    pathes.push(path);
    return pathes;
  } 

  traverse(root.left, path, pathes);
  traverse(root.right, path, pathes);

  return pathes;
}

const root: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3
    }
  },
  right: {
    val: 4,
    left: {
      val: 5,
      left: {
        val: 6
      }
    },
    right: {
      val: 7,
      left: {
        val: 8,
        left: {
          val: 9
        }
      }
    }
  }
}

// const paths = traverse(root);

// console.log(paths);


