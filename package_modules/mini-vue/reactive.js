class Dep {
  constructor() {
    this.reactiveEffect = new Set()
  }

  depend() {
    if (activeEffect) {
      this.reactiveEffect.add(activeEffect)
    }
  }

  notify() {
    this.reactiveEffect.forEach((effect) => {
      effect()
    })
  }
}

// 设置一个专门执行响应式函数的一个函数
let activeEffect = null
export function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const targetMap = new WeakMap()
export function getDep(target, key) {
  // 1.根据对象target, 取出对应的Map对象
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 2.根据key, 找到对应的dep对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Dep()
    map.set(key, dep)
  }
  return dep
}

// 自动收集信息依赖
export function reactive(raw) {
  return new Proxy(raw, {
    get: function (target, key, receiver) {
      const dep = getDep(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
      let status = Reflect.set(target, key, newValue, receiver) ? true : false
      const dep = getDep(target, key)
      dep.notify()
      return status
    }
  })
}

// ref包装类
class Ref {
  constructor(val) {
    this._value = val
  }
  get value() {
    return this._value
  }
  set value(newVal) {
    this._value = newVal
  }
}

// ref函数
export function ref(value) {
  return reactive(new Ref(value))
}
