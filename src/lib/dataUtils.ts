// src/lib/dataUtils.ts

import contentItems, { ContentItem } from './contentItems';

export function getUniqueCategories(): string[] {
  return Array.from(new Set(contentItems.map(item => item.category)));
}

export function getAllContentOfType(contentType: string): ContentItem[] {
  return contentItems.filter(item => item.contentType === contentType);
}

export function getObjectContent(category: string, objectId: string): ContentItem[] {
  return contentItems.filter(item => item.category === category && item.celestialObject === objectId);
}

export function getCategoryContent(category: string): ContentItem[] {
  return contentItems.filter(item => item.category === category);
}

export function getSpecificContent(category: string, objectId: string, contentType: string, itemId: string): ContentItem | undefined {
  return contentItems.find(item => 
    item.category === category && 
    item.celestialObject === objectId && 
    item.contentType === contentType && 
    item.id === itemId
  );
}

export function getUniqueCelestialObjects(category: string): string[] {
  return Array.from(new Set(contentItems
    .filter(item => item.category === category)
    .map(item => item.celestialObject)
  ));
}