const footerContent = {
  copyright: 'Copyright © 2025-present King3',
  message: 'Released under the MIT License.'
}

function Footer() {
  return (
    <footer className="border-t border-[#e2e2e3] py-2">
      <div className="flex flex-col items-center justify-center gap-0.5 px-4 text-center text-[#67676c]">
        <p className="message text-sm">{footerContent.message}</p>
        <p className="copyright text-sm">{footerContent.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
