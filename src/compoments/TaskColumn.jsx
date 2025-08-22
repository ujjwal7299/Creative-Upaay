import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { useState } from "react";

export default function TaskColumn({ status, title, tasks }) {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: "",
        desc: "",
        priority: "Medium",
        category: "General"
    });

    const submit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        dispatch(addTask({ ...form, status }));
        setForm({ name: "", desc: "", priority: "Medium", category: "General" });
        setShowForm(false);
    };

    return (
        <div className="bg-white rounded-xl2 shadow-card p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                    className="px-3 py-1 rounded bg-brand-500 hover:bg-brand-600 text-white text-sm"
                    onClick={() => setShowForm((s) => !s)}
                >
                    {showForm ? "Close" : "+ Add Task"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={submit} className="mb-3 grid grid-cols-1 gap-2">
                    <input
                        className="border rounded px-3 py-2"
                        placeholder="Task name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                    <textarea
                        className="border rounded px-3 py-2"
                        placeholder="Description"
                        rows={2}
                        value={form.desc}
                        onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                    />
                    <div className="flex gap-2">
                        <select
                            className="border rounded px-3 py-2 flex-1"
                            value={form.priority}
                            onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <input
                            className="border rounded px-3 py-2 flex-1"
                            placeholder="Category"
                            value={form.category}
                            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-1 px-3 py-2 rounded bg-brand-600 text-white text-sm"
                    >
                        Add
                    </button>
                </form>
            )}

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 min-h-[220px] rounded-md p-2 transition
              ${snapshot.isDraggingOver ? "bg-brand-50" : "bg-gray-50"}`}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
