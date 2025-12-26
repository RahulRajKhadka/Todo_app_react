import { useState, useEffect, useCallback } from "react";
import { taskAPI } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskAPI.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError("Failed to create task");
      throw err;
    }
  }, []);

  // Update task
  const updateTask = useCallback(async (id, updates) => {
    try {
      const updatedTask = await taskAPI.updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      return updatedTask;
    } catch (err) {
      setError("Failed to update task");
      throw err;
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
      throw err;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: loadTasks,
  };
};
