"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"

const LostAndFound = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col md:flex-row md:space-x-12 items-center">
      <Image
        width={590}
        height={520}
        src="/home/dog_luggage.webp"
        alt="Lost and found pet"
        className="w-full"
      />
      <div className="mx-auto justify-center md:m-0 flex flex-col">
        <HeaderTitle className="mx-auto md:m-0 text-[40px] md:text-5xl max-md:mt-7 md:text-left">
          Lost and Found
        </HeaderTitle>
        <p className="text-center md:text-left text-lg py-5 mt-2">
          Have you lost a beloved pet or found one wandering around? Our Lost &
          Found section is here to help reunite pets with their owners
        </p>
        <Button
          className="w-40 md:mx-0 mx-auto"
          onClick={() => router.push("/lostAndFound")}
        >
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default LostAndFound
