"use client";

import { useRecoilValue, useSetRecoilState } from "recoil";
import NumericRecords from "./(numeric)/NumericsRecords";
import Projects from "./(projects)/Projects";
import TimeRecords from "./(time)/TimeRecords";
import ProjectsState from "@/store/atoms/ProjectsState";
import UpdateProjectsState from "@/store/atoms/UpdateProjectsState";
import { useEffect } from "react";
import api from "@/lib/api";

const Dashboard = () => {
  const setProjects = useSetRecoilState(ProjectsState);
  const updateProjects = useRecoilValue(UpdateProjectsState);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => {
        const projects = res.data.projects;
        setProjects(projects);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [setProjects, updateProjects]);

  return (
    <>
      <TimeRecords />
      <NumericRecords />
      <Projects />
    </>
  );
};

export default Dashboard;
