import create_external_state from 'state_mini'
import { get_book_instance } from './book.js'
import { set_theme } from './theme.js'

// render 到 dom
export const render = (dom) => {
  const { width } = dom.getBoundingClientRect()
  const book = get_book_instance()
  book.renderTo(dom, {
    width,
    flow: 'scrolled-doc',
    allowScriptedContent: true, // 这个放在设置里，让用户开启好一点
  })
  book.rendition.on('displayed', (section) => {
    // section: http://epubjs.org/documentation/0.3/#section
    // console.debug 'displayed', section.href
    useState_display_target.set2(section.href)
  })
  display()
}

// 当前章节
const useState_display_target = create_external_state()
export const useValue_display_target = () => useState_display_target().value
export const display = async (target) => {
  await get_book_instance().rendition.display(target)
  set_theme()
}
