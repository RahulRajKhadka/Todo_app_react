import { useEffect, useState } from 'react';
import { taskAPI } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // First, create a test task
    taskAPI.createTask({ id: 'test-1', title: 'Test Task' })
      .then(() => {
        // Then get all tasks
        return taskAPI.getTasks();
      })
      .then(tasks => {
        console.log('Tasks from localStorage:', tasks);
        setTasks(tasks);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="bg-red-500">This is the app div</h1>
      <h2>Tasks:</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;