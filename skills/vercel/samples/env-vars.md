# Environment Variable Management

Manage environment variables across Development, Preview, and Production environments using the CLI and dashboard.

```bash
# Pull Development env vars into .env (for local use)
vercel env pull

# Add a variable interactively (prompts for value, environment, and scope)
vercel env add API_KEY

# Add a variable non-interactively (pipe the value)
echo "my-secret-value" | vercel env add API_KEY production

# List all variables (shows name, environments, and scope)
vercel env ls

# Remove a variable from a specific environment
vercel env rm API_KEY production
```

Reading variables in code (Node.js example):

```js
// Available in Vercel Functions and at build time
const apiKey = process.env.API_KEY;
const dbUrl  = process.env.DATABASE_URL;
```

Separating Preview and Production values for the same key:

```bash
# Add a production value
echo "prod-db-url" | vercel env add DATABASE_URL production

# Add a preview value (applies to all non-production branches)
echo "preview-db-url" | vercel env add DATABASE_URL preview

# Add a branch-specific preview value (overrides the generic preview value)
echo "staging-db-url" | vercel env add DATABASE_URL preview --git-branch staging
```

## Notes

- Changes to environment variables only take effect on **new** deployments; redeploy to apply updates.
- Each environment (Production / Preview / Development) can hold a different value for the same key.
- Branch-specific Preview variables override the generic Preview value for that branch only.
- Variables are encrypted at rest; total size limit is 64 KB per deployment (Edge runtime: 5 KB per variable).
