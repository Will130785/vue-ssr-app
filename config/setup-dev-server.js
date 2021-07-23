const setupDevServer = (app, onServerBundleReady) => {
  const webpack = require('webpack')
  const MFS = require('memory-fs')
  const path = require('path')
  const clientConfig = require('./webpack.client.js')
  const serverConfig = require('./webpack.server.js')

  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]

  const clientCompiler = webpack(clientConfig)

  app.use(require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
    logLevel: 'silent'
  }))

  app.use(require('webpack-hot-middleware')(clientCompiler))

  global.console.log('Building SSR bundle...')
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()

  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (error, stats) => {
    if (error) throw error

    global.console.log(
      `
        ${stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        })}\n\n
      `
    )

    if (stats.hasErrors()) {
      console.error(stats.compilation.errors)
      throw new Error(stats.compilation.errors)
    }

    const bundle = JSON.parse(mfs.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-server-bundle.json'), 'utf-8'))
    onServerBundleReady(bundle)
  })
}

module.exports = setupDevServer
