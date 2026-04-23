"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Project } from "@/types/project";

interface Props {
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project | null;
}

const membersList = ["Anurag", "Sandeep", "Vinay", "Ankit", "Rahul"];

export default function ProjectModal({ onClose, onSave, project }: Props) {
  const [form, setForm] = useState<Project>(() => ({
    id: project?.id ?? Math.floor(Math.random() * 100000),
    name: project?.name ?? "",
    created: project?.created ?? "",
    deadline: project?.deadline ?? "",
    end: project?.end ?? "",
    team: project?.team ?? [],
  }));

  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSave({
      ...form,
      created: new Date().toLocaleDateString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-122 max-w-xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-semibold">
            {project ? "Edit Project" : "Create Project"}
          </h3>

          <button onClick={onClose}>
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-3 w-">
          <div>
            <label className="block mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Project name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Members</label>
            <select
              value={form.team[0] || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  team: [e.target.value],
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Select member</option>
              {membersList.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                min={form.deadline || new Date().toISOString().split("T")[0]}
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Brief project description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              {project ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}