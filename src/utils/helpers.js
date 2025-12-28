import { v4 as uuidv4 } from 'uuid';

export const generateId = () => uuidv4();

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// Check if task is overdue
export const dueDate = (dueDate, status) => {
  if (status === 'done' || !dueDate) return false;
  return new Date(dueDate) < new Date();
};

// Sort tasks
export const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks];
  
  switch (sortBy) {
    case 'date-asc':
      return sorted.sort((a, b) => 
        new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31')
      );
    case 'date-desc':
      return sorted.sort((a, b) => 
        new Date(b.dueDate || '0000-01-01') - new Date(a.dueDate || '0000-01-01')
      );
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
};

// Filter tasks
export const filterTasks = (tasks, filter, searchQuery) => {

  let filtered = tasks;
  
  if (filter !== 'all') {
    filtered = filtered.filter(task => task.status === filter);
  }
  
 
  if (searchQuery.trim()) {
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  
  return filtered;
};