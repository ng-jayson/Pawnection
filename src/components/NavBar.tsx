"use client"

import { SafeUser } from "@/types"
import { Menu } from "lucide-react"
import { LogOut, Settings, User, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import PostForm from "./explore/PostForm"
import { Button } from "./ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import { NavigationMenu, NavigationMenuList } from "./ui/NavMenu"
import { Spinner } from "./ui/Spinner"

function NavBar({ currentUser }: { currentUser?: SafeUser | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const session = useSession()
  const username = currentUser?.username

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="sticky top-0 z-[100] flex w-full place-content-between px-4 py-4 drop-shadow md:px-8 lg:px-16 items-center border-b bg-main">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Image
          src="/pawnection.svg"
          alt="Pawnection"
          width={0}
          height={0}
          priority={true}
          className="cursor-pointer h-[30px] w-[187.5px]"
          onClick={() => {
            router.push("/")
          }}
        />
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <Menu size={24} />
        </div>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="hidden md:flex space-x-4">
          {session.status === "authenticated" && (
            <>
              <div className="flex items-center">
                <Link
                  prefetch={false}
                  href="/lostAndFound"
                  className="whitespace-nowrap text-primary text-xs xl:text-sm font-medium hover:bg-submain p-2 md:px-4 rounded-md ease-in-out duration-200"
                >
                  Lost & Found
                </Link>
                {currentUser?.type !== "PetAdoptionCentre" ? (
                  <Link
                    prefetch={false}
                    href="/adopt"
                    className="whitespace-nowrap text-primary text-xs xl:text-sm font-medium hover:bg-submain p-2 md:px-4 rounded-md ease-in-out duration-200"
                  >
                    Adopt
                  </Link>
                ) : (
                  <Link
                    prefetch={false}
                    href="/adoptionCenter"
                    className="whitespace-nowrap text-primary text-xs xl:text-sm font-medium hover:bg-submain p-2 md:px-4 rounded-md ease-in-out duration-200"
                  >
                    Adoption
                  </Link>
                )}
                <Link
                  prefetch={false}
                  href="/explore"
                  className="whitespace-nowrap text-primary text-xs xl:text-sm font-medium hover:bg-submain p-2 md:px-4 rounded-md ease-in-out duration-200"
                >
                  Explore
                </Link>
                <Link
                  prefetch={false}
                  href="/recommendations"
                  className="whitespace-nowrap text-primary text-xs xl:text-sm font-medium hover:bg-submain p-2 md:px-4 rounded-md ease-in-out duration-200"
                >
                  Recommendations
                </Link>
              </div>
            </>
          )}
          {session.status === "authenticated" && (
            <>
              <PostForm />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    className="rounded-full h-10 w-10 ring-1 ring-primary ring-offset-2 hover:opacity-80 ease-in-out duration-200 cursor-pointer"
                    src={
                      !currentUser?.image
                        ? "/icon.png"
                        : currentUser?.image
                              .split("image/upload")[0]
                              .includes("cloudinary")
                          ? `${
                              currentUser?.image?.split("/image/upload/")[0]
                            }/image/upload/c_fill,h_160,w_160/${
                              currentUser?.image?.split("/image/upload/")[1]
                            }`
                          : currentUser?.image
                    }
                    width={160}
                    height={160}
                    alt="Your avatar"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() =>
                        !currentUser
                          ? router.push("/auth")
                          : router.push(`/profile/${username}`)
                      }
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {session.status === "loading" ? (
            <Button className="w-20 px-4">
              <Spinner />
            </Button>
          ) : (
            session.status !== "authenticated" && (
              <Button
                className="w-20 px-4"
                onClick={() => router.push("/auth")}
              >
                Sign In
              </Button>
            )
          )}
        </NavigationMenuList>
        <div
          className={
            isOpen
              ? "fixed right-0 top-0 w-[65%] md:hidden h-screen bg-submain p-4"
              : "hidden"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={toggleMenu} className="cursor-pointer">
              <X size={24} className="mb-2" />
            </div>
          </div>
          <div className="flex-col">
            {session.status === "authenticated" && (
              <ul className="space-y-5">
                <li>
                  <Link
                    prefetch={false}
                    href={`/profile/${currentUser?.username}`}
                    onClick={toggleMenu}
                  >
                    <div className="flex rounded-lg py-1 px-2 hover:bg-main/70 ease-in-out duration-200">
                      <div className="ml-2">
                        <p className="text-[18px] font-bold">
                          {currentUser?.username}
                        </p>
                        <p className="text-[14px] text-neutral-500">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link
                    prefetch={false}
                    href="/lostAndFound"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-main/70 py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Lost & Found
                  </Link>
                </li>
                <li>
                  {currentUser?.type !== "PetAdoptionCentre" ? (
                    <Link
                      prefetch={false}
                      href="/adopt"
                      onClick={toggleMenu}
                      className="text-primary text-sm font-medium hover:bg-main/70 py-2 px-4 rounded-md ease-in-out duration-200"
                    >
                      Adopt
                    </Link>
                  ) : (
                    <Link
                      prefetch={false}
                      href="/adoptionCenter"
                      onClick={toggleMenu}
                      className="text-primary text-sm font-medium hover:bg-main/70 rounded-md ease-in-out duration-200 py-2 px-4"
                    >
                      Adoption
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/explore"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-main/70 py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/recommendations"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-main/70 py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Recommendations
                  </Link>
                </li>
                <li>
                  <div className="ml-3 " onClick={toggleMenu}>
                    <PostForm />
                  </div>
                </li>
                <li>
                  <Link
                    prefetch={false}
                    href="/settings"
                    onClick={toggleMenu}
                    className="text-primary text-sm font-medium hover:bg-main/70 py-2 px-4 rounded-md ease-in-out duration-200"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            )}

            {session.status !== "authenticated" ? (
              <ul>
                <li>
                  <Button
                    className="w-20 px-4"
                    onClick={() => router.push("/auth")}
                  >
                    Sign In
                  </Button>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Button
                    className="w-fit mt-4 hover:bg-main/70"
                    variant="ghost"
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </NavigationMenu>
    </div>
  )
}

export default NavBar
