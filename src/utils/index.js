// 防抖函数
export function debounce(callback, delay = 0, immediate = false) {
  let timer = null
  let isInvoke = false
  function _debounce(...args) {
    return new Promise((resolve, reject) => {
      try {
        // timer重复执行时清空之前定时器重新设置
        if (timer) clearTimeout(timer)

        let result = undefined
        // 首次立即执行
        if (immediate && !isInvoke) {
          result = callback.apply(this, args)
          resolve(result)
          isInvoke = true
          return
        }

        // 延迟执行对应函数
        timer = setTimeout(() => {
          result = callback.apply(this, args)
          resolve(result)
          timer = null
          isInvoke = false
        }, delay)
      } catch (error) {
        reject(error)
      }
    })
  }

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

// 获取图片URL地址
export function getAssetsUrl(url, suffix = 'png', folder = 'icons') {
  return new URL(`../assets/${folder}/${url}.${suffix}`, import.meta.url).href
}
