import { configureStore } from "@reduxjs/toolkit";
import tasks from "./taskSlice";
import ui from "./uiSlice";

const PERSIST_KEY = "dashboard_state_v1";

function loadState() {
    try {
        const raw = localStorage.getItem(PERSIST_KEY);
        return raw ? JSON.parse(raw) : undefined;
    } catch {
        return undefined;
    }
}

export const store = configureStore({
    reducer: { tasks, ui },
    preloadedState: loadState()
});

store.subscribe(() => {
    try {
        const state = store.getState();
        localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
    } catch {
        // ignore write errors
    }
});
