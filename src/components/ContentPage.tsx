import { ContentItem } from '@/lib/contentItems';

interface ContentPageProps {
  content: ContentItem;
}

export default function ContentPage({ content }: ContentPageProps) {
  switch (content.contentType) {
    case '3d-models':
      return (
        <div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          {/* Add 3D model viewer component here */}
        </div>
      );
    case 'videos':
      return (
        <div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          {content.videoSrc && <video src={content.videoSrc} controls />}
        </div>
      );
    case 'sonification':
      return (
        <div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          {content.audioSrc && <audio src={content.audioSrc} controls />}
        </div>
      );
    case 'stories':
      return (
        <div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          {/* Add story content here */}
        </div>
      );
    default:
      return <div>Unknown content type</div>;
  }
}