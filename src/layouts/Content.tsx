interface ContentProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Content = ({ children, style = {} }: ContentProps) => {
  return (
    <main className="flex flex-1 flex-col transition-all ease-in" style={style}>
      <div className="flex flex-1 flex-col"> {children}</div>
    </main>
  )
}

export default Content
