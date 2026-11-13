# Run Replaice locally

Use Node.js 22 or newer and run these commands from this folder:

```bash
npm install
npm run dev
```

Open http://localhost:8080. This runs the website and its API together using
Wrangler. Stop any Python static server on port 8080 first with Control+C;
`python -m http.server` cannot handle `POST /api/assistant/session` and returns
an HTML 501 error page instead of JSON.

Keep your existing `.env` file beside `wrangler.local.toml`. For a new setup,
copy `.env.example` to `.env` and fill in the API keys. Wrangler loads `.env`
automatically. If a `.dev.vars` file exists, Wrangler uses it instead of `.env`,
so keep the credentials in only one of those files. Restart after changing keys.
Never put API keys in frontend JavaScript or commit them to source control.

Click **Ask Raj → Speak now** and allow microphone access. The session endpoint
returns JSON: 200 means the provider tokens were obtained, 503 means keys are
missing, and 502 means a provider failed (for example, rejected credentials).

To verify the endpoint without microphone access:

```bash
curl -i -X POST http://localhost:8080/api/assistant/session \
  -H 'Origin: http://localhost:8080'
```

The agent must accept and output 16 kHz PCM audio for voice playback.
