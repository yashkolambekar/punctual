"use client";

import ProjectsState from "@/store/atoms/ProjectsState";
import { useRecoilValue } from "recoil";
import NumericTile from "./NumericTile";

const NumericRecords = () => {
  const projects = useRecoilValue(ProjectsState);

  const projectsArray = projects.map((project) => {
    if (project.recordType == "numeric") {
      return <NumericTile key={project._id} data={project} />;
    }
  });

  return (
    <>
      <div className="px-4">
        <div className="flex flex-col py-5 gap-3">
          <div>
            <p className="text-[1.2em] font-semibold w-fit m-0">
              Numeric Records
            </p>
          </div>
          <div className="flex flex-wrap gap-4">{projectsArray}</div>
        </div>
      </div>
    </>
  );
};

export default NumericRecords;
