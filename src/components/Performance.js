"use client";

import Image from "next/image";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { MoreHorizontal } from "lucide-react";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" }, // Light Blue
  { name: "Group B", value: 8, fill: "#FAE27C" },  // Light Yellow
];

const Performance = () => {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Performance</h1>
        <MoreHorizontal size={20} className="cursor-pointer text-gray-500" />
      </div>

      {/* CHART */}
      <div className="w-full h-full relative">
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* CENTER TEXT */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl font-bold text-gray-700">9.2</h1>
          <p className="text-xs text-gray-500">of 10 max LTS</p>
        </div>
      </div>
      
      {/* BOTTOM LEGEND */}
      <div className="absolute bottom-16 left-0 right-0 text-center text-sm text-gray-500 font-medium">
        1st Semester - 2nd Semester
      </div>
    </div>
  );
};

export default Performance;