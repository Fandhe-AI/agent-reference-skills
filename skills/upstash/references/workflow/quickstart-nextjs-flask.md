# Quickstart: Next.js + Flask

Run a Next.js frontend with a Python Flask Workflow API from the `nextjs-flask` example. Example source: `examples/nextjs-flask` in `upstash/workflow-py`.

## Signature / Usage

```bash
git clone https://github.com/upstash/workflow-py.git
cd workflow-py/examples/nextjs-flask

python -m venv venv
source venv/bin/activate

npm install

source .env
npm run dev
```

Next.js runs on `http://localhost:3000` and Flask on `http://localhost:8000`.

Deploy to Vercel:

```bash
vercel
# add QSTASH_TOKEN as an environment variable in the Vercel project
vercel --prod
```

## Environment Variables

Create `.env` (uses `export` lines) with one of:

| Option | `.env` |
|--------|--------|
| Local QStash server (`npx @upstash/qstash-cli dev`; no billing, runs not logged in the Upstash Console) | `export QSTASH_URL="http://127.0.0.1:8080"` and `export QSTASH_TOKEN="<QSTASH_TOKEN>"` |
| Local tunnel (connects to production QStash; logs visible in the Upstash Console) | `export QSTASH_TOKEN="***"` and `export UPSTASH_WORKFLOW_URL="<UPSTASH_WORKFLOW_URL>"` |

## Notes

- Prerequisites: an Upstash QStash API key, Node.js with npm, Python and pip
- QStash needs a publicly accessible URL to run workflows: use the QStash development server or a local tunnel for local development
- Deploy to production with `vercel --prod`; the project does not work in preview deployments because preview requires authentication
- After deployment, call the endpoints using the form on the deployed page; observe logs in the Upstash Console Workflow tab or on vercel.com

## Related

- [quickstart-flask](./quickstart-flask.md)
- [quickstart-nextjs-fastapi](./quickstart-nextjs-fastapi.md)
- [troubleshooting](./troubleshooting.md)
- [security](./security.md)
