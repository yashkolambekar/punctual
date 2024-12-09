"use client";

import ProjectsState from "@/store/atoms/ProjectsState";
import { useRecoilState, useRecoilValue } from "recoil";
import ProjectTile from "./ProjectTile";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import UpdateProjectsState from "@/store/atoms/UpdateProjectsState";

const Projects = () => {
  const [projects, setProjects] = useRecoilState(ProjectsState);
  const updateProjects = useRecoilValue(UpdateProjectsState);

  useEffect(() => {
    api.get("/projects").then((res) => {
      const projects = res.data.projects;
      setProjects(projects);
    }).catch((e)=> {
      console.error(e);
    });
  }, [setProjects, updateProjects]);

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
