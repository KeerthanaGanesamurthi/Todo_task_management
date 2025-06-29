import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { 
  getTasks, 
  getSharedTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  shareTask 
} from '../services/taskService';
import { io } from 'socket.io-client';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sharedTasks, setSharedTasks] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', { withCredentials: true });
    setSocket(newSocket);

    newSocket.on('taskUpdated', (updatedTask) => {
      setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    });

    newSocket.on('taskCreated', (newTask) => {
      setTasks(prev => [...prev, newTask]);
    });

    newSocket.on('taskDeleted', (deletedId) => {
      setTasks(prev => prev.filter(task => task.id !== deletedId));
    });

    return () => newSocket.close();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(filter);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchSharedTasks = async () => {
    try {
      const data = await getSharedTasks();
      setSharedTasks(data);
    } catch (error) {
      toast.error('Failed to fetch shared tasks');
    }
  };

  const createNewTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (error) {
      toast.error('Failed to create task');
      throw error;
    }
  };

  const updateExistingTask = async (id, updates) => {
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  };

  const deleteExistingTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      throw error;
    }
  };

  const shareExistingTask = async (taskId, email) => {
    try {
      await shareTask(taskId, email);
      toast.success(`Task shared with ${email}`);
    } catch (error) {
      toast.error('Failed to share task');
      throw error;
    }
  };

  useEffect(() => {
    if (filter) {
      fetchTasks();
    }
  }, [filter]);

  useEffect(() => {
    fetchSharedTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      sharedTasks,
      loading,
      filter,
      setFilter,
      createTask: createNewTask,
      updateTask: updateExistingTask,
      deleteTask: deleteExistingTask,
      shareTask: shareExistingTask,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);