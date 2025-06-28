const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8081; // Changed to 8081 to avoid conflict with fingerprint service

// Allow all origins, methods, and headers
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow all headers
  credentials: true // Allow credentials
}));

// Proxy all requests to the fingerprint service
app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:8080', // Your fingerprint service
    changeOrigin: true,
    // No path rewriting needed - proxy everything
  })
);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fingerprint proxy running on http://0.0.0.0:${PORT}`);
  console.log(`Proxying all requests to http://localhost:8080`);
  console.log(`Accessible from any IP address and port`);
}); 