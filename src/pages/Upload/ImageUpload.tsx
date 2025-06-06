import type { ImageInfo, UploadProgress } from '@/types'
import type { ChangeEvent, ClipboardEvent, DragEvent } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem
} from '@/components/ui'
import { imagesTableHelper } from '@/db'
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll'
import { uploadBatch } from '@/utils/upload'

import { UploadIcon, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type ImageFormat = 'markdown' | 'webp'

function ImageUpload() {
  const [format, setFormat] = useState<ImageFormat>('markdown')
  const [recentUploadsRef] = useHorizontalScroll<HTMLDivElement>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadAreaRef = useRef<HTMLDivElement>(null)

  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [uploadImages, setUploadImages] = useState<ImageInfo[] | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<null | UploadProgress>()

  // 处理文件选择
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith('image/')
      )
      setUploadFiles((prev) => [...prev, ...newFiles])
      // 清空input值，允许重复选择相同文件
      e.target.value = ''
    }
  }

  // 处理文件拖拽
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/')
      )
      setUploadFiles((prev) => [...prev, ...newFiles])
    }
  }

  // 处理粘贴事件
  const handlePaste = (e: ClipboardEvent) => {
    // 阻止事件冒泡，防止多次处理同一粘贴事件
    e.stopPropagation()

    const items = e.clipboardData?.items
    if (!items) return

    const imageFiles: File[] = []

    // 使用Set记录已处理的图片类型，避免重复添加
    const processedTypes = new Set<string>()

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      // 处理剪贴板中的图片文件，并确保同一类型只处理一次
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        // 如果已经处理过这种类型的图片，跳过
        if (processedTypes.has(item.type)) continue

        processedTypes.add(item.type)
        const file = item.getAsFile()
        if (file) imageFiles.push(file)
      }
    }

    if (imageFiles.length > 0) {
      setUploadFiles((prev) => [...prev, ...imageFiles])
    }
  }

  // 移除已选文件
  const removeFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const removeAllFiles = () => {
    setUploadFiles([])
  }

  // 触发文件选择器点击
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleUploadImageFiles = async () => {
    if (uploadFiles.length === 0) {
      toast.error('请先选择要上传的图片')
      return
    }

    setIsUploading(true)
    try {
      const result = await uploadBatch(uploadFiles, 3, (progress) => {
        setUploadProgress(progress)
      })

      if (result.successCount > 0) {
        imagesTableHelper.addImages(result.success)
        setUploadImages(result.success)
        toast.success(`成功上传${result.successCount}张图片`)
      }

      if (result.failedCount > 0) {
        toast.error(`${result.failedCount}张图片上传失败`)
      }

      // 清空已上传的文件
      if (result.successCount === uploadFiles.length) {
        setUploadFiles([])
      } else {
        // 只保留上传失败的文件
        const failedFileNames = new Set(
          result.failed.map((item) => item.file.name)
        )
        setUploadFiles((prev) =>
          prev.filter((file) => failedFileNames.has(file.name))
        )
      }
    } catch (error) {
      toast.error('上传过程中发生错误')
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
      setUploadProgress(null)
    }
  }

  // 添加全局粘贴事件监听
  useEffect(() => {
    // 只添加一个粘贴事件监听器，避免重复处理
    document.addEventListener('paste', handlePaste as unknown as EventListener)

    return () => {
      document.removeEventListener(
        'paste',
        handlePaste as unknown as EventListener
      )
    }
  }, []) // 确保依赖数组为空，避免重复添加监听器

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">复制格式</CardTitle>
        <RadioGroup
          defaultValue="markdown"
          className="flex space-x-4"
          value={format}
          onValueChange={(value: ImageFormat) => setFormat(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="markdown" id="markdown" />
            <Label htmlFor="markdown">Markdown</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="webp" id="webp" />
            <Label htmlFor="webp">WebP</Label>
          </div>
        </RadioGroup>
      </CardHeader>
      <CardContent>
        {/* 隐藏的文件输入框 */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* 上传区域 */}
        <div
          ref={uploadAreaRef}
          className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 dark:border-gray-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          tabIndex={0} // 使div可聚焦，便于捕获键盘事件
        >
          <div className="flex flex-col items-center">
            <UploadIcon className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              粘贴拖拽到此处，或点击选择文件
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              支持JPG、PNG、GIF、WebP等常见图片格式，无文件大小限制
            </p>
            <Button
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation()
                triggerFileInput()
              }}
            >
              选择文件
            </Button>
          </div>
        </div>

        {/* 已选文件预览 */}
        {uploadFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-medium">
              已选文件 ({uploadFiles.length})
            </h3>
            <div className="grid max-h-[368px] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {uploadFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="relative">
                  <div className="group relative aspect-square overflow-hidden rounded-lg border dark:border-gray-700">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-between bg-black/40 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        className="ml-auto size-6 rounded-full bg-red-500 !text-white hover:bg-red-600"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(index)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <p className="w-full truncate text-xs text-white">
                        {file.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 上传进度显示 */}
            {isUploading && uploadProgress && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    正在上传: {uploadProgress.currentFileName} (
                    {uploadProgress.current}/{uploadProgress.total})
                  </span>
                  <span>
                    {uploadProgress.success}成功 / {uploadProgress.failed}失败
                  </span>
                </div>
                <Progress value={uploadProgress.percent} />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    上传速度: {(uploadProgress.speed / 1024 / 1024).toFixed(2)}{' '}
                    MB/s
                  </span>
                  <span>
                    剩余时间: {Math.ceil(uploadProgress.remainingTime / 1000)}秒
                  </span>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="destructive"
                disabled={isUploading}
                onClick={removeAllFiles}
              >
                清除所有
              </Button>
              <Button onClick={handleUploadImageFiles} disabled={isUploading}>
                {isUploading ? '上传中...' : '上传全部'}
              </Button>
            </div>
          </div>
        )}

        {/* 最近上传 */}
        {uploadImages && uploadImages.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-medium">最近上传</h3>
            <div
              ref={recentUploadsRef}
              className="flex gap-3 overflow-x-auto pb-3"
            >
              {uploadImages.map((item) => (
                <div
                  key={item.id}
                  className="flex aspect-square min-w-[120px] shrink-0 cursor-pointer items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                  {/* <Image
                    src={item.url}
                    alt={item.name}
                    className="size-full text-gray-400"
                  /> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ImageUpload
