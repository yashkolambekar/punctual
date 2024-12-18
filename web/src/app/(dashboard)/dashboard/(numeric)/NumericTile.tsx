"use client";

import api from "@/lib/api";
import { IProject } from "@/store/projects";
import { Button, Input } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import TimeAgo from "timeago-react";

const NumericTile = ({ data }: { data: IProject }) => {
  const [initialValue, setInitialValue] = useState(
    data.numericValue ? data.numericValue : "00.00"
  );
  const [currentValue, setCurrentValue] = useState<string | number>(
    initialValue
  );
  const valueNotChanged = currentValue == initialValue;
  const [latestUpdate, setLatestUpdate] = useState(data.lastUpdate);

  const handleSubmit = () => {
    if (valueNotChanged) {
      toast.error("Value not changed");
      return;
    }

    api
      .post("/records/numeric", {
        project: data._id,
        value: Number(currentValue),
      })
      .then(() => {
        toast.success("Value updated");
        setCurrentValue(currentValue);
        setInitialValue(currentValue);
        setLatestUpdate(new Date());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="p-4 pt-2 border-[1px] border-[rgba(0,0,0,0.2)] border-solid rounded-lg flex flex-col gap-2 w-full max-w-[10em]">
        <div className="h-1 w-full"></div>
        <Input
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
          variant="borderless"
          className="!m-0 !p-0 h-[1em] min-w-[2em] text-[3em] font-semibold"
          placeholder={String(initialValue)}
          value={currentValue}
        />
        <p className="m-0">{data.name}</p>
        <Button
          onClick={handleSubmit}
          disabled={valueNotChanged ? true : false}
          type="primary"
        >
          {valueNotChanged ? (
            latestUpdate ? (
              <TimeAgo live={false} datetime={latestUpdate} locale="en_US" />
            ) : (
              "Last Value"
            )
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </>
  );
};

export default NumericTile;
