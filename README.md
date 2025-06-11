# Universe Unlocked - Documentation

## 1. Project Overview

Universe Unlocked is a web application designed to showcase and explore content through an organized, hierarchical structure. The application follows a category → object → content type → item pattern, allowing users to navigate through different levels of content organization.

The application features:
- A responsive, mobile-friendly interface
- Dark/light mode theming
- Interactive navigation system
- Content organization by categories and types
- Media support for various content formats (images, videos, 3D models, audio)
- Slideshow components for visual content

## 2. Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | 10.x | Animations and transitions |
| Lucide React | 0.x | Icon library |
| Vercel Blob | - | Asset storage |
| shadcn/ui | - | UI component library |

## 3. Architecture & Conventions

### Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Homepage
│   ├── explore/            # Content exploration routes
│   │   ├── [type]/         # Category or content type routes
│   │   │   ├── page.tsx
│   │   │   ├── [object]/   # Object-specific routes
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [contentType]/  # Content type within object
│   │   │   │   │   ├── [itemId]/   # Individual content items
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui components
│   ├── content/            # Content-specific components
├── contexts/               # React contexts (ThemeContext)
├── lib/                    # Utility functions and data
│   ├── contentItems.ts     # Content data store
│   ├── contentTypes.ts     # Content type definitions
│   ├── celestialObjects.ts # Object definitions
│   ├── assetUtils.ts       # Asset handling utilities
│   ├── slideshowUtils.ts   # Slideshow helper functions
├── styles/                 # Global styles
\`\`\`

### Routing Convention

The application uses Next.js App Router with dynamic routes:

- `/` - Homepage
- `/explore/[type]` - Category or content type listing
- `/explore/[type]/[object]` - Object within a category
- `/explore/[type]/[object]/[contentType]` - Content type within an object
- `/explore/[type]/[object]/[contentType]/[itemId]` - Individual content item

### Data Flow

1. Content is defined in `lib/contentItems.ts`
2. Content types are defined in `lib/contentTypes.ts`
3. Celestial objects are defined in `lib/celestialObjects.ts`
4. Components consume this data based on route parameters
5. Theme state is managed through React Context

### Styling Conventions

- Tailwind CSS for styling with consistent class naming
- Dark/light mode theming via `isDarkMode` prop or `useTheme()` hook
- Responsive design with mobile-first approach
- Component-specific styling with consistent patterns

## 4. Deployment Guide

### Deploying to Vercel

1. **Prerequisites**:
   - A Vercel account
   - GitHub repository with the codebase

2. **Setup Vercel Project**:
   - Import the GitHub repository in Vercel
   - Configure the build settings:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`

3. **Environment Variables**:
   - Set up the following environment variables in Vercel:
     \`\`\`
     BLOB_READ_WRITE_TOKEN=<your-vercel-blob-token>
     NEXT_PUBLIC_ASSET_BASE_URL=<your-asset-base-url>
     \`\`\`

4. **Deploy**:
   - Trigger a deployment from the Vercel dashboard
   - Vercel will automatically build and deploy the application

### Custom Domain Setup

1. Add your domain in the Vercel project settings
2. Follow Vercel's instructions to configure DNS settings
3. Enable HTTPS for secure connections

## 5. Local Development Setup

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or bun package manager

### Installation Steps

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/your-username/universe-unlocked.git
   cd universe-unlocked
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   bun install
   \`\`\`

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   \`\`\`
   BLOB_READ_WRITE_TOKEN=<your-vercel-blob-token>
   NEXT_PUBLIC_ASSET_BASE_URL=<your-asset-base-url>
   \`\`\`

4. **Start the development server**:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   \`\`\`

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## 6. Content Management

### Current Content Structure

Content in Universe Unlocked is currently managed through TypeScript files in the `lib` directory:

#### Adding New Content Items

1. Open `src/lib/contentItems.ts`
2. Add a new item to the `contentItems` array following the existing pattern:
   \`\`\`typescript
   {
     id: "unique-item-id",
     title: "Item Title",
     description: "Item description",
     celestialObject: "object-id",
     category: "category-id",
     contentType: "content-type-id",
     imageSrc: "/path/to/image.jpg", // Optional
     videoSrc: "https://youtube.com/watch?v=xyz", // Optional
     audioSrc: "/path/to/audio.mp3", // Optional
     modelSrc: "/path/to/model.glb", // Optional
     externalURL: "https://example.com", // Optional
     altText: "Descriptive alt text", // Optional
   }
   \`\`\`

#### Adding New Content Types

1. Open `src/lib/contentTypes.ts`
2. Add a new entry to the `contentTypes` object:
   \`\`\`typescript
   "content-type-id": {
     id: "content-type-id",
     title: "Content Type Title",
     description: "Content type description",
     iconName: "IconName", // Optional
     icon: IconComponent, // Optional
     imageSrc: "/path/to/image.jpg", // Optional
     altText: "Descriptive alt text", // Optional
   }
   \`\`\`

#### Adding New Celestial Objects

1. Open `src/lib/celestialObjects.ts`
2. Add a new object to the `celestialObjects` array:
   \`\`\`typescript
   {
     id: "object-id",
     name: "Object Name",
     description: "Object description",
     category: "category-id",
     imageSrc: "/path/to/image.jpg", // Optional
     altText: "Descriptive alt text", // Optional
     distance: "1,000 light-years", // Optional
     constellation: "Constellation Name", // Optional
     discoveredBy: "Discoverer Name", // Optional
     yearDiscovered: 2000, // Optional
   }
   \`\`\`

### Asset Management

Assets are managed through Vercel Blob storage:

1. **Uploading Assets**:
   - Use the `/admin/assets` route in the application
   - Or use the Vercel Blob API directly

2. **Referencing Assets**:
   - Use the `getAssetUrl()` function from `src/lib/assetUtils.ts`
   - For external assets, use full URLs

## 7. Key Components

### Core Components

- **Header**: Main navigation header with theme toggle and back button
- **Navigation**: Sidebar navigation with expandable categories
- **Footer**: Simple footer with copyright information
- **PageTransition**: Wrapper for page transition animations
- **ContentGrid**: Displays content items in a grid layout

### Media Components

- **SlideshowSingle**: Single image slideshow for homepage
- **InteriorSlideshow**: Enhanced slideshow for interior pages
- **MediaPlayer**: Audio/video player with controls
- **ModelViewer**: 3D model viewer and downloader
- **ImageGallery**: Image gallery with lightbox
- **YouTubeEmbed**: YouTube video embed component

### Content Type Components

- **StoryContent**: Displays story/text content with audio
- **VideoContent**: Displays video content
- **ImageContent**: Displays image content
- **ModelContent**: Displays 3D model content

## 8. Future Considerations

### Content Management System

For easier content management, consider implementing:
- A headless CMS integration (Contentful, Sanity, etc.)
- A custom admin interface for content editing
- Database storage instead of TypeScript files

### Performance Optimizations

- Implement pagination for large content collections
- Add search functionality
- Optimize asset loading with better caching strategies

### Feature Enhancements

- User accounts and personalization
- Content filtering and sorting
- Social sharing capabilities
- Analytics integration

---
