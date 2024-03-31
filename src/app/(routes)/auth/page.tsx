import HeaderTitle from "@/components/HeaderTitle"
import AuthForm from "@/components/auth/AuthForm"
import { Suspense } from "react"

export default async function Auth() {
  return (
    <div className="w-full max-w-[1240px] mx-auto xl:px-0 px-4">
      <div className="py-[60px]">
        <div className="mx-auto flex flex-col items-center">
          <HeaderTitle description="Connect with pet lovers around the world">
            Welcome to Pawnection
          </HeaderTitle>
        </div>
      </div>
      <Suspense>
        <AuthForm />
      </Suspense>
    </div>
  )
}
