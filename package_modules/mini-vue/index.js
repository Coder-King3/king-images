import { h, mount, patch } from './render.js'
import { watchEffect, reactive, ref } from './reactive.js'

function createApp(rootComponent) {
  const template = rootComponent()

  return {
    mount(container) {
      let isMounted = false
      let oldVnode = null

      watchEffect(function () {
        if (!isMounted) {
          oldVnode = template.render()
          mount(oldVnode, container)
          isMounted = true
        } else {
          const newValue = template.render()
          patch(oldVnode, newValue)
          oldVnode = newValue
        }
      })
    }
  }
}

export { h, reactive, createApp, ref }
