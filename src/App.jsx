import React, { useState, useMemo } from "react";
import { Plus, Loader, RefreshCw } from "lucide-react";
import TaskForm from "./Componenets/TaskForm.jsx";
import TaskList from "./Componenets/TaskList.jsx";
import FilterBar from "./Componenets/FilterBar.jsx";
import { useTasks } from "./Hooks/useTasks.js";
import { useDebounce } from "./Hooks/useDbounce.js";
import { filterTasks, sortTasks } from "./utils/helpers.js";

function App() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks,
  } = useTasks();

  // 1. DECLARE ALL STATES FIRST
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-asc");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const isLoading = isSaving || isDeleting || isToggling || loading;

  // 2. THEN DECLARE FUNCTIONS
  const handleModalClose = () => {
    if (!isSaving) {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleFormSubmit = async (taskData) => {
    setIsSaving(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Error saving task:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await deleteTask(id);
      } catch (err) {
        console.error("Error deleting task:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    setIsToggling(true);
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const newStatus = task.status === "pending" ? "done" : "pending";
      await updateTask(id, { status: newStatus });
    } catch (err) {
      console.error("Error toggling status:", err);
    } finally {
      setIsToggling(false);
    }
  };

  // 3. THEN CALCULATIONS
  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      done: tasks.filter((t) => t.status === "done").length,
    }),
    [tasks]
  );

  const displayedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter, debouncedSearch);
    return sortTasks(filtered, sortBy);
  }, [tasks, filter, debouncedSearch, sortBy]);

  // 4. RENDER LOGIC
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 text-lg">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refreshTasks}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-2xl">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-700 font-medium">
              {isSaving && "Saving task..."}
              {isDeleting && "Deleting task..."}
              {isToggling && "Updating status..."}
              {!isSaving && !isDeleting && !isToggling && "Please wait..."}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Tracker</h1>
              <p className="text-gray-600 mt-1">
                Manage your tasks efficiently
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isLoading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Processing...</span>
                </div>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* FilterBar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          taskCounts={taskCounts}
          isLoading={isLoading}
        />

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
          editingTask={editingTask}
          isSaving={isSaving}
        />

        {/* TaskList Component */}
        <TaskList
          tasks={displayedTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          searchQuery={debouncedSearch}
          filter={filter}
          isLoading={isLoading}
        />

        {/* Tasks Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
            <p className="text-3xl font-bold text-gray-800">{taskCounts.all}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-3xl font-bold text-gray-800">
              {taskCounts.pending}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-gray-800">
              {taskCounts.done}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
