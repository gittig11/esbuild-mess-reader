import { E, useMount, useEffect2 } from '@ppzp/utils.rc'
import { useValue_book_instance, make_book, useValue_book_loading } from 'src/service/book.js'
import './root.styl'

import Header from './header/index.js'
import Nav from './nav/index.js'
import Book from './book/index.js'
import Open from './open/index.js'

// console.log('E', E,
//   E.header(
//     E({
//       plass: 'header_wrapper',
//     }),
//     E.a({
//       plass: 'item',
//       target: '_blank',
//       href: 'https://zlibrary-asia.se/',
//     }, 'Z Library')
//   )
// );

export default () => {
  const loading = useValue_book_loading()
  const book = useValue_book_instance()
  useMount(() => {
    link = new URLSearchParams(location.search).get('t')
    if (link) {
      console.debug('launch with download target', { link })
      make_book(link)
      return
    }
    // root 挂载好后，检查是否为“通过双击 .epub 文件”来打开应用
    window.launchQueue?.setConsumer(async (params) =>
      make_book(await params.files[0].getFile())
    )
  })
  return E(
    {plass: 'mess_reader_root'},
    E(Nav),
    E(
      {plass: 'boxx'},
      E(Header),
      loading ? E ({plass: 'loading_book'}, '加载中...') : (book ? E (Book) : E (Open))
    )
  )
}
