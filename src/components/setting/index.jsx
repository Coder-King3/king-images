import React, { useContext } from 'react'
import './style.less'
import { getAssetsUrl } from '@/utils'
import { themeContext } from '@/context'

const Setting = () => {
  return (
    <div className="settings">
      <FullScreen></FullScreen>
      <ThemeToggle></ThemeToggle>
    </div>
  )
}

const FullScreen = () => {
  let isFullScreen = false

  const handleFullScreen = () => {
    if (!isFullScreen) {
      document.body.requestFullscreen()
      isFullScreen = true
    } else {
      document.exitFullscreen()
      isFullScreen = false
    }
  }

  return (
    <div className="set-btn">
      <img
        src={getAssetsUrl('full-screen', 'svg', 'icons')}
        alt=""
        className="svg-icon"
        onClick={handleFullScreen}
      />
    </div>
  )
}

const ThemeToggle = () => {
  // 初始化主题
  const [mode, setMode] = useContext(themeContext)

  const handleThemeToggle = () => {
    if (mode == 'dark') {
      setMode('light')
    } else {
      setMode('dark')
    }
  }

  return (
    <div className="set-btn">
      <img
        src={getAssetsUrl('switch-button', 'svg', 'icons')}
        alt=""
        className="svg-icon"
        onClick={handleThemeToggle}
      />
    </div>
  )
}

export default Setting
