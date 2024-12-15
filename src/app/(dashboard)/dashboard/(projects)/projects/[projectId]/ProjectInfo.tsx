"use client";

import api from "@/lib/api";
import { IProject } from "@/store/projects";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
  const [project, setProject] = useState<IProject>();

  const options = [
    {
        label: "Year",
        value: "year"
    },
    {
        label: "Month",
        value: "month"
    },
    {
        label: "Week",
        value: "week"
    },
    {
        label: "Day",
        value: "day"
    }
  ]

  useEffect(() => {
    api
      .get(`/projects?id=${projectId}`)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Failed to get project info");
      });
  }, [projectId]);

  return (
    <>
      <div className="flex">
        <div className="w-full">
          <p className="text-[0.7em] font-light m-0">Project Name</p>
          <p className="text-[2em] font-bold m-0">{project?.name}</p>
          {project?.description ? (
            <p className="mt-1">{project?.description}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex-shrink-0">
            <Radio.Group 
            options={options}
            optionType="button"
            />
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
