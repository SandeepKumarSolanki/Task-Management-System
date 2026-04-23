"use client";

import { users } from "@/data/dashboardData";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#F97316","#22C55E"];

export default function TaskChart() {
  const [selectedUserId, setSelectedUserId] = useState(1);

  const selectedUser = users.find((user) => user.id === selectedUserId)!;

  const chartData = [
    { name: "Todo", value: selectedUser.performance.todo },
    { name: "In Progress", value: selectedUser.performance.inProgress },
    { name: "Completed", value: selectedUser.performance.completed },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Task Distribution</h2>

        <select
          className="border rounded-lg px-4 py-2 w-35"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={120} label>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}