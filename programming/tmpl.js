import fs from 'fs'

const tmpl = fs.readFileSync('./tmpl.ejs', 'utf-8')

/**
 * 实现一个简易模板引擎
 * 
 * 整个过程就是在拼接html
 */

function compileTmpl(tmpl, data) {
  const code = `
    const res = [];
    res.push(\`${tmpl.replace(/<%=(.+?)%>/g, `\`);res.push($1);res.push(\``)
      .replace(/<%(.+?)%>/g, `\`);$1res.push(\``)
    }\`);
    return res.join('');
  `
  return (new Function('data', code))(data)
}

const html = compileTmpl(tmpl, [{
  name: '张三'
},
{
  name: '李四'
}]);

// console.log(html)