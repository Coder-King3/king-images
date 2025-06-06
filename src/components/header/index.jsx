import React from 'react'
import './style.less'

const Header = () => {
  const headerInfos = {
    title: 'king-images',
    description:
      'web图床集合，在这里可以查看所有上传到Web的图片，可选择复制URL使用'
  }

  return (
    <div className="header">
      <h1 className="title">{headerInfos.title}</h1>
      <p className="description">{headerInfos.description}</p>
    </div>
  )
}

export default Header
