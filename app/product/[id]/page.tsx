"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Datos de ejemplo - en una aplicación real vendrían de una API
  const product = {
    id,
    name: "Manzanas Rojas Premium",
    price: 2.99,
    description:
      "Manzanas rojas premium cultivadas orgánicamente. Dulces, crujientes y perfectas para comer directamente o usar en tus recetas favoritas.",
    category: "Frutas",
    stock: 50,
    rating: 4.5,
    reviews: 128,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    details: {
      origin: "Huertos locales",
      weight: "1kg (aproximadamente 5-6 manzanas)",
      organic: true,
      nutritionalInfo: "Rica en fibra y vitamina C",
    },
  }

  // Productos relacionados
  const relatedProducts = [
    {
      id: "2",
      name: "Plátanos Orgánicos",
      price: 1.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Frutas",
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
      id: "7",
      name: "Naranjas Jugosas",
      price: 2.49,
      image: "/placeholder.svg?height=200&width=200",
      category: "Frutas",
    },
    {
      id: "9",
      name: "Uvas Verdes",
      price: 4.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Frutas",
    },
  ]

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

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
            <div className="flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-green-600">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-green-600">
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span>{product.name}</span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="flex space-x-2 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 overflow-hidden rounded-md border ${
                      selectedImage === index ? "ring-2 ring-green-600" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Vista ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h1 className="mb-2 text-2xl font-bold md:text-3xl">{product.name}</h1>
                <div className="mb-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < product.rating
                              ? "fill-yellow-400 text-yellow-400 [clip-path:inset(0_50%_0_0)]"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-muted-foreground">/ kg</span>
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <Separator className="my-6" />

              <div className="mb-6 space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 flex items-center rounded-lg border p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Disminuir cantidad</span>
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Aumentar cantidad</span>
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">{product.stock} disponibles</span>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Añadir al carrito
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Añadir a favoritos
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Envío gratuito en pedidos superiores a $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Share2 className="h-4 w-4 text-green-600" />
                  <span>Compartir este producto</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="nutritional">Información Nutricional</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Origen</h3>
                    <p className="text-sm text-muted-foreground">{product.details.origin}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Peso</h3>
                    <p className="text-sm text-muted-foreground">{product.details.weight}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Orgánico</h3>
                    <p className="text-sm text-muted-foreground">{product.details.organic ? "Sí" : "No"}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Almacenamiento</h3>
                    <p className="text-sm text-muted-foreground">Conservar en un lugar fresco y seco</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="nutritional" className="mt-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Información Nutricional</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{product.details.nutritionalInfo}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Calorías</span>
                      <span className="text-sm font-medium">52 kcal</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Carbohidratos</span>
                      <span className="text-sm font-medium">14g</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Fibra</span>
                      <span className="text-sm font-medium">2.4g</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Azúcares</span>
                      <span className="text-sm font-medium">10g</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Proteínas</span>
                      <span className="text-sm font-medium">0.3g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Vitamina C</span>
                      <span className="text-sm font-medium">8% VD</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image src="/placeholder.svg?height=40&width=40" alt="Avatar" fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-medium">María García</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">Hace 2 días</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Excelentes manzanas, muy frescas y dulces. Llegaron en perfecto estado y el sabor es increíble.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image src="/placeholder.svg?height=40&width=40" alt="Avatar" fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-medium">Carlos Rodríguez</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">Hace 1 semana</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Muy buena calidad, aunque algunas venían un poco golpeadas. El sabor es muy bueno.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ver todas las reseñas
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Productos relacionados</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((product) => (
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
