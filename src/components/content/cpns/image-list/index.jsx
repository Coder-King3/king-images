import React from 'react'
import './style.less'
import { msgSuccess, msgError } from '~/package_modules/message'
import preview from '~/package_modules/preview'
import { getAssetsUrl } from '@/utils'

const ImageList = () => {
  const images = window.baseConfig.images

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

  return (
    <ul className="image-list">
      {images.map((url, index) => (
        <li className="item" key={`item_${index}`}>
          <img src={url} className={`image preview-item_${index}`} />
          <div className="tools">
            <img
              src={getAssetsUrl('zoom-in', 'svg', 'icons')}
              className="svg-icon"
              onClick={() => previewImage(`.preview-item_${index}`)}
            />
            <img
              src={getAssetsUrl('copy', 'svg', 'icons')}
              className="svg-icon"
              onClick={() => copyImageUrl(images[index])}
            />
          </div>
        </li>
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <i className={`flex-i-box i-box_${index}`} key={`fiex_i_${index}`}></i>
      ))}
    </ul>
  )
}

export default ImageList
