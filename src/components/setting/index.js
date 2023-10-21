import { h, ref } from '~/package_modules/mini-vue'
import './style.less'
import { getAssetsUrl } from '@/utils'

const Setting = () => {
  const isFullScreen = ref(false)

  const themeToggle = () => {
    if (document.documentElement.getAttribute('theme-mode') == 'dark') {
      document.documentElement.setAttribute('theme-mode', 'light')
    } else {
      document.documentElement.setAttribute('theme-mode', 'dark')
    }
  }

  const fullScreen = () => {
    if (!isFullScreen.value) {
      document.body.requestFullscreen()
      isFullScreen.value = true
    } else {
      document.exitFullscreen()
      isFullScreen.value = false
    }
  }

  return {
    render: () =>
      h('div', { class: 'settings' }, [
        h('div', { class: 'set-btn' }, [
          h('img', {
            src: getAssetsUrl('full-screen', 'svg', 'icons'),
            class: 'svg-icon',
            onClick: fullScreen
          })
        ]),
        h('div', { class: 'set-btn' }, [
          h('img', {
            src: getAssetsUrl('switch-button', 'svg', 'icons'),
            class: 'svg-icon',
            onClick: themeToggle
          })
        ])
      ])
  }
}

export default Setting
