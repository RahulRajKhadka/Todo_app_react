import React from "react";
import { Search } from "lucide-react";

const FilterBar = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  taskCounts,
  isLoading = false,
}) => {
  const filterOptions = [
    { value: "all", label: "All", count: taskCounts.all },
    { value: "pending", label: "Pending", count: taskCounts.pending },
    { value: "done", label: "Done", count: taskCounts.done },
  ];

  const sortOptions = [
    { value: "date-asc", label: "Due Date (Earliest)" },
    { value: "date-desc", label: "Due Date (Latest)" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === option.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
