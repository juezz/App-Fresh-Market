import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
}

export function ProductCard({ id, name, price, originalPrice, image, category }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/product/${id}`} className="relative block">
        {discount > 0 && <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">-{discount}%</Badge>}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/category/${category.toLowerCase()}`}>
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
        </Link>
        <Link href={`/product/${id}`}>
          <h3 className="mb-1 font-medium">{name}</h3>
        </Link>
        <div className="mb-3 flex items-center">
          <span className="text-lg font-bold text-green-600">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al carrito
        </Button>
      </div>
    </div>
  )
}
