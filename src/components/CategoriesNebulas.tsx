import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Nebula } from "@/lib/nebulas"

interface CategoriesProps {
  nebulas: Nebula[]
}

export default function CategoriesNebulas({ nebulas }: CategoriesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {nebulas.map((nebula) => (
        <Card key={nebula.id}>
          <CardHeader>
            <CardTitle>{nebula.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{nebula.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
              <Link href={`/planetary-nebulas/${nebula.id}`}>
                Explore {nebula.name}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}