let tasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the project proposal document',
    dueDate: '2025-07-05T00:00:00Z',
    priority: 'high',
    status: 'pending',
    createdAt: new Date().toISOString(),
    sharedWith: []
  },
  {
    id: '2',
    title: 'Team meeting',
    description: 'Weekly team sync meeting',
    dueDate: '2025-06-30T10:00:00Z',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date().toISOString(),
    sharedWith: ['user2@example.com']
  }
];

export const getTasks = async (filter = 'all') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTasks = [...tasks];
      
      if (filter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        filteredTasks = filteredTasks.filter(task => task.dueDate.split('T')[0] === today);
      } else if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.status === 'completed');
      }
      
      resolve(filteredTasks);
    }, 500);
  });
};

export const getSharedTasks = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks.filter(task => task.sharedWith.length > 0));
    }, 500);
  });
};

export const createTask = async (taskData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = {
        id: Math.random().toString(36).substring(2, 9),
        ...taskData,
        createdAt: new Date().toISOString(),
        sharedWith: []
      };
      tasks.push(newTask);
      resolve(newTask);
    }, 500);
  });
};

export const updateTask = async (id, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        resolve(tasks[index]);
      }
    }, 500);
  });
};

export const deleteTask = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter(task => task.id !== id);
      resolve(true);
    }, 500);
  });
};

export const shareTask = async (taskId, email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        if (!task.sharedWith.includes(email)) {
          task.sharedWith.push(email);
        }
        resolve(true);
      }
    }, 500);
  });
};