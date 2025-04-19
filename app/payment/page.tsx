"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CreditCard, MapPin, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Datos de ejemplo - en una aplicación real vendrían de un estado global o API
  const cartItems = [
    {
      id: "1",
      name: "Manzanas Rojas",
      price: 2.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Plátanos Orgánicos",
      price: 1.99,
      quantity: 3,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "5",
      name: "Fresas Premium",
      price: 3.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 4.99
  const tax = subtotal * 0.16
  const total = subtotal + shipping + tax

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
            <h1 className="text-2xl font-bold md:text-3xl">Proceso de Pago</h1>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-green-600">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link href="/cart" className="hover:text-green-600">
                Carrito
              </Link>
              <span className="mx-2">/</span>
              <span>Pago</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Dirección de Envío
                  </CardTitle>
                  <CardDescription>Ingresa la dirección donde quieres recibir tu pedido</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" placeholder="Juan Pérez" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" placeholder="+1 234 567 890" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" placeholder="Calle y número" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="Ciudad" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Código Postal</Label>
                      <Input id="postal-code" placeholder="12345" />
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    Método de Envío
                  </CardTitle>
                  <CardDescription>Selecciona cómo quieres recibir tu pedido</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="standard">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="font-medium">
                          Envío Estándar
                        </Label>
                      </div>
                      <span>$4.99</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="font-medium">
                          Envío Express
                        </Label>
                      </div>
                      <span>$9.99</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    Método de Pago
                  </CardTitle>
                  <CardDescription>Selecciona cómo quieres pagar tu pedido</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Tarjeta</TabsTrigger>
                      <TabsTrigger value="transfer">Transferencia</TabsTrigger>
                      <TabsTrigger value="cash">Efectivo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-4">
                      <form className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Número de tarjeta</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Fecha de expiración</Label>
                            <Input id="expiry" placeholder="MM/AA" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Nombre en la tarjeta</Label>
                          <Input id="card-name" placeholder="Juan Pérez" />
                        </div>
                      </form>
                    </TabsContent>
                    <TabsContent value="transfer" className="mt-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">Datos bancarios</h3>
                        <p className="text-sm text-muted-foreground">
                          Realiza una transferencia a la siguiente cuenta:
                        </p>
                        <div className="mt-4 space-y-2 text-sm">
                          <p>
                            <span className="font-medium">Banco:</span> Banco Nacional
                          </p>
                          <p>
                            <span className="font-medium">Titular:</span> FreshMarket S.A.
                          </p>
                          <p>
                            <span className="font-medium">Cuenta:</span> 1234-5678-9012-3456
                          </p>
                          <p>
                            <span className="font-medium">Referencia:</span> Tu número de pedido
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="cash" className="mt-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">Pago en efectivo</h3>
                        <p className="text-sm text-muted-foreground">
                          Pagarás en efectivo al momento de recibir tu pedido.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Envío</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Impuestos</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">Confirmar pago</Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Al confirmar, aceptas nuestros{" "}
                      <Link href="#" className="text-green-600 hover:underline">
                        Términos y Condiciones
                      </Link>
                    </p>
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
