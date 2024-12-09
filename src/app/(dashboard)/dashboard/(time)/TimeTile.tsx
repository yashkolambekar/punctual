"use client";

import api from "@/lib/api";
import { IProject } from "@/store/atoms/ProjectsState";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TimeTile = ({ data }: { data: IProject }) => {
  const [checked, setChecked] = useState(data.startTime ? true : false);
  const [startTime, setStartTime] = useState<Date | null>(data.startTime || null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    if(checked && startTime) {
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
    }else{
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
        if(localChecked) {
          setStartTime(res.data.project.startTime);
        }else{
          setStartTime(null);
        }
        setChecked(localChecked);
      })
      .catch((err) => {
        if(err.response.data.turnOff) {
          setChecked(false);
          setStartTime(null);
        }else if (err.response.data.turnOn) {
          setChecked(true);
          
        }
        console.error(err);
        toast.error(err.response.data.message || err.emessage);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-2 border-[1px] border-solid border-[rgba(0,0,0,0.2)] rounded-lg p-4 w-full max-w-[10em] items-center text-center">
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
            <p className="text-[1.1em] m-0 font-semibold">
                {String(time.h).padStart(2, '0')}:{String(time.m).padStart(2, '0')}:{String(time.s).padStart(2, '0')}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="m-0 text-[0.9em]">{data.name}</p>
        </div>
      </div>
    </>
  );
};

export default TimeTile;
