import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import { Footer } from "../components/Footer";
import { cn } from "@/lib/utils";
import { Inter } from 'next/font/google'

export const metadata = {
  title: "Shadcn + Auth starter",
};
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={cn("bg-gray-50 text-gray-900")}>
        <Header />
        <AuthProvider>
          <main className="main-container">
          {children}
          </main>
           <Toaster />
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
