"use client";

import api from "@/lib/api";
import { Switch } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import StayAwakeVideo from "./StayAwakeVideo";
import useProjectStore, { IProject } from "@/store/projects";

const TimeTile = ({ data }: { data: IProject }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [fullScreen, setFullScreen] = useState(false);
  const [checked, setChecked] = useState(data.startTime ? true : false);
  const [startTime, setStartTime] = useState<Date | null>(
    data.startTime || null
  );
  const [loading, setLoading] = useState(false);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    if (fullScreen) {
      try {
        containerRef?.current?.requestFullscreen();
      } catch (e) {
        console.error(e);
      }
    } else if (!fullScreen && document.fullscreenElement) {
      try {
        document.exitFullscreen();
      } catch (e) {
        console.error(e);
      }
    }
  }, [fullScreen]);

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      setFullScreen(false);
    }
  });

  useEffect(() => {
    if (checked && startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - new Date(startTime).getTime();
        const h = Math.floor(diff / 1000 / 60 / 60);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTime({
          h,
          m,
          s,
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTime({
        h: 0,
        m: 0,
        s: 0,
      });
    }
  }, [checked, startTime]);

  const handleToggle = (localChecked: boolean) => {
    setLoading(true);
    let url = null;

    if (localChecked) {
      url = "/records/time/on";
    } else {
      url = "/records/time/off";
    }

    api
      .post(url, { project: data._id })
      .then((res) => {
        if (localChecked) {
          setStartTime(res.data.project.startTime);
        } else {
          setStartTime(null);
        }
        setChecked(localChecked);
      })
      .catch((err) => {
        if (err.response.data.turnOff) {
          setChecked(false);
          setStartTime(null);
        } else if (err.response.data.turnOn) {
          setChecked(true);
        }
        console.error(err);
        toast.error(err.response.data.message || err.emessage);
      })
      .finally(() => {
        setLoading(false);
        fetchProjects();
      });
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`${
          fullScreen
            ? "absolute w-full h-[100dvh] top-0 left-0 z-[1000000] bg-white flex flex-col items-center justify-center "
            : "flex flex-col gap-2 border-[1px] border-solid border-[rgba(0,0,0,0.2)] rounded-lg p-4 w-full max-w-[10em] items-center text-center relative"
        }`}
      >
        {fullScreen ? (
          <StayAwakeVideo />
        ) : null}
        <div
          className="flex flex-col w-fit h-fit absolute right-0 top-0 p-2 opacity-20 hover:opacity-70 cursor-pointer"
          onClick={() => setFullScreen(!fullScreen)}
        >
          {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </div>
        <div className="flex flex-col items-center">
          <div className="p-[1em]">
            <Switch
              value={checked}
              loading={loading}
              onChange={handleToggle}
              className="scale-[1.5]"
            />
          </div>
          <div className="">
            <p className={`${fullScreen ? "text-[2em]" : "text-[1.1em]"} m-0 font-semibold`}>
              {String(time.h).padStart(2, "0")}:
              {String(time.m).padStart(2, "0")}:
              {String(time.s).padStart(2, "0")}
            </p>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center ${
            fullScreen ? "mt-3" : "h-full"
          }`}
        >
          <p className="m-0 text-[0.9em]">{data.name}</p>
        </div>
      </div>
    </>
  );
};

export default TimeTile;
