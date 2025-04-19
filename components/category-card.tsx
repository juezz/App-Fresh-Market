import Link from "next/link"
import Image from "next/image"

interface CategoryCardProps {
  title: string
  image: string
  href: string
}

export function CategoryCard({ title, image, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center overflow-hidden rounded-lg border bg-white p-3 shadow-sm transition-all hover:shadow-md">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <h3 className="mt-2 text-center text-sm font-medium">{title}</h3>
      </div>
    </Link>
  )
}
