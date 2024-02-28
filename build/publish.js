const { build } = require('esbuild')
const { publish } = require('gh-pages')
const options = require('./config.js')

const start = async () => {
  try {
    await build(options)
    publish('dist', (err) => {
      if(err) {
        console.error(err)
      } else {
        console.log('published')
      }
    })
    console.log('publish...')
  } catch(err) {
    console.log('err:', err)
  }
}
start()
