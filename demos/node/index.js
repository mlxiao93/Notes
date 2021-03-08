const fs = require('fs');

const {code} = require("@babel/core").transform(fs.readFileSync('./foo.ts', 'utf-8'), {
  filename: './foo.ts',
  presets: ["@babel/preset-typescript"],
});

const res = eval(code);

console.log(res);
