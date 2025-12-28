import React, { useState } from 'react';
import TaskItem from "./Componenets/TaskItems.jsx";
import TaskForm from "./Componenets/TaskForm.jsx"
import EmptyState from "./Componenets/EmptyState.jsx"


function App() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Buy groceries', description: 'Milk, Eggs, Bread', dueDate: '2024-12-25', status: 'pending' },
    { id: '2', title: 'Finish project', dueDate: '2023-01-01', status: 'pending' },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all'); 
  const [search, setSearch] = useState(''); // 

  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
      status: 'pending'
    };
    setTasks([...tasks, taskWithId]);
    setShowForm(false);
  };

  const handleEdit = (task) => {
    console.log('Edit task:', task);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Filter tasks based on filter and search
  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Tracker</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />
          
          {/*  Filter Buttons */}
          <div className="flex gap-2">
            {['all', 'pending', 'done'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg ${
                  filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Task Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <TaskForm 
              onSubmit={handleAddTask} 
              onClose={() => setShowForm(false)} 
            />
          </div>
        )}

        {/* EmptyState or Task List */}
        {filteredTasks.length === 0 ? (
          <EmptyState searchQuery={search} filter={filter} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}


      </div>
    </div>
  );
}

export default App;