import { sortTasks,filterTasks,dueDate,formatDate } from "./helpers";

const testTasks = [
  { id: 1, title: 'Banana', dueDate: '2024-12-31', status: 'pending' },
  { id: 2, title: 'Apple', dueDate: '2024-01-01', status: 'done' },
  { id: 3, title: 'Orange', dueDate: null, status: 'pending' }
];

console.log('TESTING HELPERS:');
console.log('Sort by name A-Z:', sortTasks(testTasks, 'name-asc').map(t => t.title));
console.log('Filter pending:', filterTasks(testTasks, 'pending', ''));
console.log('Format date:', formatDate('2024-12-25'));
console.log('Is overdue:', dueDate('2023-01-01', 'pending'));