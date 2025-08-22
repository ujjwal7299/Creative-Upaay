import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        filters: {
            query: "",
            priority: "",
            category: ""
        }
    },
    reducers: {
        setQuery: (state, { payload }) => { state.filters.query = payload; },
        setPriority: (state, { payload }) => { state.filters.priority = payload; },
        setCategory: (state, { payload }) => { state.filters.category = payload; },
        clearFilters: (state) => { state.filters = { query: "", priority: "", category: "" }; }
    }
});

export const { setQuery, setPriority, setCategory, clearFilters } = uiSlice.actions;
export default uiSlice.reducer;
