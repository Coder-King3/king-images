import { h, reactive } from 'king-minivue'
import './style.less'
import { msgSuccess, msgError } from '~/package_modules/message'
import preview from '~/package_modules/preview'
import { getAssetsUrl } from '@/utils'

const Header = () => {
  const images = reactive(window.baseConfig.images)

  const copyImageUrl = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => msgSuccess('复制成功！'))
      .catch(() => msgError('复制失败！'))
  }
  const previewImage = (imageSelect) => {
    const imageEvent = document.querySelector(imageSelect)
    preview(imageEvent)
  }

  return {
    render: () => {
      const items = images.map((url, index) =>
        h(
          'li',
          {
            class: 'item'
          },
          [
            h('img', { class: `image preview-item_${index}`, src: url }),
            h(
              'div',
              {
                class: 'tools'
              },
              [
                h('img', {
                  src: getAssetsUrl('zoom-in', 'svg', 'icons'),
                  class: 'svg-icon',
                  onClick: () => {
                    previewImage(`.preview-item_${index}`)
                  }
                }),
                h('img', {
                  src: getAssetsUrl('copy', 'svg', 'icons'),
                  class: 'svg-icon',
                  onClick: () => copyImageUrl(images[index])
                })
              ]
            )
          ]
        )
      )
      const flexIboxs = [1, 2, 3, 4, 5, 6, 7, 8].map((index) =>
        h('i', { class: `flex-i-box i-box_${index}` })
      )
      return h('ul', { class: 'image-list' }, [...items, ...flexIboxs])
    }
  }
}

export default Header
