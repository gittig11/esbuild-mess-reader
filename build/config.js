const FS = require('fs')
const Path = require('path')

// plugins
const { stylusLoader: Plugin_styl } = require('esbuild-stylus-loader')
const Plugin_alias = require('esbuild-plugin-path-alias')

// 绝对路径
const abs_path = (relative_path) => Path.resolve(process.cwd(), relative_path)

// 向编译好的 js 里插额外代码
const banner = require('./banner/index.js')

try {
  let fileExists = FS.existsSync('dist')
  if (!fileExists) {
    FS.mkdirSync('dist')
  } else {
    console.info('info: 文件夹 dist 已存在')
  }
} catch(err) {
  console.err(err)
}

FS.cpSync('src/public', 'dist', {
  recursive: true
})

module.exports = {
  entryPoints: ['src/index.js'],
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  minify: true,
  outdir: 'dist',
  logLevel: 'info',
  banner,
  loader: {
    '.woff2': 'file'
  },
  plugins: [
    Plugin_alias({
      'src': abs_path('src')
    }),
    Plugin_styl({
      stylusOptions: {
        include: [
          abs_path('src/style')
        ]
      }
    })
  ]
}
