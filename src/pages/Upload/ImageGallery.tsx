import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

import { Image } from 'lucide-react'

function ImageGallery() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">已传图片</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid h-[460px] grid-cols-2 gap-3 overflow-y-auto pr-2 md:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div
              key={item}
              className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              <Image className="size-10 text-gray-400" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ImageGallery
