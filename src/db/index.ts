// db.js
import Dexie from 'dexie'

import { createImageHelper } from './helper'

// 创建数据库实例
const db = new Dexie('KingDatabase')

// 定义数据库架构（版本和表结构）
db.version(1).stores({
  images: 'id, url, name, type, date' // 'id' 是主键，其他是索引字段
})

/* 图片表 */
const imagesTable = db.table('images')

const imagesHelper = createImageHelper(imagesTable)

// 导出数据库实例
export default db

// 导出图片表操作辅助函数
export { imagesHelper, imagesTable }
