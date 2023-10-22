import { h, reactive } from 'king-minivue'
import './style.less'

const Header = () => {
  const headerInfos = reactive({
    title: 'king-images',
    description:
      'web图床集合，在这里可以查看所有上传到Web的图片，可选择复制URL使用'
  })

  return {
    render: () =>
      h('div', { class: 'header' }, [
        h('h1', { class: 'title' }, headerInfos.title),
        h('p', { class: 'description' }, headerInfos.description)
      ])
  }
}

export default Header
