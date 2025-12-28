import React from 'react';
import { Calendar, Edit2, Trash2, Check, Clock } from 'lucide-react';
import { formatDate, isOverdue } from "../utils/helpers.js"

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const overdue = isOverdue(task.dueDate, task.status); 

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 p-4 hover:shadow-md transition-shadow ${
      task.status === 'done' ? 'border-green-200 bg-green-50' : 'border-gray-200'
    } ${overdue ? 'border-l-4 border-l-red-500' : ''}`}>
      
      <div className="flex items-start justify-between gap-3">
       
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            task.status === 'done'
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.status === 'done' && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-800 mb-1 ${
            task.status === 'done' ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-sm text-gray-600 mb-2 ${
              task.status === 'done' ? 'line-through text-gray-400' : ''
            }`}>
              {task.description}
            </p>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-sm ${
              overdue ? 'text-red-600' : task.status === 'done' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {overdue ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
              <span>{formatDate(task.dueDate)}</span>
              {overdue && <span className="font-semibold ml-1">(Overdue)</span>}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-3 flex items-center gap-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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