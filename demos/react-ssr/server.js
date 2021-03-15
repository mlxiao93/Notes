const express = require('express');
const fs = require('fs');
const path = require('path');
const Bundler = require('parcel-bundler');
const ReactDomServer = require('react-dom/server');
const React = require('react');
const port = 3001;

async function getHtml() {
  const bundler = new Bundler(path.resolve(__dirname, './src/App.tsx'), {
    target: 'node',
    watch: false,
    hmr: false,
    cache: false
  });
  await bundler.bundle();
  const ReactApp = require('./dist/App').default;
  const appInnerHtml = ReactDomServer.renderToString(React.createElement(ReactApp));

  let html = fs.readFileSync('./dist/index.html', 'utf-8');
  html = html.replace('{{content}}', appInnerHtml);
  return html;
}

const app = express();

app.get('/', async (req, res) => {
  const html = await getHtml();
  res.send(html);
})

app.use(express.static('./dist'))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});