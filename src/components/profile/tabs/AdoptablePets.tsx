"use client"

import { fetcher } from "@/lib/utils"
import { SafeUser } from "@/types"
import { AdoptablePet } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import useSWR from "swr"

import Loading from "../../Loading"
import { TabsContent } from "../../ui/Tabs"

interface ProfileAdoptablePetsTabInterface {
  user: SafeUser
  isProfileOwner: boolean
  currentUser: SafeUser
}

function ProfileAdoptablePetsTab({
  user,
  isProfileOwner,
  currentUser,
}: ProfileAdoptablePetsTabInterface) {
  const { data: adoptablePets, isLoading } = useSWR<{ data: AdoptablePet[] }>(
    `/api/adoptionCenter/by/${user.id}`,
    fetcher,
  )

  if (isLoading) {
    return (
      <TabsContent value="adoptablepets">
        <div className="flex justify-center w-full py-4">
          <Loading />
        </div>
      </TabsContent>
    )
  }

  const pets = adoptablePets?.data ?? []

  return (
    <TabsContent value="adoptablepets" className="w-full h-fit">
      {pets.length > 0 ? (
        <div className="mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="cursor-pointer flex flex-col bg-white rounded-lg shadow-md"
            >
              {isProfileOwner || currentUser.type === "PetLover" ? (
                <Link
                  href={
                    isProfileOwner
                      ? "/adoptionCenter/manage/" + pet.id
                      : "/adopt/requests/" + pet.id
                  }
                  key={pet.id}
                >
                  <div className="w-full h-48 relative">
                    <Image
                      width={400}
                      height={400}
                      src={pet.imageUrl}
                      alt={pet.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="flex flex-col p-4 rounded-b-lg">
                    <h2 className="text-xl font-bold">{pet.name}</h2>
                    <p className="text-orange-500 capitalize">{pet.type}</p>
                    <p className="text-gray-500">{pet.age} years old</p>
                    <div className="mt-4 border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                      {pet.status === "Adopted" ? (
                        <p className="text-red-500 font-semibold">Adopted</p>
                      ) : (
                        <p className="text-green-500 font-semibold">
                          Available
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div>
                  <div className="w-full h-48 relative">
                    <Image
                      width={400}
                      height={400}
                      src={pet.imageUrl}
                      alt={pet.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="flex flex-col p-4 rounded-b-lg">
                    <h2 className="text-xl font-bold">{pet.name}</h2>
                    <p className="text-orange-500 capitalize">{pet.type}</p>
                    <p className="text-gray-500">{pet.age} years old</p>
                    <div className="mt-4 border rounded-xl px-1.5 py-1 flex items-center text-sm w-fit">
                      {pet.status === "Adopted" ? (
                        <p className="text-red-500 font-semibold">Adopted</p>
                      ) : (
                        <p className="text-green-500 font-semibold">
                          Available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full flex justify-center items-center text-center">
          <p>No result found</p>
        </div>
      )}
    </TabsContent>
  )
}

export default ProfileAdoptablePetsTab
