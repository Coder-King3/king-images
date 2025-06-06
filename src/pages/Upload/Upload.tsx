import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

import { useMemo, useState } from 'react'

import ImageGallery from './ImageGallery'
import ImageUpload from './ImageUpload'

function Upload() {
  const [activeTab, setActiveTab] = useState('upload')

  const isUploadTab = useMemo(() => activeTab === 'upload', [activeTab])

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="upload">图片上传</TabsTrigger>
          <TabsTrigger value="gallery">图片库</TabsTrigger>
        </TabsList>

        {/* 文件上传 */}
        <TabsContent
          className={!isUploadTab ? 'hidden' : undefined}
          value="upload"
          forceMount
        >
          <ImageUpload />
        </TabsContent>

        {/* 图片库 */}
        <TabsContent
          className={isUploadTab ? 'hidden' : undefined}
          value="gallery"
          forceMount
        >
          <ImageGallery />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Upload
