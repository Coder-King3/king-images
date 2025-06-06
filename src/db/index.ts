// db.js
import type { ImageInfo } from '@/types'

import Dexie, { type IndexableType } from 'dexie'

// 创建数据库实例
const db = new Dexie('KingDatabase')

// 定义数据库架构（版本和表结构）
db.version(1).stores({
  images: 'id, url, name, type, date' // 'id' 是主键，其他是索引字段
})

/* 图片表 */
const imagesTable = db.table('images')

/* 图片表操作辅助函数 */
const imagesTableHelper = {
  /**
   * 添加图片到数据库
   * @param image 图片信息
   */
  async addImage(image: ImageInfo): Promise<IndexableType> {
    return await imagesTable.add(image)
  },

  /**
   * 批量添加图片到数据库
   * @param images 图片信息数组
   */
  async addImages(images: ImageInfo[]): Promise<void> {
    await imagesTable.bulkAdd(images)
  },

  /**
   * 清空图片表
   */
  async clearImages(): Promise<void> {
    await imagesTable.clear()
  },

  /**
   * 根据ID删除图片
   * @param id 图片ID
   */
  async deleteImage(id: string): Promise<void> {
    await imagesTable.delete(id)
  },

  /**
   * 获取所有图片
   */
  async getAllImages(): Promise<ImageInfo[]> {
    return await imagesTable.toArray()
  },

  /**
   * 根据ID获取图片
   * @param id 图片ID
   */
  async getImageById(id: string): Promise<ImageInfo | undefined> {
    return await imagesTable.get(id)
  },

  /**
   * 更新图片信息
   * @param id 图片ID
   * @param changes 要更新的字段
   */
  async updateImage(id: string, changes: Partial<ImageInfo>): Promise<number> {
    return await imagesTable.update(id, changes)
  }
}

// 导出数据库实例
export default db

// 导出图片表操作辅助函数
export { imagesTable, imagesTableHelper }
