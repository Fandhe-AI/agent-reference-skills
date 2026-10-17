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

To deploy a single static file (uploads only that file, using static settings):

```bash
vercel index.html

# Preview the deployment without uploading
vercel index.html --dry
```

## Notes

- `vercel` (no flags) creates a preview deployment; `vercel --prod` promotes to production.
- The CLI auto-detects your framework and configures build settings on first run.
- `vercel env pull` writes a `.env` file with Development environment variables; `vercel dev` pulls them automatically into memory without a file.
- Single-file deployments (`vercel index.html`, `vercel deploy README.md`) ignore the linked project's framework and build configuration; authenticated deployments accept any extension, while `--temporary` (no login) requires `.html`.
- Fast static deployments skip the build step automatically for HTML / Markdown-only deployments of up to 10 files and 5 MB total.
- Run `vercel --help` for the full command reference.
