# EC2 deployment

From the extracted project directory, run:

```sh
node scripts/build-discovery.mjs
node scripts/build-worker.mjs
```

The ZIP includes the browser bundles, so these two commands need Node and no package installation. If you change the assistant source, run `npm ci` and `npm run build:assistant` before rebuilding the Worker.

Back up the running release first. On the current EC2 deployment, transfer the updated project files into the existing project directory and keep the server-side `.env` and `server-ec2.mjs` there. Build from that directory before restarting the existing PM2 process. The Node adapter loads the Worker bundle at startup.

```sh
pm2 restart replaice-website
curl -fsSI http://127.0.0.1:8787/
curl -fsSI http://127.0.0.1:8787/platforms/biltflow/
curl -fsSI https://replaice.ai/platforms/biltflow/
curl -fsSI https://replaice.ai/contact/
```

With the existing Nginx proxy to port 8787, the release needs no proxy or DNS change. Verify Ask Raj and Request a demo in the browser using your existing server-side integration configuration.
