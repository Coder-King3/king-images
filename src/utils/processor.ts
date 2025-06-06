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
export const toMarkdown = (url: string): string => {
  return `![](${url})`
}

// 将图片转换为 webp 格式
export const toWebp = (url: string, optionStr: string = ''): string => {
  return `${url}@${optionStr}1e_1c.webp`
}
