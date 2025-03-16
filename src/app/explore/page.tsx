import { getUniqueCategories } from '@/lib/dataUtils';
import { ContentGrid } from '@/components/ContentGrid';

// ... rest of your component code

export default function ExplorePage() {
  const categories = getUniqueCategories();
  return (
    <div>
      <h1>Explore the Universe</h1>
      <ContentGrid items={categories.map(category => ({
        id: category,
        title: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
        description: `Explore ${category}`,
        category: category,
        contentType: 'category',
        celestialObject: ''
      }))} />
    </div>
  );
}