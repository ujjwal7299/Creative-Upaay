import React from "react";
import { MoreHorizontal, MessageSquare, Paperclip } from "lucide-react";

export default function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
      {/* Priority + Options */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${task.priority === "High"
              ? "bg-red-100 text-red-600"
              : task.priority === "Low"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
        >
          {task.priority}
        </span>
        <MoreHorizontal className="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800">{task.name}</h3>

      {/* Description */}
      {task.desc && (
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.desc}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        {/* Avatars (dummy for now, replace with task.assignees if you have data) */}
        <div className="flex -space-x-2">
          <img
            src="https://i.pravatar.cc/24?img=1"
            alt="user"
            className="w-6 h-6 rounded-full border"
          />
          <img
            src="https://i.pravatar.cc/24?img=2"
            alt="user"
            className="w-6 h-6 rounded-full border"
          />
          <img
            src="https://i.pravatar.cc/24?img=3"
            alt="user"
            className="w-6 h-6 rounded-full border"
          />
        </div>

        {/* Comments & Files */}
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" /> 0 comments
          </span>
          <span className="flex items-center gap-1">
            <Paperclip className="w-4 h-4" /> 0 files
          </span>
        </div>
      </div>
    </div>
  );
}
