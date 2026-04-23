"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectsTable from "@/components/projects/ProjectsTable";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DashboardLayout
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <h1 className="text-3xl font-semibold">Project List</h1>
      <ProjectsTable searchTerm={searchTerm} />
    </DashboardLayout>
  );
}