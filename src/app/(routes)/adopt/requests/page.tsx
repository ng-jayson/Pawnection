import HeaderTitle from "@/components/HeaderTitle"
import { getAllOwnAdpotRequests } from "@/lib/actions/adopt"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

export default async function AdoptPetRequests() {
  const ownrequests = await getAllOwnAdpotRequests()

  if (!ownrequests) {
    return notFound()
  }
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-8">
      <div className="py-[60px]">
        <HeaderTitle className="max-w-full">Your Adoption Requests</HeaderTitle>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
        {ownrequests?.length > 0 ? (
          ownrequests.map((request) => (
            <Link
              href={"/adopt/process/" + request.adoptablePet.id}
              key={request.id}
              className="bg-white rounded-lg shadow-md"
            >
              <Image
                width={200}
                height={200}
                src={request.adoptablePet.imageUrl}
                alt={request.adoptablePet.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {request.adoptablePet.name}
                </h2>
                <p className="text-gray-500">{request.adoptablePet.breed}</p>
                <p className="text-gray-500">{request.age} years old</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center">
            <p>You have not made any adoption requests</p>
          </div>
        )}
      </div>
    </div>
  )
}
