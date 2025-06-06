import React, { useContext } from 'react'
import Zmage from 'react-zmage'
import 'react-zmage/lib/zmage.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAssetsUrl } from '@/utils'
import { themeContext } from '@/context'
import './style.less'

const ImageList = () => {
  const images = window.baseConfig.images
  const [mode] = useContext(themeContext)

  const copyImageUrl = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('复制成功！', { theme: mode }))
      .catch(() => toast.error('复制失败！', { theme: mode }))
  }
  const previewImage = (url) => {
    Zmage.browsing({
      src: url,
      backdrop: mode == 'light' ? '#f8f9fa' : '#2f2f2f'
    })
  }

  return (
    <ul className="image-list">
      {images.map((url, index) => (
        <li className="item" key={`item_${index}`}>
          <img src={url} className="image" />
          <div className="tools">
            <img
              src={getAssetsUrl('zoom-in', 'svg', 'icons')}
              className="svg-icon"
              onClick={() => previewImage(url)}
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
        <i className={`flex-i-box`} key={`fiex_i_${index}`}></i>
      ))}
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </ul>
  )
}

export default ImageList
