
import AppSidebar from "@/components/layout/AppSidebar";
import { getServerSession } from "next-auth";
import { Lato } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { authOptions } from "../api/auth/[...nextauth]/route";
import "./globals.css";

const inter = Lato({ subsets: ["latin"] , weight: ["400", "700"]});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);

  const headersList = headers();
  const url = headersList.get("next-url");

  if(!session){
    return redirect('/');
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
        <main className="flex min-h-screen">
            <aside className="bg-white w-48 p-4 pt-8 shadow">
                <div className="rounded-full overflow-hidden aspect-square w-24 mx-auto">
                  <Image src={session.user.image} width={256} height={256} alt={'avatar'} />
                </div>
                <div className="text-center">
                  <AppSidebar />
                </div>
            </aside>
            <div className="grow">
              <div className="bg-white m-8 p-4 shadow">
                {children}
              </div>
            </div>
        </main>
      </body>
    </html>
  );
}
