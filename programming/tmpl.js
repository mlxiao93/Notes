import fs from 'fs'

const input = fs.readFileSync('./tmpl.ejs', 'utf-8')

/**
 * 实现一个简易模板引擎
 * 
 * 整个过程就是在拼接html
 */
function tmpl(input, data) {
  let code = `const result = [];`;

  code += `result.push(\`${
    input.replace(/<%=(.+?)%>/g, '`); result.push($1); result.push(`')
      .replace(/<%(.+?)%>/g, '`); $1 result.push(`')
  }\`);` 

  code += `return result.join('');`;

  return new Function('data', code)(data);
}

const html = tmpl(input, [{
  name: '张三'
},
{
  name: '李四'
}]);

console.log(html)