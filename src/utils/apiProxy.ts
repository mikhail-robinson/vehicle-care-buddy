
// This file is for development proxy configuration
// In a production environment, you would configure your server to handle API routing
// Example for development proxy setup with Vite

export const configureProxy = {
  '/api': {
    target: 'http://localhost:3000', // Your Rails API server URL
    changeOrigin: true,
    secure: false,
  },
};
