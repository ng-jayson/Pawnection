"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

const PetSitting = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col md:flex-row md:space-x-12 items-center">
      <Image
        width={520}
        height={396}
        src="/home/cat_pink.webp"
        alt="Pet sitting"
        className="w-full"
      />
      <div className="mx-auto justify-center md:m-0 flex flex-col">
        <HeaderTitle className="mx-auto md:m-0 text-[40px] md:text-5xl max-md:mt-7 md:text-left">
          Pet Sitting
        </HeaderTitle>
        <p className="text-center md:text-left text-lg py-5 mt-2">
          Browse through the list of pets looking for a sitter, there may be
          Golden Retriever, British Shorthair, or Parrot waiting for you!
        </p>
        <Button
          className="w-40 md:mx-0 mx-auto"
          onClick={() => router.push("/explore")}
        >
          View More
        </Button>
      </div>
    </div>
  )
}

export default PetSitting
