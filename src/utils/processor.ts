export interface ImageSize {
  height: number
  width: number
}
// 从本地上传的图片或者粘贴的图片中得到他们的分辨率
export const getImgSize = (file: File): Promise<ImageSize> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      })
    }
    img.onerror = (error: Event | string) => {
      reject(new Error(`图片加载失败: ${error}`))
    }
    img.src = URL.createObjectURL(file)
  })
}

// 将图片转换为 markdown 格式
export const toMarkdown = (url: string, name: string = ''): string => {
  return `![${name}](${url})`
}

// 将图片转换为 webp 格式
export const toWebp = (url: string, optionStr: string = ''): string => {
  return `${url}@${optionStr}1e_1c.webp`
}

// 使用异步函数处理复制，并添加错误处理
export const copyToClipboard = async (text: string) => {
  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // 回退方法：创建临时输入框
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const success = document.execCommand('copy')
    document.body.removeChild(textArea)
    return success
  } catch (err) {
    console.error('复制失败:', err)
    return false
  }
}
