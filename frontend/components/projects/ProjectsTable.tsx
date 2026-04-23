"use client";

import { useEffect, useMemo, useState } from "react";
import { projectData } from "@/data/projectData";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
import ProjectModal from "./ProjectModal";
import { Project } from "@/types/project";

interface Props {
  searchTerm: string;
}

export default function ProjectsTable({ searchTerm }: Props) {
  const [projects, setProjects] = useState<Project[]>(() => {
  if (typeof window !== "undefined") {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : projectData;
  }
  return projectData;
});
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 5;

 useEffect(() => {
  localStorage.setItem("projects", JSON.stringify(projects));
}, [projects]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const totalPages = Math.ceil(filteredProjects.length / perPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const saveProject = (newProject: Project) => {
    if (editProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === newProject.id ? newProject : p))
      );
      setEditProject(null);
    } else {
      setProjects((prev) => [newProject, ...prev]);
    }
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditProject(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          + Add Project
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-3">Project</th>
              <th>Created</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProjects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="py-4">{project.name}</td>
                <td>{project.created}</td>
                <td>{project.start}</td>
                <td>{project.end}</td>
                <td className="flex gap-3 py-4">
                  <Pencil
                    size={16}
                    className="cursor-pointer"
                    onClick={() => {
                      setEditProject(project);
                      setModalOpen(true);
                    }}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteProject(project.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {modalOpen && (
        <ProjectModal
          project={editProject}
          onClose={() => {
            setModalOpen(false);
            setEditProject(null);
          }}
          onSave={saveProject}
        />
      )}
    </>
  );
}