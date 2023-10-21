import Header from './components/header'
import Content from './components/content'
import Setting from './components/setting'

const App = () => {
  const HeaderComponent = Header()
  const ContentComponent = Content()
  const SettingComponent = Setting()
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
