import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { quizPermission } from "@/lib/actions/companion.action";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnHub",
  description: "Study with your personal real-time AI companion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isQuiz = await quizPermission();

  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased flex flex-col min-h-screen`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: "#00e269" } }}>
          <Navbar isQuiz={isQuiz} />
          <div className="grow flex flex-col">
            {children}
          </div>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}

