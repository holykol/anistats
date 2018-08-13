const path = require('path')
const pkg = require('./package')
const webpack = require('webpack')

require('dotenv').config()

module.exports = {
   entry: [
      'src/polyfills.js',
      'src/index.js'
   ],
   html: {
      title: pkg.productName,
      description: pkg.description,
      template: path.join(__dirname, 'index.ejs')
   },
   postcss: {
      plugins: [
         // Your postcss plugins
      ]
   },
   presets: [
      require('poi-preset-bundle-report')(),
      require('poi-preset-offline')({
         pwa: './src/pwa.js', // Path to pwa runtime entry
         pluginOptions: {} // Additional options for offline-plugin
      })
   ],
   define : {
      'process.env.NODE_ENV' : `${process.env.NODE_ENV || 'development'}`,
      'process.env.SIMPERIUM_APP_ID': `${process.env.SIMPERIUM_APP_ID}`,
      'process.env.SIMPERIUM_API_KEY': `${process.env.SIMPERIUM_API_KEY}`,
   },
}
