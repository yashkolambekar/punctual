"use client";

import ProjectTile from "./ProjectTile";
import Link from "next/link";
import useProjectStore from "@/store/projects";

const Projects = () => {
  
  const projects = useProjectStore((state) => state.projects);

  return (
    <>
      <div className="px-4">
        <div className="flex py-5 gap-3 items-center">
        <p className="text-[1.2em] font-semibold w-fit m-0">Projects</p>
        <Link href={"/new/project"} className="text-[0.8em]">Add new</Link>
        </div>
        <div className="flex flex-wrap gap-4">
          {projects.map((project) => (
            <ProjectTile key={project._id} data={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
