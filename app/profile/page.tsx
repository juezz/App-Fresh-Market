"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CreditCard, LogOut, Package, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders")

  // Datos de ejemplo - en una aplicación real vendrían de una API
  const orders = [
    {
      id: "ORD-12345678",
      date: "13 de abril, 2025",
      status: "Entregado",
      total: 19.95,
    },
    {
      id: "ORD-87654321",
      date: "5 de abril, 2025",
      status: "Entregado",
      total: 34.5,
    },
    {
      id: "ORD-23456789",
      date: "28 de marzo, 2025",
      status: "Entregado",
      total: 25.75,
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
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Button>
          </div>
        </div>
        <MainNav />
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold md:text-3xl">Mi Perfil</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <div className="relative h-24 w-24">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">Juan Pérez</h2>
                  <p className="text-sm text-muted-foreground">Cliente desde marzo 2025</p>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="flex flex-col space-y-1">
                  <Button
                    variant={activeTab === "orders" ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </Button>
                  <Button
                    variant={activeTab === "account" ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Información Personal
                  </Button>
                  <Button
                    variant={activeTab === "payment" ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Métodos de Pago
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="ghost" className="justify-start text-red-500 hover:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </nav>
              </CardContent>
            </Card>

            <div className="lg:col-span-3">
              {activeTab === "orders" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de Pedidos</CardTitle>
                    <CardDescription>Revisa tus pedidos anteriores y su estado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No tienes pedidos realizados aún.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="flex flex-col justify-between rounded-lg border p-4 sm:flex-row sm:items-center"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{order.id}</h3>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <div className="mt-2 flex items-center gap-4 sm:mt-0">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <Link href={`/tracking?order=${order.id}`}>
                                <Button variant="outline" size="sm">
                                  Ver detalles
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "account" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información de contacto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre</Label>
                          <Input id="name" defaultValue="Juan" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastname">Apellido</Label>
                          <Input id="lastname" defaultValue="Pérez" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" defaultValue="juan@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" defaultValue="+1 234 567 890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" defaultValue="Calle Principal 123" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input id="city" defaultValue="Ciudad" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postal-code">Código Postal</Label>
                          <Input id="postal-code" defaultValue="12345" />
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">Guardar cambios</Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Métodos de Pago</CardTitle>
                    <CardDescription>Administra tus tarjetas y métodos de pago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
                              <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">Visa terminada en 4242</p>
                              <p className="text-sm text-muted-foreground">Expira: 12/2026</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">Añadir nuevo método de pago</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "settings" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración</CardTitle>
                    <CardDescription>Administra tus preferencias y seguridad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="notifications">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                        <TabsTrigger value="security">Seguridad</TabsTrigger>
                      </TabsList>
                      <TabsContent value="notifications" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Notificaciones por email</p>
                              <p className="text-sm text-muted-foreground">Recibe actualizaciones sobre tus pedidos</p>
                            </div>
                            <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-green-600 p-1">
                              <div className="h-4 w-4 rounded-full bg-white"></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Notificaciones de ofertas</p>
                              <p className="text-sm text-muted-foreground">Recibe ofertas y promociones especiales</p>
                            </div>
                            <div className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-muted p-1 justify-end">
                              <div className="h-4 w-4 rounded-full bg-white"></div>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">Guardar preferencias</Button>
                      </TabsContent>
                      <TabsContent value="security" className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Contraseña actual</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Nueva contraseña</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">Cambiar contraseña</Button>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
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
