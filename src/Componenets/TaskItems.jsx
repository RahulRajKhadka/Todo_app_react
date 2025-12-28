import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatDate,dueDate } from '../utils/helpers';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const overdue =dueDate(task.dueDate, task.status);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          {task.dueDate && (
            <div className={`text-sm mt-2 ${overdue ? 'text-red-600' : 'text-gray-500'}`}>
              Due: {formatDate(task.dueDate)}
              {overdue && ' (Overdue)'}
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => onEdit && onEdit(task)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete && onDelete(task.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-3">
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
          task.status === 'done' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.status === 'done' ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;