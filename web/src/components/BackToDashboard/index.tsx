import Image from "next/image";
import Link from "next/link";
import backIcon from "@/assets/back-svgrepo-com.svg";

const BackToDashboard = () => {
  return (
    <>
      <Link href="/dashboard">
            <Image src={backIcon} alt="back" width={20} height={20} />
            </Link>
            <div className="h-4 w-full">

            </div>
    </>
  );
};

export default BackToDashboard;