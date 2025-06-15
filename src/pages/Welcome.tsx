import { Container, Transition } from '@/components'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/constants'
import { Logo as LogoIcon } from '@/icons'
import { cn } from '@/utils'

import { css, keyframes } from '@emotion/css'
import { useNavigate } from 'react-router'

const logoContainerCss = css`
  @media (min-width: 960px) {
    flex-grow: 1;
    margin: 0;
    min-height: 100%;
    order: 2;
  }
`
const logoWrapperCss = css`
  @media (min-width: 960px) {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    transform: translate(-32px, -32px);
    width: 100%;
  }
`

const logoBackgroundCss = css`
  background-image: radial-gradient(
    circle at center,
    #17ead9 0%,
    #2ee6d6 25%,
    #4592e6 50%,
    #5674ea 75%,
    #6078ea 100%
  );
  border-radius: 50%;
  filter: blur(72px);
  height: 320px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
`

// 创建平滑的浮动动画
const createFloatAnimation = (offsetX: number, offsetY: number) =>
  keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
  25% {
    transform: translate(${offsetX * 0.3}px, ${offsetY * 0.3}px) scale(1.1);
    opacity: 0.7;
  }
  50% {
    transform: translate(${offsetX}px, ${offsetY}px) scale(1.2);
    opacity: 0.9;
  }
  75% {
    transform: translate(${offsetX * 0.3}px, ${offsetY * 0.3}px) scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
`

/* 
  cx、css 和 cn 详解
  
  1. Emotion Css
  1.1 Emotion (css) 【css 函数返回样式生成的类名】
  className={css({
    color: textColor,
    fontSize: `${size}px`,
    transition: 'all 0.3s',
    '&:hover': {
      color: hoverColor
    },
    [breakpoint]: {
      fontSize: `${smallSize}px`
    }
  })}
  
  1.2 Emotion cx
    cx可以检测 Emotion 生成的类名，确保样式按正确的顺序覆盖。
    Emotion 生成的样式从左到右应用。后续样式会覆盖先前样式的属性值。
  className={cx(
    css({
      fontSize: '20px',
      background: 'green'
    }),
    css({
      fontSize: '20px',
      background: 'blue'
    })
  )}
  
  
  2. Tailwind 和 Emotion 混合使用
  2.1 单个Emotion css 的情况
  className={cn("tailwind类名", css({ animation: `${animation} 2s` }))}
  
  2.2 多个Emotion css 的情况
  className={cn(
    "tailwind类名",
    cx(
      css({ animation: `${animation} 2s` }),
      css({ animation: `${animation} 2s` })
    )
  )}
*/

interface ImagesLogoProps {
  logoColor?: {
    fillColor: string
    strokeColor: string
  }
  particleColor: [string, string]
  particleCount?: number
  size?: number
}

// ImagesLogo 组件
function ImagesLogo({
  logoColor = {
    fillColor: '#3B82F6',
    strokeColor: '#1E40AF'
  },
  particleColor = ['#3B82F6', '#1E40AF'],
  particleCount = 12,
  size = 120
}: ImagesLogoProps) {
  // 根据图标大小自动计算容器内边距
  // 小图标用相对较大的padding，大图标用相对较小的padding
  const containerPadding = Math.max(30, size * 0.4)

  // 计算容器大小，确保有足够空间显示粒子
  const containerSize = size + containerPadding * 2

  // 计算粒子分布的半径范围
  const minRadius = size * 0.6 // 距离logo中心的最小距离
  const maxRadius = size * 0.9 // 距离logo中心的最大距离

  // 生成粒子位置数据
  const particles = Array.from({ length: particleCount }, (_, i) => {
    // 使用角度分布确保粒子围绕logo均匀分布
    const angle = (i / particleCount) * 2 * Math.PI + Math.random() * 0.5
    const radius = minRadius + Math.random() * (maxRadius - minRadius)

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    // 为每个粒子生成独特的动画偏移量
    const animationOffsetX = (Math.random() - 0.5) * 15
    const animationOffsetY = (Math.random() - 0.5) * 15

    return {
      animationOffsetX,
      animationOffsetY,
      delay: (i / particleCount) * 2, // 更均匀的延迟分布
      duration: 3 + Math.random() * 2, // 动画持续时间3-5秒
      id: i,
      size: 2 + Math.random() * 2, // 粒子大小变化
      x: 50 + (x / containerSize) * 100, // 转换为百分比
      y: 50 + (y / containerSize) * 100 // 转换为百分比
    }
  })

  return (
    <div
      className={'relative flex items-center justify-center'}
      style={{
        height: `${containerSize}px`,
        width: `${containerSize}px`
      }}
    >
      {/* Logo 图标 */}
      <div className="relative z-20">
        <LogoIcon size={size} className="drop-shadow-lg" {...logoColor} />
      </div>

      {/* 动态粒子效果 */}
      {particles.map((particle) => {
        const floatAnimation = createFloatAnimation(
          particle.animationOffsetX,
          particle.animationOffsetY
        )

        return (
          <div
            key={particle.id}
            className={`absolute rounded-full ${css({
              animation: `${floatAnimation} ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
              background: `radial-gradient(circle, ${particleColor[0]}, ${particleColor[1]})`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: 'translate(-50%, -50%)',
              width: `${particle.size}px`,
              willChange: 'transform, opacity' // 优化性能
            })}`}
          />
        )
      })}
    </div>
  )
}

