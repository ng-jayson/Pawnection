import HeaderTitle from "@/components/HeaderTitle"
import { Badge } from "@/components/ui/Badge"
import { Label } from "@/components/ui/Label"
import { getAllAdoptablePets } from "@/lib/actions/adopt"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

export default async function AdoptViewAllPetsPage() {
  const adoptablePets = await getAllAdoptablePets()

  if (!adoptablePets) {
    return notFound()
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-8">
      <div className="py-[60px] w-full">
        <HeaderTitle className="max-w-full">Adoptable Pets</HeaderTitle>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
        {adoptablePets.map((pet) => (
          <Link
            href={pet.status === "Adopted" ? "#" : `/adopt/requests/${pet.id}`}
            key={pet.id}
            className={cn(
              "bg-white rounded-lg shadow-md",
              pet.status === "Adopted" && "opacity-80",
            )}
          >
            <Image
              width={200}
              height={200}
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{pet.name}</h2>
              <p className="text-gray-500">{pet.breed}</p>
              <p className="text-gray-500">{pet.age} years old</p>
              <div className="space-x-2">
                {pet.status === "Adopted" ? (
                  <Label className="text-red-500">Adopted</Label>
                ) : (
                  <Label>Available</Label>
                )}
                {pet.adoptionRequests.length > 0 && <Badge>Requested</Badge>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
