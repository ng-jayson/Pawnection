"use client"

import Image from "next/image"

function HowtoCard({
  imagePath,
  title,
  description,
}: {
  imagePath: string
  title: string
  description: string
}) {
  return (
    <div className="border rounded-lg bg-white shadow-md p-4 flex flex-col md:flex-row gap-4">
      <Image
        src={imagePath}
        className="bg-cover bg-center border border-gray-200 object-cover w-full h-[200px] md:w-[100px] md:h-[100px]"
        width={100}
        height={100}
        alt="featured1"
      />

      <div className="space-y-2">
        <h4 className="text-base md:text-sm">{title}</h4>
        <p className="text-base md:text-sm">{description}</p>
      </div>
    </div>
  )
}

export default HowtoCard
