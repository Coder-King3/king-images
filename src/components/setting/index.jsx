import React from 'react'
import './style.less'
import { getAssetsUrl, formatTimer } from '@/utils'

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
  const htmlRoot = document.documentElement

  function autoThemeMode() {
    const { hours } = formatTimer(new Date(), null)
    let THEME_MODE
    if (parseInt(hours) >= 6 && parseInt(hours) <= 18) {
      THEME_MODE = 'light'
    } else {
      THEME_MODE = 'dark'
    }
    document.documentElement.setAttribute('theme-mode', THEME_MODE)
  }
  autoThemeMode()

  const handleThemeToggle = () => {
    if (htmlRoot.getAttribute('theme-mode') == 'dark') {
      htmlRoot.setAttribute('theme-mode', 'light')
    } else {
      htmlRoot.setAttribute('theme-mode', 'dark')
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
