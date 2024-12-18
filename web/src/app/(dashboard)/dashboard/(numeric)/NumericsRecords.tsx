"use client";

import NumericTile from "./NumericTile";
import useProjectStore from "@/store/projects";

const NumericRecords = () => {
  
  const projects = useProjectStore((state) => state.projects);

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
