export const login = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '123',
        name: 'Demo User',
        email: 'demo@example.com',
        picture: 'https://i.pravatar.cc/150?img=3',
        provider: 'mock'
      });
    }, 500);
  });
};

export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 200);
  });
};