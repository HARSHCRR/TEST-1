# FIRST-MVP

# Backend

## Fingerprint Proxy

To resolve CORS issues when accessing the Mantra MFS110 fingerprint HTTP service, run the proxy server:

1. Install dependencies (if not already):
   npm install express cors http-proxy-middleware

2. Start the proxy:
   node fingerprint-proxy.js

The proxy will run on http://localhost:8080. Point your frontend fingerprint scan requests to this URL instead of the Mantra service directly.