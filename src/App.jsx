import Layout from './compoments/Layout.jsx';

import FilterBar from './compoments/FilterBar.jsx';
import Board from './compoments/Board.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      {/*  Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-900">Mobile App</h1>
          <div className="text-sm text-gray-500">Figma Replica • Tasks</div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6">
        <FilterBar />
      </div>

      {/* Board */}
      <main className="max-w-7xl mx-auto px-6 pb-10">
        <Board />
      </main>
    </div>
  );
}
