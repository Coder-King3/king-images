# King Images

## Project Introduction

King Images is a powerful image upload and management tool that supports various image formats and provides convenient upload, management, and copying features. Whether you're a developer or content creator, this tool helps you efficiently process and organize image resources.

## Key Features

### Image Upload

- **Multiple Upload Methods**: Support for drag-and-drop, click-to-select, and paste uploads
- **Batch Processing**: Support for uploading multiple images simultaneously with real-time progress display
- **Format Support**: Compatible with common image formats including JPG, PNG, GIF, and WebP
- **Upload Progress**: Real-time display of upload speed, remaining time, and success/failure status

### Image Management

- **Image Gallery**: Centralized management of all uploaded image resources
- **Quick Copy**: One-click copying of Markdown format and WebP links
- **Local Storage**: Uses IndexedDB to store image information in the browser, no server required

## Installation and Usage

### Requirements

- Node.js 16.0.0 or higher
- npm 7.0.0 or higher / pnpm 8.0.0 or higher

### Installation Steps

1. Clone the project locally

```bash
git clone https://github.com/yourusername/king-images.git
cd king-images
```

2. Install dependencies

```bash
# Using npm
npm install

# Or using pnpm
pnpm install
```

3. Start the development server

```bash
# Using npm
npm run dev

# Or using pnpm
pnpm dev
```

4. Build for production

```bash
# Using npm
npm run build

# Or using pnpm
pnpm build
```

### Usage Guide

1. **Image Upload**

   - Go to the homepage and click on the "Image Upload" tab
   - Drag images to the upload area or click the "Select Files" button
   - You can also directly copy images and paste them into the page
   - Click the "Upload All" button to start uploading
   - After uploading, images will appear in the "Recent Uploads" area

2. **Image Gallery Management**
   - Click the "Image Gallery" tab to view all uploaded images
   - Click on an image to copy the corresponding format link (Markdown or WebP)
   - You can delete or manage images as needed

## Project Structure

```
king-images/
├── src/                    # Source code
│   ├── api/                # API interfaces
│   ├── components/         # Components
│   ├── db/                 # Database related
│   ├── hooks/              # Custom Hooks
│   ├── pages/              # Pages
│   │   ├── Login/          # Login page
│   │   ├── Upload/         # Upload page
│   │   └── Welcome.tsx     # Welcome page
│   ├── types/              # Type definitions
│   └── utils/              # Utility functions
├── public/                 # Static resources
└── ...                     # Other configuration files
```

## Tech Stack

- **Frontend Framework**: React
- **UI Components**: Shadcn UI
- **State Management**: React Hooks
- **Data Storage**: Dexie.js (IndexedDB)
- **Build Tool**: Vite
- **Styling Solution**: Tailwind CSS

## Contribution Guidelines

Issues and code contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

## Contact

If you have any questions or suggestions, please contact us:

- Project Repository: [https://github.com/yourusername/king-images](https://github.com/yourusername/king-images)
- Email: your.email@example.com

---

[中文文档](README_zh.md)
