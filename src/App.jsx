import React, { useState } from 'react'
import Header from './components/header'
import Content from './components/content'
import Setting from './components/setting'
import { themeContext } from './context'
import { autoThemeMode } from './utils'

const App = () => {
  const [mode, setMode] = useState(autoThemeMode())
  const htmlRoot = document.documentElement
  htmlRoot.setAttribute('mode', mode)

  return (
    <themeContext.Provider value={[mode, setMode]}>
      <Header></Header>
      <Content></Content>
      <Setting></Setting>
    </themeContext.Provider>
  )
}

export default App
