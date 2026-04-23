import { StatsCardType } from "@/types/dashboard";

export default function StatsCard({ title, value, color}: StatsCardType) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>

        <div className={`w-10 h-10 rounded-full ${color}`}></div>
      </div>
    </div>
  );
}