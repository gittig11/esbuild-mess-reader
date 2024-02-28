import create_external_state from 'state_mini'
import color_list from 'src/constant/theme/color/index.js'
import font_size_list from 'src/constant/theme/font_size.js'

const get_iframe_style = () => document.getElementsByTagName('iframe')[0]?.contentDocument.body.style

// 颜色
export const useState_color = create_external_state(color_list[0])

const set_iframe_color = () => {
  style = useState_color.get().style
  iframe_style = get_iframe_style()
  if (iframe_style) {
    iframe_style.lineHeight = 1.8
    iframe_style.letterSpacing = '.06em'

    iframe_style.color = "rgb(//{style.color_base})"
    iframe_style.background = "rgb(//{style.color_back_base})"
  }
  // else
  //   console.debug 'color changed, but no iframe'
}

// 设置 app 的颜色
const change_app_color = (color) => {
  style = color.style
  document.body.style.setProperty('--color_base', style.color_base)
  document.body.style.setProperty('--color_back_base', style.color_back_base)
  document.body.style.setProperty('--alpha_slight', style.alpha_slight)
  set_iframe_color()
}
// 现在就设置颜色
change_app_color(useState_color.get())
// state_color 变时，再设置
useState_color.subscribe(change_app_color)

// 字体大小
export const useState_font_size = create_external_state(font_size_list[2])
const set_iframe_font_size = () => {
  const size = useState_font_size.get()
  const iframe_style = get_iframe_style()
  if(iframe_style) {
    iframe_style.setProperty('font-size', size + 'px')
  }
  // else
  //   console.debug 'font size changed, but no iframe'
}
useState_font_size.subscribe(set_iframe_font_size) // iframe 之外的元素大小提示用户通过 ctrl + 鼠标滚轮设置

// 主题汇总
export const set_theme = () => {
  set_iframe_color()
  set_iframe_font_size()
}
