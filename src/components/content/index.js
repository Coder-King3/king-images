import { h } from 'king-minivue'
import './style.less'

import ImageList from './cpns/image-list'

const Header = () => {
  const ImageListComponent = ImageList()

  return {
    render: () => h('div', { class: 'content' }, [ImageListComponent.render()])
  }
}

export default Header
