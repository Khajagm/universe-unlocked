import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Rocket, Video, Music, BookOpen } from 'lucide-react'
import nebulaItems, { NebulaItem } from '@/lib/nebulaItems'

interface NebulaItemsProps {
  nebulaId: string;
  isDarkMode: boolean;
}

const categoryIcons = {
  "3d-models": Rocket,
  "videos": Video,
  "sonification": Music,
  "stories": BookOpen
};

export default function NebulaItems({ nebulaId, isDarkMode }: NebulaItemsProps) {
  const items = nebulaItems[nebulaId as keyof typeof nebulaItems];

  if (!items) {
    return <div>No items found for this nebula.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(Object.keys(items) as Array<keyof typeof items>).map((category) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons];
        return (
          <Card key={category} className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
            <CardHeader>
              <Icon className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>{category.charAt(0).toUpperCase() + category.slice(1)}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>
                {items[category][0].description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                <Link href={`/planetary-nebulas/${nebulaId}/${category}`}>
                  Explore {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}