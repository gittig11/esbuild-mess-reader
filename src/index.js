import { createRoot } from 'react-dom/client'
import { E } from '@ppzp/utils.rc'
import Root from './ui/root.js'
import './style/global.styl'

const root = document.getElementById('react_app_root')
createRoot(root).render(E(Root))

