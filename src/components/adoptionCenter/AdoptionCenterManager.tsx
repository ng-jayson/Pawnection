"use client"

import { toast } from "@/hooks/useToast"
import { cn } from "@/lib/utils"
import { AdoptablePet, AdoptionRequest } from "@prisma/client"
import { Trash } from "lucide-react"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"

import BackButton from "../BackButton"
import HeaderTitle from "../HeaderTitle"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog"
import { Button } from "../ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"
import AdoptionCenterManagerForm from "./AdoptionCenterManagerForm"

export default function AdoptionCenterManager({
  data,
}: {
  data: AdoptablePet & { adoptionRequests: AdoptionRequest[] }
}) {
  const router = useRouter()

  const handleAccept = async (id: string) => {
    const set = await fetch(`/api/adoptionCenter/${data.id}/${id}/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to accept request",
        description: msg.message,
      })
    } else {
      toast({
        title: "Request accepted successfully",
        description: "Successfully accepted! Please wait...",
      })
      router.refresh()
    }
  }

  const handleReject = async (id: string) => {
    const set = await fetch(`/api/adoptionCenter/${data.id}/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    const msg = await set.json()
    if (!set.ok) {
      toast({
        variant: "destructive",
        title: "Failed to reject request",
        description: msg.message,
      })
    } else {
      toast({
        title: "Request rejected successfully",
        description: "Successfully rejected! Please wait...",
      })
      router.refresh()
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <BackButton />
        <HeaderTitle>Edit Pet Details</HeaderTitle>

        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-fit" variant="destructive">
                <Trash className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this adoption listing
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const set = await fetch("/api/adoptionCenter/" + data.id, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      cache: "no-store",
                    })
                    const msg = await set.json()
                    if (!set.ok) {
                      toast({
                        variant: "destructive",
                        title: "Failed to delete",
                        description: msg.message,
                      })
                    } else {
                      toast({
                        title: "Deleted successfully",
                        description: "Successfully deleted! Please wait...",
                      })
                      router.push("/adoptionCenter")
                    }
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="w-[89.3333vw] md:w-full flex flex-col md:flex-row gap-12 mt-12 mx-auto">
        <div className="rounded-xl bg-white h-full col-span-1 shadow-lg">
          <div className="md:w-[440px] md:h-auto">
            <Image
              src={data.imageUrl}
              alt={data.name}
              priority
              width={1000}
              height={1000}
              className="rounded-t-xl h-full bg-cover bg-center w-full object-cover max-h-[440px]"
            />
          </div>
          <div className="px-8 pb-6">
            <AdoptionCenterManagerForm data={data} />
          </div>
        </div>

        <div className="w-full h-full col-span-2 flex flex-col">
          <p className="text-left text-lg font-semibold">Requests</p>

          <div className="mt-6 w-full flex-grow flex">
            {data.adoptionRequests.length === 0 ? (
              <p>No requests yet</p>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                {data.adoptionRequests.map((request) => (
                  <div
                    key={request.id}
                    className={cn(
                      "rounded-xl bg-white p-4 flex-grow",
                      "flex justify-between items-center",
                    )}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="cursor-pointer">
                          <p className="text-lg font-bold">
                            {request.full_name}
                          </p>
                          <p>{request.phone_number}</p>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto">
                        <DialogHeader>Adoption Request Details</DialogHeader>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-0.5">
                            <p className="font-bold">Full Name</p>
                            <p>{request?.full_name || "-"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold">Age</p>
                            <p>{request?.age || "-"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold">Phone Number</p>
                            <p>{request?.phone_number || "-"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold">Address</p>
                            <p>{request?.address || "-"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold">Type Desired</p>
                            <p>{request?.type_desired || "-"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold">Breed Desired</p>
                            <p>{request?.breed_desired || "-"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold">Work Details</p>
                            <p>{request?.work_details || "-"}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-bold">Lifestyle Details</p>
                            <p>{request?.lifestyle_details || "-"}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {request.request_status === "Pending" && (
                      <div className="space-x-2">
                        <Button
                          onClick={async () => await handleAccept(request.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={async () => await handleReject(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}

                    {request.request_status === "Approved" && (
                      <p className="text-green-600">Approved</p>
                    )}

                    {request.request_status === "Rejected" && (
                      <p className="text-red-600">Rejected</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
