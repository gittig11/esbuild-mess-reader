import { E, useState2 } from '@ppzp/utils.rc'
import Dialog from '../../../common/dialog/index.js'
import Iconfont from '../../../common/iconfont/index.js'
import { RadioButtons } from '../../../common/form/radio/index.js'
import { useState_color, useState_font_size } from 'src/service/theme.js'
import color_list from 'src/constant/theme/color/index.js'
import font_size_list from 'src/constant/theme/font_size.js'
import './index.styl'

export default () => {
  const state_dialog_show = useState2(false)
  const state_color = useState_color()
  const state_font_size = useState_font_size()
  return E._(
    E.a({
        plass: 'item icon',
        onClick: () => {
          state_dialog_show.set(true)
        },
      },
      E(
        Iconfont,
        {
          plass: 'setting',
          title: '设置',
        }
      )
    ),
    E(
      Dialog,
      {
        plass: 'dialog_setting_theme',
        state: state_dialog_show
      },
      E(
        {plass: 'fields'},
        E (
          {plass: 'row'},
          E ({plass: 'key'}, '颜色'),
          E (
            RadioButtons,
            {
              state: {
                value: state_color.value.name,
                set2: (value) => {
                  state_color.set2 (color_list.find ((color) => color.name == value))
                }
              },
              name: 'color',
              options: color_list.map ((color) => color.name)
            },
          ),
        ),
        E (
          {plass: 'row'},
          E ({plass: 'key'}, '字体大小'),
          E (
            RadioButtons,
            {
              state: state_font_size,
              name: 'font_size',
              options: font_size_list
            }
          )
        ),
      ),
    ),
  )
}
