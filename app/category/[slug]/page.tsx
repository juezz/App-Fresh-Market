import Link from "next/link"
import Image from "next/image"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ProductCard } from "@/components/product-card"
import { MainNav } from "@/components/main-nav"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

  // Datos de ejemplo - en una aplicación real vendrían de una API o base de datos
  const products = [
    {
      id: "1",
      name: "Manzanas Rojas",
      price: 2.99,
      image: "/Manzana%20Roja.jpeg?height=200&width=200",
      category: "Frutas",
    },
    {
      id: "2",
      name: "Plátanos Orgánicos",
      price: 1.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Frutas",
    },
    {
      id: "3",
      name: "Lechuga Fresca",
      price: 1.49,
      image: "/placeholder.svg?height=200&width=200",
      category: "Verduras",
    },
    {
      id: "4",
      name: "Tomates",
      price: 2.49,
      image: "/placeholder.svg?height=200&width=200",
      category: "Verduras",
    },
    {
      id: "5",
      name: "Fresas Premium",
      price: 3.99,
      originalPrice: 5.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Frutas",
    },
    {
      id: "6",
      name: "Zanahorias Orgánicas",
      price: 1.29,
      originalPrice: 1.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Verduras",
    },
  ]

  // Filtrar productos por categoría
  const filteredProducts = products.filter((product) => product.category.toLowerCase() === slug)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="FreshMarket Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-green-600">FreshMarket</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar productos..." className="w-[300px] pl-8" />
            </div>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <Image src="/placeholder.svg?height=24&width=24" alt="Carrito" width={24} height={24} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="hidden md:inline-flex">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
        <MainNav />
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{categoryName}</h1>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-green-600">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span>{categoryName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Filtros */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Filtros</h2>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Limpiar
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">Precio</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" placeholder="Min" className="h-8" />
                    <Input type="number" placeholder="Max" className="h-8" />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">Tipo</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="organic" />
                      <Label htmlFor="organic" className="text-sm">
                        Orgánico
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="conventional" />
                      <Label htmlFor="conventional" className="text-sm">
                        Convencional
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">Disponibilidad</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-stock" />
                      <Label htmlFor="in-stock" className="text-sm">
                        En stock
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="out-of-stock" />
                      <Label htmlFor="out-of-stock" className="text-sm">
                        Agotado
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">Aplicar filtros</Button>
            </div>

            {/* Productos */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{filteredProducts.length} productos encontrados</span>
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <Select defaultValue="relevance">
                    <SelectTrigger className="h-8 w-full sm:w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevancia</SelectItem>
                      <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="newest">Más recientes</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative block sm:hidden">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Buscar..." className="h-8 w-full pl-8" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white py-6">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Sobre Nosotros</h3>
              <p className="text-sm text-muted-foreground">
                FreshMarket es tu tienda online para comprar productos frescos y de calidad directamente a tu hogar.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-600">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-600">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-green-600">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
              <address className="not-italic text-sm text-muted-foreground">
                <p>Email: info@freshmarket.com</p>
                <p>Teléfono: +1 234 567 890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FreshMarket. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
