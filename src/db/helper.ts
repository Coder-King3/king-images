import type { ImageInfo } from '@/types'
import type { IndexableType, Table } from 'dexie'

type ImageHelper = {
  /**
   * 添加图片到数据库
   * @param image 图片信息
   */
  addImage: (image: ImageInfo) => Promise<IndexableType>
  /**
   * 批量添加图片到数据库
   * @param images 图片信息数组
   */
  addImages: (images: ImageInfo[]) => Promise<void>
  /**
   * 清空图片表
   */
  clearImages: () => Promise<void>
  /**
   * 根据ID删除图片
   * @param id 图片ID
   */
  deleteImage: (id: string) => Promise<void>
  /**
   * 根据ID获取图片
   * @param id 图片ID
   */
  getImageById: (id: string) => Promise<ImageInfo | undefined>
  /**
   * 更新图片信息
   * @param id 图片ID
   * @param changes 要更新的字段
   */
  updateImage: (id: string, changes: Partial<ImageInfo>) => Promise<number>
}

const createImageHelper = (imagesTable: Table): ImageHelper => {
  const tableHelper: ImageHelper = {
    async addImage(image: ImageInfo): Promise<IndexableType> {
      return await imagesTable.add(image)
    },

    async addImages(images: ImageInfo[]): Promise<void> {
      await imagesTable.bulkAdd(images)
    },

    async clearImages(): Promise<void> {
      await imagesTable.clear()
    },

    async deleteImage(id: string): Promise<void> {
      await imagesTable.delete(id)
    },

    async getImageById(id: string): Promise<ImageInfo | undefined> {
      return await imagesTable.get(id)
    },

    async updateImage(
      id: string,
      changes: Partial<ImageInfo>
    ): Promise<number> {
      return await imagesTable.update(id, changes)
    }
  }

  return tableHelper
}

export { createImageHelper }
