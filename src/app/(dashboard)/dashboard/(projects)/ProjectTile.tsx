import { IProject } from "@/store/atoms/ProjectsState";
import { Button } from "antd";
import eyeIcon from "@/assets/eye-svgrepo-com.svg";
import Image from "next/image";
import Link from "next/link";

const ProjectTile = ({ data }: { data: IProject }) => {
  return (
    <>
      <div className="p-2 border-[1px] border-[rgba(0,0,0,0.2)] border-solid rounded-lg flex items-center gap-2">
        <p className="m-0 text-[1em]">{data.name}</p>
        <Link href={`/dashboard/projects/${data._id}`} className="flex flex-col items-center pt-[2px] opacity-20 hover:opacity-100">
          <Image
            className="m-0 p-0 h-[1.2em] w-fit"
            src={eyeIcon}
            alt="View project"
          />
        </Link>
      </div>
    </>
  );
};

export default ProjectTile;
