"use client"

import { LostPetReport } from "@prisma/client"
import { FoundPetReport } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useEffect, useState } from "react"

import { SafeUser } from "../../types"
import HeaderTitle from "../HeaderTitle"
import { Button } from "../ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog"
import ProfileTabs from "./tabs/ProfileTabs"

const Profile = ({
  user,
  isProfileOwner,
  currentUser,
}: {
  user: SafeUser
  isProfileOwner: boolean
  currentUser: SafeUser
}) => {
  const [reports, setReports] = useState<
    | (FoundPetReport & { type: string })[]
    | (LostPetReport & { type: string })[]
    | null
  >(null)
  const [isCurrentFollowed, setIsCurrentFollowed] = useState<
    boolean | null | undefined
  >(user.isCurrentFollowed)
  const [fo, setFo] = useState<{
    followerCount: number | undefined
    followingCount: number | undefined
  }>({
    followerCount: user.followers?.length,
    followingCount: user.following?.length,
  })

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/user/reports/by/" + user.id, {
          method: "GET",
        })

        if (!response.ok) {
          throw new Error("Error loading reports")
        }

        const data = await response.json()

        const typedReports = data.map(
          (report: LostPetReport | FoundPetReport) => ({
            ...report,
            type: "foundArea" in report ? "FoundPetReport" : "LostPetReport",
          }),
        )
        setReports(typedReports)
      } catch (error) {
        console.error("Failed to fetch user reports:", error)
        setReports(null)
      }
    }

    fetchReports()
  }, [])

  return (
    <div className=" max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[89.3333vw] flex flex-col md:flex-row items-center gap-4 md:gap-8 pt-[60px] pb-[40px] justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Image
              className="object-cover w-20 h-20 md:w-40 md:h-40 p-1 rounded-full ring-2 ring-primary"
              src={user?.image ? user.image : "/icon.png"}
              width={160}
              height={160}
              alt="Bordered avatar"
            />
            <div className="border rounded-xl px-1.5 py-1 text-sm w-fit ">
              {user?.type === "PetAdoptionCentre" && "Adoption Centre"}
            </div>
          </div>

          <div className="flex flex-col col-span-5 w-[89.3333vw] md:w-auto justify-center">
            <div className="flex flex-col md:flex-row gap-8 mb-2 items-center">
              <HeaderTitle className="break-words text-center md:text-left ml-0  md:ml-4 w-full ">
                {user.username}
              </HeaderTitle>
            </div>

            <div className="w-[89.3333vw] md:w-auto mt-4 flex flex-row gap-6 items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="hover:bg-transparent"
                    variant="ghost"
                    disabled={!currentUser}
                  >
                    {fo.followingCount} Following
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogDescription>Following</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-1">
                    {user.following && user.following.length > 0 ? (
                      user.following?.map((following) => (
                        <Link
                          href={`/profile/${following.username}`}
                          key={following.username}
                          className="flex items-center justify-between hover:bg-gray-200/20 p-2 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              className="object-cover w-10 h-10 rounded-full"
                              src={
                                following.image ? following.image : "/icon.png"
                              }
                              width={40}
                              height={40}
                              alt="Bordered avatar"
                            />
                            <p>{following.username}</p>
                          </div>
                          {!(following.username === currentUser?.username) ? (
                            !following.isCurrentFollowed ? (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={async () => {
                                  await fetch("/api/user/follow", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      username: following.username,
                                    }),
                                  }).then(() => {
                                    setIsCurrentFollowed(true)
                                    setFo((prev) => ({
                                      ...prev,
                                      followerCount:
                                        prev.followerCount &&
                                        prev.followerCount + 1,
                                    }))
                                  })
                                }}
                              >
                                Follow
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  await fetch("/api/user/unfollow", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      username: following.username,
                                    }),
                                  }).then(() => {
                                    setIsCurrentFollowed(false)
                                    setFo((prev) => ({
                                      ...prev,
                                      followerCount:
                                        prev.followerCount &&
                                        prev.followerCount - 1,
                                    }))
                                  })
                                }}
                              >
                                Unfollow
                              </Button>
                            )
                          ) : null}
                        </Link>
                      ))
                    ) : (
                      <p className="text-center">No following</p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="hover:bg-transparent"
                    variant="ghost"
                    disabled={!currentUser}
                  >
                    {fo.followerCount} Follower
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogDescription>Follower</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-1">
                    {user.followers && user.followers.length > 0 ? (
                      user.followers?.map((follower) => (
                        <Link
                          href={`/profile/${follower.username}`}
                          key={follower.username}
                          className="flex items-center justify-between hover:bg-gray-200/20 p-2 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              className="object-cover w-10 h-10 rounded-full"
                              src={
                                follower.image ? follower.image : "/icon.png"
                              }
                              width={40}
                              height={40}
                              alt="Bordered avatar"
                            />
                            <p>{follower.username}</p>
                          </div>
                          {!(follower.username === currentUser?.username) ? (
                            !follower.isCurrentFollowed ? (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={async () => {
                                  await fetch("/api/user/follow", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      username: follower.username,
                                    }),
                                  }).then(() => {
                                    setIsCurrentFollowed(true)
                                    setFo((prev) => ({
                                      ...prev,
                                      followerCount:
                                        prev.followerCount &&
                                        prev.followerCount + 1,
                                    }))
                                  })
                                }}
                              >
                                Follow
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  await fetch("/api/user/unfollow", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      username: follower.username,
                                    }),
                                  }).then(() => {
                                    setIsCurrentFollowed(false)
                                    setFo((prev) => ({
                                      ...prev,
                                      followerCount:
                                        prev.followerCount &&
                                        prev.followerCount - 1,
                                    }))
                                  })
                                }}
                              >
                                Unfollow
                              </Button>
                            )
                          ) : null}
                        </Link>
                      ))
                    ) : (
                      <p className="text-center">No followers</p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              {isProfileOwner && (
                <Button className="w-16 md:px-4 px-2">
                  <Link href="/settings">Edit</Link>
                </Button>
              )}
              {!isProfileOwner ? (
                !isCurrentFollowed ? (
                  <Button
                    className="w-20"
                    onClick={async () => {
                      await fetch("/api/user/follow", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: user.username }),
                      }).then(() => {
                        setIsCurrentFollowed(true)
                        setFo((prev) => ({
                          ...prev,
                          followerCount:
                            prev.followerCount && prev.followerCount + 1,
                        }))
                      })
                    }}
                  >
                    Follow
                  </Button>
                ) : (
                  <Button
                    className="w-20"
                    onClick={async () => {
                      await fetch("/api/user/unfollow", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: user.username }),
                      }).then(() => {
                        setIsCurrentFollowed(false)
                        setFo((prev) => ({
                          ...prev,
                          followerCount:
                            prev.followerCount && prev.followerCount - 1,
                        }))
                      })
                    }}
                    variant="outline"
                  >
                    Unfollow
                  </Button>
                )
              ) : null}
            </div>

            <p className="ml-0 md:ml-4 flex text-sm pt-8 md:justify-start justify-center">
              {user?.bio}
            </p>
          </div>
        </div>
      </div>

      <div>
        <ProfileTabs
          reports={reports}
          user={user}
          currentUser={currentUser}
          isProfileOwner={isProfileOwner}
        />
      </div>
    </div>
  )
}

export default Profile
