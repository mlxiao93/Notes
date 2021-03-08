var findOrder = function (numCourses, prerequisites) {
  /**
   * 使用DFS
   * 从任意一门课程开始搜索
   * 
   * 未搜索过的课程状态记为-1
   * 搜索中的课程状态记为0
   * 搜索完成的课程状态记为1   --- 课程无前置课程代表搜索完成
   */

  // 转为邻接表，便于搜索
  const adjList = Array(numCourses).fill().map(i => []);
  for (pair of prerequisites) {
    adjList[pair[0]].push(pair[1]);
  }

  let result = [];

  // 记录课程的搜索状态
  let visitMap = Array(numCourses).fill(-1);
  function visit(node) {

    if (visitMap[node] !== -1) return

    visitMap[node] = 0;

    let finished = true;

    for (next of adjList[node]) {
      visit(next);
      if (visitMap[next] !== 1) finished = false
    }

    // 没有子节点或者所有的子节点都搜索完成时，当前节点置为搜索完成，可以开始学习了
    if (finished) {
      visitMap[node] = 1;
      result.push(node); 
    }
  }

  for (let node = 0; node < numCourses; node++) {
    (visitMap[node] === -1) && visit(node);
  }

  return result;
};

console.log(findOrder(3, [[1,0],[1,2],[0,1]]));