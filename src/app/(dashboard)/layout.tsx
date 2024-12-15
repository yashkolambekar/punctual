"use client";

import Header from "@/components/Header";
import useProjectStore from "@/store/projects";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  
  const router = useRouter()
  
  if(typeof window !== "undefined" && !localStorage.getItem("token")){
    toast.error("Please login or register");
    router.push("/login");
  }
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  
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
