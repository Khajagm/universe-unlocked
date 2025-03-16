// src/components/ContentGrid.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentItem } from '@/lib/contentItems';

interface ContentGridProps {
  items: ContentItem[];
  type: string;
}

export function ContentGrid({ items, type }: ContentGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => {
        const href = item.externalURL 
          ? item.externalURL
          : `/explore/${type}/${item.celestialObject}/${item.contentType}/${item.id}`;

        return (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={item.imageSrc || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.title)}`}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={href}>
                  Explore {item.contentType === type ? item.celestialObject : item.contentType}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}