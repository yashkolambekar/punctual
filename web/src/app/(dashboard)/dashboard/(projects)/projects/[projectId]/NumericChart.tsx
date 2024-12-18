"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const NumericChart = () => {
const generateRandomWeight = (base: number) => {
    return base + Math.floor(Math.random() * 21) - 10; // Random number between -10 and 10
};

const data = [
    {
        name: "29",
        weight: generateRandomWeight(100),
    },
    {
        name: "30",
        weight: generateRandomWeight(110),
    },
    {
        name: "31",
        weight: generateRandomWeight(120),
    },
    {
        name: "01",
        weight: generateRandomWeight(130),
    },
    {
        name: "02",
        weight: generateRandomWeight(140),
    },
    {
        name: "03",
        weight: generateRandomWeight(150),
    },
    {
        name: "04",
        weight: generateRandomWeight(160),
    },
    {
        name: "05",
        weight: generateRandomWeight(170),
    },
    {
        name: "06",
        weight: generateRandomWeight(180),
    },
    {
        name: "07",
        weight: generateRandomWeight(190),
    },
    {
        name: "08",
        weight: generateRandomWeight(200),
    },
    {
        name: "09",
        weight: generateRandomWeight(210),
    },
    {
        name: "10",
        weight: generateRandomWeight(220),
    },
    {
        name: "11",
        weight: generateRandomWeight(230),
    },
    {
        name: "12",
        weight: generateRandomWeight(240),
    },
    {
        name: "13",
        weight: generateRandomWeight(250),
    },
    {
        name: "14",
        weight: generateRandomWeight(260),
    },
    {
        name: "15",
        weight: generateRandomWeight(270),
    },
    {
        name: "16",
        weight: generateRandomWeight(280),
    },
    {
        name: "17",
        weight: generateRandomWeight(290),
    },
];

  return (
    <>
    <div className="w-full overflow-x-scroll py-4">
      <LineChart className="w-full flex flex-col items-center justify-center" width={1100} height={300} data={data}>
        <Line type="monotone" dataKey="weight"  stroke="black" strokeWidth={2} />
        <Tooltip />
        <XAxis dataKey={"name"} />
        <YAxis />
      </LineChart>
    </div>
    </>
  );
};

export default NumericChart;
