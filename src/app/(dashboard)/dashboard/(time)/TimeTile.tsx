"use client";

import api from "@/lib/api";
import { IProject } from "@/store/atoms/ProjectsState";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TimeTile = ({ data }: { data: IProject }) => {
  const [checked, setChecked] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    console.log("checked:", checked, "startTime:", startTime);
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
    }
  }, [checked, startTime]);

  const handleToggle = (checked: boolean) => {
    let url = null;

    if (checked) {
      url = "/records/time/on";
    } else {
      url = "/records/time/off";
    }

    api
      .post(url, { project: data._id })
      .then((res) => {
        setChecked(true);
        console.log(res.data);
        setStartTime(res.data.record.startTime);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message || err.emessage);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-2 border border-solid border-black rounded-lg p-4">
        <div className="flex flex-col items-center">
          <div className="p-[1em]">
            <Switch
              value={checked}
              onChange={handleToggle}
              className="scale-[1.5]"
            />
          </div>
          <div>
            <p className="text-[1.1em] m-0 font-semibold">
                {String(time.h).padStart(2, '0')}:{String(time.m).padStart(2, '0')}:{String(time.s).padStart(2, '0')}
            </p>
          </div>
        </div>
        <div>
          <p className="m-0">{data.name}</p>
        </div>
      </div>
    </>
  );
};

export default TimeTile;