const imagesIntro = {
  description: '便捷高效的 \n图片托管服务',
  name: APP_NAME,
  tagline: (
    <span>
      基于哔哩哔哩图床API，为您提供稳定可靠的
      <br />
      图片存储解决方案。简单上传， 永久保存，随时访问。
    </span>
  )
}

const features = [
  {
    description: '无需注册账号，简单几步即可上传图片，获取永久图片链接。',
    icon: '🚀',
    title: '极速上传'
  },
  {
    description: '基于哔哩哔哩强大的图床API，提供稳定、高速的图片加载体验。',
    icon: '☁️',
    title: '稳定可靠'
  },
  {
    description: '支持多种图片格式，满足您不同场景的图片托管需求。',
    icon: '🖼️',
    title: '多格式支持'
  },
  {
    description:
      '通过IndexedDB技术，在本地持久化存储您的图片记录，随时查看历史上传。',
    icon: '💾',
    title: '本地记录'
  },
  {
    description: '简洁直观的图片预览功能，轻松管理您的所有图片资源。',
    icon: '👁️',
    title: '预览管理'
  },
  {
    description: '完全免费使用，无容量限制，为您的创作提供坚实后盾。',
    icon: '🆓',
    title: '免费无限'
  }
]

function Welcome() {
  const navigate = useNavigate()

  function toUpload() {
    navigate('/upload?tab=upload')
  }

  // container mx-auto max-w-7xl px-4 py-6

  return (
    <Transition>
      <Container className="max-w-[1152px] px-4 min-lg:px-0">
        <div className="flex flex-col items-center pt-20 pb-14 text-center md:flex-row md:text-left">
          <div className="relative z-10 order-2 w-[calc((100%_/_3)_*_2)] max-md:w-full min-[960px]:max-w-[592px] md:order-1 md:items-start">
            <h1 className="flex flex-col text-[56px] leading-[64px] font-bold tracking-[-.4px]">
              <span className="h-[70px] bg-gradient-to-r from-[#2f88ff] to-[#6078ea] bg-clip-text text-transparent">
                {imagesIntro.name}
              </span>
              <span className="whitespace-pre-wrap text-gray-800">
                {imagesIntro.description}
              </span>
            </h1>
            <p className="mt-3 text-[24px] leading-[36px] text-[#67676c]">
              {imagesIntro.tagline}
            </p>
            <div className="flex pt-8 max-md:justify-center">
              <Button
                size="lg"
                onClick={toUpload}
                className="bg-primary h-[45px] w-40 rounded-full border border-[#5c7cfa] text-[16px] font-bold shadow-md transition-colors hover:border-transparent hover:bg-[#2979f2]"
              >
                开始使用
              </Button>
            </div>
          </div>

          {/* 右侧光晕 Logo */}
          <div className={cn('image order-1', logoContainerCss)}>
            <div
              className={cn(
                'image-container relative mx-auto size-[320px] min-sm:size-[392px]',
                logoWrapperCss
              )}
            >
              <div
                className={cn(
                  'image-bg size-[192px] min-sm:size-[256px]',
                  logoBackgroundCss
                )}
              ></div>

              <ImagesLogo
                size={160}
                particleCount={16}
                logoColor={{
                  fillColor: '#3B82F6',
                  strokeColor: '#1E40AF'
                }}
                particleColor={['#3B82F6', '#1E40AF']}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-15 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-[#f6f6f7] p-6">
              <h2 className="text-[16px] leading-6 font-bold text-[#3c3c43]">
                {`${feature.icon} ${feature.title}`}
              </h2>
              <p className="pt-2 text-sm leading-6 text-[#67676c]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Transition>
  )
}

export default Welcome
