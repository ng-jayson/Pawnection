import AdoptionCenterManager from "@/components/adoptionCenter/AdoptionCenterManager"
import { getCurrentUser } from "@/lib/actions/user"
import prisma from "@/lib/prismadb"
import { notFound } from "next/navigation"

export default async function AdoptionCenterManagePage({
  params,
}: {
  params: { id: string }
}) {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.type === "PetLover") {
    return notFound()
  }

  const getAllOwnAdoptablePet = await prisma.adoptablePet.findFirst({
    where: {
      adoptionCentreId: currentUser.id,
      id: params.id,
    },
    include: {
      adoptionRequests: true,
    },
    take: 20,
  })

  if (getAllOwnAdoptablePet) {
    return (
      <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
        <div className="py-[60px]">
          <AdoptionCenterManager data={getAllOwnAdoptablePet} />
        </div>
      </div>
    )
  }
}