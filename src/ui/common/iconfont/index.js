import { E } from '@ppzp/utils.rc'
import './index.css'
import './index.styl'

const Icon = ({ className, ...props }) => E.i({
  plass: ['iconfont', className],
  ...props // 要加大括号，否则 ... 就会被当数组处理
})
export default Icon

export const IconButton = ({ className, type, ...props }) => {
  E.button(
    {
      plass: [className, 'button_icon'],
      ...props
    },
    E(Icon, {plass: type})
  )
}
