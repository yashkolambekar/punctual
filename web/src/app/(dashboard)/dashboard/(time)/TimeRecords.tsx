"use client";

import TimeTile from "./TimeTile/TimeTile";
import useProjectStore from "@/store/projects";

const TimeRecords = () => {
  
  const projects = useProjectStore((state) => state.projects);

  return (
    <>
      <div className="px-4">
        <div className="flex py-5 gap-3 items-center">
          <p className="text-[1.2em] font-semibold w-fit m-0">
            Time Based Records
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {projects.map((project) => {
            if (project.recordType == "time") {
              return <TimeTile key={project._id} data={project} />;
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default TimeRecords;
