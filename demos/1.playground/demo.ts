const template = `
  <h1><%= data.title %><h1>
  <% if (data.subtitle) { %>
    <h2><%= data.subtitle %></h2>
    <% for (let a in ['a', 'b', 'c']) { %>
      <a><%= a %><a/>
    <% } %>
  <% } %>
`;

function compile(template, data) {
  const reg1 = /<%=\s*(.*?)\s*%>/g
  const reg2 = /<%\s*(.*?)\s*%>/g
  const code = `
    const res = [];
    res.push(\`${
      template
        .replace(reg1, `\`); res.push($1); res.push(\``)
        .replace(reg2, `\`); $1 res.push(\``)
    }\`);
    return res.join('')
  `;
  const func = new Function('data', code);
  return func(data);
}

const html = compile(template, {title: 'hello', subtitle: 'world'})
console.log(html);

