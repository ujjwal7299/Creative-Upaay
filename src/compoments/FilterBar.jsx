import { useDispatch, useSelector } from "react-redux";
import { setCategory, setPriority, setQuery, clearFilters } from "../redux/uiSlice";

export default function FilterBar() {
    const dispatch = useDispatch();
    const filters = useSelector((s) => s.ui.filters);

    return (
        <div className="py-5">
            <div className="bg-white rounded-xl2 shadow-card p-4 flex flex-col md:flex-row gap-3 md:items-center">
                <input
                    className="border rounded px-3 py-2 flex-1"
                    placeholder="Search by name/description…"
                    value={filters.query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                />
                <select
                    className="border rounded px-3 py-2"
                    value={filters.priority}
                    onChange={(e) => dispatch(setPriority(e.target.value || ""))}
                >
                    <option value="">All Priorities</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <input
                    className="border rounded px-3 py-2"
                    placeholder="Category"
                    value={filters.category}
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                />
                <button
                    className="px-3 py-2 rounded border text-gray-700 hover:bg-gray-50"
                    onClick={() => dispatch(clearFilters())}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
