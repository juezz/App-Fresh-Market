"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Clock, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TrackingPage() {
  // En una aplicación real, estos datos vendrían de una API
  const [orderStatus] = useState("in-transit")
  const orderNumber = "ORD-12345678"
  const orderDate = "13 de abril, 2025"
  const estimatedDelivery = "15 de abril, 2025"

  const orderItems = [
    {
      id: "1",
      name: "Manzanas Rojas",
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Plátanos Orgánicos",
      quantity: 3,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: "Fresas Premium",
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const statusSteps = [
    {
      id: "ordered",
      title: "Pedido realizado",
      description: orderDate,
      icon: CheckCircle2,
      completed: true,
    },
    {
      id: "processing",
      title: "En preparación",
      description: "Tu pedido está siendo preparado",
      icon: Package,
      completed: orderStatus !== "ordered",
    },
    {
      id: "in-transit",
      title: "En tránsito",
      description: "Tu pedido está en camino",
      icon: Truck,
      completed: orderStatus === "in-transit" || orderStatus === "delivered",
    },
    {
      id: "delivered",
      title: "Entregado",
      description: estimatedDelivery,
      icon: CheckCircle2,
      completed: orderStatus === "delivered",
    },
  ]

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
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold md:text-3xl">Seguimiento de Pedido</h1>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-green-600">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <span>Seguimiento</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Estado del Pedido #{orderNumber}</CardTitle>
                  <CardDescription>
                    Realizado el {orderDate} • Entrega estimada: {estimatedDelivery}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-5 top-0 h-full w-0.5 bg-muted" />
                    <div className="space-y-8">
                      {statusSteps.map((step) => (
                        <div key={step.id} className="relative pl-10">
                          <div
                            className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border ${
                              step.completed
                                ? "border-green-600 bg-green-600 text-white"
                                : "border-muted bg-background text-muted-foreground"
                            }`}
                          >
                            <step.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mapa de Seguimiento</CardTitle>
                  <CardDescription>Ubicación actual de tu pedido</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-lg border bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground">Mapa de seguimiento en tiempo real</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Tiempo estimado de llegada</p>
                        <p className="text-xs text-muted-foreground">15 de abril, 2025 • Entre 10:00 AM y 2:00 PM</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Actualizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Detalles del Pedido</CardTitle>
                  <CardDescription>Pedido #{orderNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div>
                      <h3 className="mb-2 font-medium">Dirección de entrega</h3>
                      <address className="not-italic text-sm text-muted-foreground">
                        <p>Juan Pérez</p>
                        <p>Calle Principal 123</p>
                        <p>Ciudad, 12345</p>
                        <p>Teléfono: +1 234 567 890</p>
                      </address>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        Contactar al repartidor
                      </Button>
                      <Button variant="outline" className="w-full">
                        Reportar un problema
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
