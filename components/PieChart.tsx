"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface PieType{
    name:string;
    value:number;
    [key: string]: string | number;
}

export default function PieOnly({data}:{data:PieType[]}) {

  const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

  return (
    <div className="flex justify-center items-center w-full">
        <div  style={{ width: 200, height: 200 }}>
      <ResponsiveContainer>
        <PieChart >
          <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          stroke="transparent"
        >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip formatter={(value: number | undefined) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
      
    </div>
</div>
    
  );
}
