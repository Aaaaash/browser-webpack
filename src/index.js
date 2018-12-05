const fs = require('fs');
const webpack = require('webpack');
const packageJson = `{
  "name": "browser-webpack",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack --progress --color",
    "dev": "node_modules/webpack-dev-server/bin/webpack-dev-server.js --progress --color --port=4433"
  },
  "dependencies": {
    "aws-sdk": "^2.370.0",
    "browserfs": "^1.4.3",
    "copy-webpack-plugin": "^4.6.0",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.27.0",
    "webpack-dev-server": "^3.1.10"
  },
  "devDependencies": {
    "webpack-cli": "^3.1.2"
  }
}
`
fs.writeFile('/package.json', packageJson, function(err) {

});
fs.writeFile('/hello.js', `console.log('Hello World, I am from browser-webpack')`, function(err) {
  fs.readFile('/hello.js', function(err, contents) {
    console.log(contents.toString());
  });
});
console.log(webpack)
const options = {
  entry: '/hello.js',
  output: {
    path: '/dist',
    filename: 'hello-build.js',
  },
};

webpack(options, (stats) => {
  fs.readFile('/dist/hello-build.js', function(err, contents) {
    console.log(contents.toString());
  });
});

