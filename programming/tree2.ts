interface TreeNode {
  id?: string
  val?: number
  children?: TreeNode[],
  score?: number
}

const root: TreeNode = {
  id: 'a',
  children: [
    {
      id: 'b',
      children: [
        {val: 1}, {val: 2}, {val: 3}
      ]
    },
    {
      id: 'c',
      children: [
        {val: 5}
      ]
    },
    {
      id: 'd',
      children: [
        {val: 8}, {val: 9}
      ]
    }
  ]
}

function maxAvageNodes(root: TreeNode): {sum: number, count: number} {
  if (!root.children) {
    return {
      sum: root.val || 0,
      count: root.val === undefined ? 0 : 1
    }
  };

  let res = {
    sum: 0,
    count: 0
  }

  for (let child of root.children) {
    const {sum, count} =  maxAvageNodes(child);
    res.sum += sum;
    res.count += count;
  }

  return res;
}

function foo(root: TreeNode): TreeNode[] {
  const maxReses: ReturnType<typeof maxAvageNodes>[] = []
  const maxNodes: TreeNode[] = []
  function maxAvageNodes(root: TreeNode): {sum: number, count: number} {
    if (!root.children) {
      return {
        sum: root.val || 0,
        count: root.val === undefined ? 0 : 1
      }
    };
  
    let res = {
      sum: 0,
      count: 0
    }
  
    for (let child of root.children) {
      const {sum, count} =  maxAvageNodes(child);
      res.sum += sum;
      res.count += count;
    }
    root.score = res.sum / res.count;
  
    if (maxNodes.length < 3) {
      maxNodes.push(root);
      maxReses.push(res);
    } else {
      for (let i = 0; i < maxReses.length; i++) {
        const maxRes = maxReses[i];
        if (res.sum / res.count > maxRes.sum / maxRes.count) {
          maxReses[i] = res;
          maxNodes[i] = root;
          break;
        }
      }
    }


    return res;
  }
  maxAvageNodes(root);

  return maxNodes;
}


console.log(foo(root));


