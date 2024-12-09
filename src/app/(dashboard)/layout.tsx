"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter()

  if(typeof window !== "undefined" && !localStorage.getItem("token")){
    toast.error("Please login or register");
    router.push("/login");
  }


  return (
    <>
      <div className="w-full min-h-[100dvh] flex flex-col items-center">
        <Header />
        <div className="w-full max-w-[1200px] min-h-[100dvh] flex flex-col">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
