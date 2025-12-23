import NavBar from "@/components/NavBar"
import Footer from "@/components/ui/Footer"
import { Toaster } from "@/components/ui/Toaster"
import AuthContext from "@/context/AuthContext"
import { getCurrentUser } from "@/lib/actions/user"
import type { Metadata } from "next"
import "./globals.css"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Pawnection",
  description: "Your paw's social media network",
  icons: {
    icon: "/icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden font-sans">
        <AuthContext>
          <main className="min-h-[calc(100vh-78px)] w-full">
            <NavBar currentUser={currentUser} />
            {children}
          </main>
          <Footer />
        </AuthContext>
        <Toaster />
      </body>
    </html>
  )
}
