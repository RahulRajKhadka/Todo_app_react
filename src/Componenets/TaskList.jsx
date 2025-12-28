import React from 'react';
import TaskItem from "./TaskItems.jsx"
import EmptyState from './EmptyState.jsx';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus, searchQuery, filter }) => {
  if (tasks.length === 0) {
    return <EmptyState searchQuery={searchQuery} filter={filter} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;