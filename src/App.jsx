import React, { useState, useMemo } from 'react';
import { Plus, Loader } from 'lucide-react';
import TaskForm from './Componenets/TaskForm.jsx';
import TaskList from './Componenets/TaskList.jsx'
import FilterBar from './Componenets/FilterBar.jsx';
import { useTasks } from "./Hooks/useTasks.js"
import { useDebounce } from './Hooks/useDbounce.js';
import { filterTasks, sortTasks } from './utils/helpers.js';

function App() {
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    refreshTasks 
  } = useTasks();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-asc');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      done: tasks.filter(t => t.status === 'done').length
    };
  }, [tasks]);

  const displayedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter, debouncedSearch);
    return sortTasks(filtered, sortBy);
  }, [tasks, filter, debouncedSearch, sortBy]);

  const handleFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
    } catch (err) {
      console.error('Error saving task:', err);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (err) {
        alert('Failed to delete task.', err);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;
      const newStatus = task.status === 'pending' ? 'done' : 'pending';
      await updateTask(id, { status: newStatus });
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={refreshTasks}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Tracker</h1>
              <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          taskCounts={taskCounts}
        />

        <TaskForm
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
          editingTask={editingTask}
        />

        <TaskList
          tasks={displayedTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          searchQuery={debouncedSearch}
          filter={filter}
        />
      </main>
    </div>
  );
}

export default App;
