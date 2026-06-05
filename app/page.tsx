import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryCard } from "@/components/category-card"
import { ProductCard } from "@/components/product-card"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Fixed WhatsApp Button */}
      <div className="fixed right-4 top-3/4 transform -translate-y+40 z-50 flex flex-col items-center space-y-2">
        <Link href="https://wa.me/573112345678?text=Hola,%20estoy%20interesado%20en%20sus%20productos" target="_blank">
          <Button
            variant="ghost"
            className="flex items-center justify-center rounded-full bg-green-100 p-2 hover:bg-green-200"
          >
            <Image
              src="/Contacto.jpeg?height=80&width=80"
              alt="Contacto WhatsApp"
              width={80}
              height={80}
              className="h-10 w-10"
            />
          </Button>
        </Link>
        <span className="text-sm font-medium text-green-600">Contáctanos</span>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png?height=40&width=40"
              alt="FreshMarket Logo"
              width={110}
              height={80}
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
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
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
          {/* Banner Promocional */}
          <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-lg">
            <Image
              src="/Descuento.png?height=300&width=1200"
              alt="Promoción especial"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 p-8 text-white">
              <h2 className="mb-2 text-3xl font-bold">Ofertas de Temporada</h2>
              <p className="mb-4 text-lg">Hasta 30% de descuento en frutas frescas</p>
              <Button className="bg-green-600 hover:bg-green-900">Ver ofertas</Button>
            </div>
          </div>

          {/* Categorías */}
          <section className="mb-10">
            <h2 className="mb-6 text-2xl font-bold">Categorías</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <CategoryCard title="Frutas" image="/Fruta.jpeg?height=100&width=100" href="/category/frutas" />
              <CategoryCard title="Verduras" image="/Verduras.jpeg?height=100&width=100" href="/category/verduras" />
              <CategoryCard title="Lácteos" image="/Lacteos.jpg?height=100&width=100" href="/category/lacteos" />
              <CategoryCard title="Carnes" image="/Carne.jpg?height=100&width=100" href="/category/carnes" />
              <CategoryCard
                title="Panadería"
                image="/Pan.jpg?height=100&width=100"
                href="/category/panaderia"
              />
              <CategoryCard title="Bebidas" image="/Bebida.jpg?height=100&width=100" href="/category/bebidas" />
            </div>
          </section>

          {/* Productos Destacados */}
          <section className="mb-10">
            <h2 className="mb-6 text-2xl font-bold">Productos Destacados</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <ProductCard
                id="1"
                name="Manzanas Rojas"
                price={4500}
                image="/Manzana%20Roja.jpeg?height=200&width=200"
                category="Frutas"
              />
              <ProductCard
                id="2"
                name="Plátanos Orgánicos"
                price={2800}
                image="/Platano%20Organico.jpeg?height=200&width=200"
                category="Frutas"
              />
              <ProductCard
                id="3"
                name="Lechuga Fresca"
                price={3800}
                image="/Lechuga%20Fresca.jpeg?height=200&width=200"
                category="Verduras"
              />
              <ProductCard
                id="4"
                name="Tomates"
                price={4200}
                image="/Tomate.jpeg?height=200&width=200"
                category="Verduras"
              />
            </div>
          </section>

          {/* Ofertas Especiales */}
          <section>
            <h2 className="mb-6 text-2xl font-bold">Ofertas Especiales</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <ProductCard
                id="5"
                name="Fresas Premium"
                price={12500}
                originalPrice={14000}
                image="/Fresas.jpg?height=200&width=200"
                category="Frutas"
              />
              <ProductCard
                id="6"
                name="Zanahorias Orgánicas"
                price={2800}
                originalPrice={3500}
                image="/Zanahoria.jpeg?height=200&width=200"
                category="Verduras"
              />
              <ProductCard
                id="7"
                name="Yogurt Natural"
                price={8500}
                originalPrice={9200}
                image="/Yogur.jpg?height=200&width=200"
                category="Lácteos"
              />
              <ProductCard
                id="8"
                name="Pan Integral"
                price={6800}
                originalPrice={7500}
                image="/Pan integral.jpeg?height=200&width=200"
                category="Panadería"
              />
            </div>
          </section>
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
            <p>© {new Date().getFullYear()} FreshMarket. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
