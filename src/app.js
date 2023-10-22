import Header from './components/header'
import Content from './components/content'
import Setting from './components/setting'
import { formatTimer } from './utils'

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

const App = () => {
  const HeaderComponent = Header()
  const ContentComponent = Content()
  const SettingComponent = Setting()
  autoThemeMode()
  return {
    render() {
      return [
        HeaderComponent.render(),
        ContentComponent.render(),
        SettingComponent.render()
      ]
    }
  }
}

export default App
