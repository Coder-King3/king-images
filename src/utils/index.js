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

export function formatTimer(cellValue, foramtType = 'yyyy-MM-dd HH:mm:ss') {
  if (!cellValue) return new Date()

  const date = new Date(cellValue)
  function procesWeek(weekNum) {
    weekNum = weekNum === 0 ? 7 : weekNum
    const WeekList = [
      { weekNum: 1, weekStr: '一' },
      { weekNum: 2, weekStr: '二' },
      { weekNum: 3, weekStr: '三' },
      { weekNum: 4, weekStr: '四' },
      { weekNum: 5, weekStr: '五' },
      { weekNum: 6, weekStr: '六' },
      { weekNum: 7, weekStr: '日' }
    ]
    const { weekStr } = WeekList.find((item) => item.weekNum === weekNum)
    return {
      weekNum,
      weekStr
    }
  }

  let dateTimer

  if (foramtType && foramtType.trim() != '') {
    dateTimer = foramtType
    const formatArray = [
      { rule: 'yyyy', value: timer['year'] },
      { rule: 'MM', value: timer['month'] },
      { rule: 'dd', value: timer['day'] },
      { rule: 'HH', value: timer['hours'] },
      { rule: 'mm', value: timer['minutes'] },
      { rule: 'ss', value: timer['seconds'] },
      { rule: 'W', value: timer['week'] }
    ]
    formatArray.forEach(({ rule, value }) => {
      dateTimer = dateTimer.replaceAll(rule, value)
    })
  } else {
    dateTimer = {
      year: `${date.getFullYear()}`,
      month: `${date.getMonth() + 1}`.padStart(2, '0'),
      day: `${date.getDate()}`.padStart(2, '0'),
      hours: `${date.getHours()}`.padStart(2, '0'),
      minutes: `${date.getMinutes()}`.padStart(2, '0'),
      seconds: `${date.getSeconds()}`.padStart(2, '0'),
      week: procesWeek(date.getDay()).weekStr,
      weekNum: procesWeek(date.getDay()).weekNum
    }
  }

  return dateTimer
}
