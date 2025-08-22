import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { addTask } from "../redux/taskSlice";
import TaskCard from "./TaskCard";

export default function Column({ title, status, tasks }) {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({ name: "", desc: "", priority: "Medium", category: "General" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    dispatch(addTask({ ...form, status }));
    setForm({ name: "", desc: "", priority: "Medium", category: "General" });
    setOpenForm(false);
  }

  return (
    <div className="bg-gray-100 rounded-2xl p-4 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200">
            {tasks.length}
          </span>
        </div>

        {title === "To Do" && !openForm && (
          <button
            onClick={() => setOpenForm(true)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-400 text-blue-900 hover:bg-blue-200 transition-colors"
          >
            +
          </button>

        )}
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 flex-1 transition p-1 rounded ${snapshot.isDraggingOver ? "bg-gray-200" : ""
              }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Task Form */}
      {title === "To Do" && openForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Task name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Description (optional)"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
          <div className="flex gap-2">
            <select
              className="border rounded px-2 py-2 text-sm"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input
              className="border rounded px-3 py-2 text-sm flex-1"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <button
              className="px-3 py-2 rounded bg-black text-white text-sm"
              type="submit"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setOpenForm(false)}
              className="px-3 py-2 rounded border text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
