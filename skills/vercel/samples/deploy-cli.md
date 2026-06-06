# Deploy with Vercel CLI

Deploy a project to Vercel preview and production using the CLI.

```bash
# Install the CLI (local or global)
npm i vercel
# or globally
npm i -g vercel

# Authenticate
vercel login

# Deploy to preview (from project root)
vercel

# Deploy to production
vercel --prod
```

To link an existing project and pull environment variables for local development:

```bash
# Link project and pull dev env vars into .env
vercel link
vercel env pull
```

## Notes

- `vercel` (no flags) creates a preview deployment; `vercel --prod` promotes to production.
- The CLI auto-detects your framework and configures build settings on first run.
- `vercel env pull` writes a `.env` file with Development environment variables; `vercel dev` pulls them automatically into memory without a file.
- Run `vercel --help` for the full command reference.
