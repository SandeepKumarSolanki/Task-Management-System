import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import TaskChart from "@/components/dashboard/TaskChart";
import RecentUsers from "@/components/dashboard/RecentUsers";
import { statsCards } from "@/data/dashboardData";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">
        <TaskChart />
        <RecentUsers />
      </div>
    </DashboardLayout>
  );
}