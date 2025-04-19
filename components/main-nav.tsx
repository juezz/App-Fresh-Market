"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Frutas", href: "/category/frutas" },
  { name: "Verduras", href: "/category/verduras" },
  { name: "Lácteos", href: "/category/lacteos" },
  { name: "Carnes", href: "/category/carnes" },
  { name: "Panadería", href: "/category/panaderia" },
  { name: "Bebidas", href: "/category/bebidas" },
  { name: "Ofertas", href: "/ofertas" },
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-green-600 text-white">
      <div className="container flex h-10 items-center px-4 sm:px-6">
        <Button variant="ghost" size="icon" className="mr-2 text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <ul className="flex space-x-6">
            {categories.map((category) => (
              <li key={category.name}>
                <Link href={category.href} className="text-sm font-medium text-white hover:text-green-100">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {isOpen && (
        <div className="container px-4 pb-3 md:hidden">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="block text-sm font-medium text-white hover:text-green-100"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
