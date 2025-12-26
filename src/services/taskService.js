
const DELAY = 500;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const STORAGE_KEY = 'task_tracker_tasks';


const getTasksFromStorage = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};


const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};


export const taskAPI = {
  // Get all tasks
  getTasks: async () => {
    await delay(DELAY);
    return getTasksFromStorage();
  },


  createTask: async (task) => {
    await delay(DELAY);
    const tasks = getTasksFromStorage();
    const newTask = {
      ...task,
      id: task.id,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasksToStorage(tasks);
    return newTask;
  },


  updateTask: async (id, updates) => {
    await delay(DELAY);
    const tasks = getTasksFromStorage();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index] = { ...tasks[index], ...updates };
    saveTasksToStorage(tasks);
    return tasks[index];
  },

 
  deleteTask: async (id) => {
    await delay(DELAY);
    const tasks = getTasksFromStorage();
    const filtered = tasks.filter(t => t.id !== id);
    saveTasksToStorage(filtered);
    return id;
  },

  
  toggleTaskStatus: async (id) => {
    await delay(DELAY);
    const tasks = getTasksFromStorage();
    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    
    task.status = task.status === 'pending' ? 'done' : 'pending';
    saveTasksToStorage(tasks);
    return task;
  }
};
