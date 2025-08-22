import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todo: [
        { id: nanoid(), name: "Design login page", desc: "Follow Figma spacing", priority: "High", category: "Design" },
        { id: nanoid(), name: "Set up Tailwind", desc: "Configure theme tokens", priority: "Medium", category: "Setup" }
    ],
    inProgress: [
        { id: nanoid(), name: "Redux wiring", desc: "Store + slices", priority: "Medium", category: "Dev" }
    ],
    done: [
        { id: nanoid(), name: "Project scaffolding", desc: "Vite + React", priority: "Low", category: "Setup" }
    ]
};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: {
            prepare: (payload) => {
                const { name, desc = "", priority = "Medium", category = "General", status = "todo" } = payload;
                return { payload: { id: nanoid(), name, desc, priority, category, status } };
            },
            reducer: (state, action) => {
                const { status, ...task } = action.payload;
                state[status || "todo"].push(task);
            }
        },
        moveTask: (state, action) => {
            const { from, to, taskId, destIndex } = action.payload;
            if (!state[from] || !state[to]) return;

            // remove from source by id
            const srcIdx = state[from].findIndex((t) => t.id === taskId);
            if (srcIdx === -1) return;
            const [task] = state[from].splice(srcIdx, 1);

            // insert into destination at destIndex (bounded)
            const insertAt =
                typeof destIndex === "number"
                    ? Math.max(0, Math.min(destIndex, state[to].length))
                    : state[to].length;

            state[to].splice(insertAt, 0, task);
        }
    }
});

export const { addTask, moveTask } = slice.actions;
export default slice.reducer;
