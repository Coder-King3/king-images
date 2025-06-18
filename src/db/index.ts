// db.js
import Dexie from 'dexie'

// 创建数据库实例
const db = new Dexie('KingDatabase')

// 定义数据库架构（版本和表结构）
db.version(1).stores({
  images: 'id, url, name, type, date' // 'id' 是主键，其他是索引字段
})

/* 图片表 */
const imagesTable = db.table('images')

export default db
export { imagesTable }
