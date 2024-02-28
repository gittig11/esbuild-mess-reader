const { context } = require('esbuild')
const options = require('./config.js')
const dev_reload = require('./banner/dev_reload.js')

const start = async () => {
  try {
    options.banner.js += dev_reload
    
    ctx = await context(options)
  
    // 监听文件变化
    await ctx.watch()
  
    // 开发服务器
    await ctx.serve({
      servedir: 'dist'
    })
  } catch(err) {
    console.log('err:', err)
  }
}
start()
