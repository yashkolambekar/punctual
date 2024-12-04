import Header from "@/components/Header";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import MenuElement from "./Menu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
