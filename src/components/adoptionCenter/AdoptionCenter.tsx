"use client"

import HeaderTitle from "@/components/HeaderTitle"
import AdoptionCenterPost from "@/components/adoptionCenter/AdoptionCenterPost"
import { SafeUser } from "@/types"
import React from "react"

const AdoptionCenter = ({ currUser }: { currUser?: SafeUser | null }) => {
  return (
    <div className="w-[89.3333vw] md:w-full max-w-[1240px] mx-auto px-0 md:px-8">
      <div className="py-[60px]">
        <div className="flex mx-auto flex-col items-center mb-12">
          <HeaderTitle className="text-lg md:text-4xl">
            {currUser?.username ?? "My"} adoption center
          </HeaderTitle>
        </div>
        <AdoptionCenterPost />
      </div>
    </div>
  )
}

export default AdoptionCenter
