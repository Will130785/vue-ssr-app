const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require('path')
const merge = require('webpack-merge')

const base = require('./webpack.base')
const srcPath = path.resolve(process.cwd(), 'src')

module.exports = merge(base, {
  entry: path.join(srcPath, 'server-entry.js'),
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin()
  ]
})
