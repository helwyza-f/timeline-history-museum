import { Geist } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import CursorGlow from "@/components/CursorGlow";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: "Museum Timeline | Sejarah Museum",
  description: "Timeline interaktif sejarah museum dari masa ke masa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${geist.variable} dark:dark`}>
      <body className="min-h-screen bg-stone-200 dark:bg-gray-900 text-gray-900 dark:text-white font-sans antialiased depth-bg">
        {/* <CursorGlow /> */}
        <ThemeToggle />
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95  backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-14 md:h-20 items-center pl-10">
              <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center text-2xl space-x-2 font-bold" href="/">
                  Museum Timeline
                </a>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 dark:border-gray-800 py-6 md:py-0 ">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-14 md:flex-row">
              <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left">
                Built with ❤️ menggunakan Next.js dan Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 