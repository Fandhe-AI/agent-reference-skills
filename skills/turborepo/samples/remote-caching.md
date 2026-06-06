# Remote Caching

Share build cache artifacts across team members and CI using Vercel Remote Cache.

```bash
# Step 1: authenticate
turbo login

# Step 2: link the repository to your Vercel account
turbo link

# Step 3: verify (clear local cache then rebuild — should hit remote)
rm -rf ./.turbo/cache
turbo run build
```

For CI (GitHub Actions example):

```yaml
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}
```

Enable HMAC-SHA256 artifact signature verification in `turbo.json`:

```json
{
  "remoteCache": {
    "signature": true
  }
}
```

Set the signing key via environment variable:

```bash
TURBO_REMOTE_CACHE_SIGNATURE_KEY=<secret>
```

## Notes

- Vercel Remote Cache is free on all plans; the repository does not need to be hosted on Vercel
- `TURBO_TOKEN` is a scoped access token created in Vercel project settings
- `TURBO_TEAM` is the Vercel team slug (visible in the Vercel dashboard URL)
- Self-hosting is supported via any HTTP server that implements the Turborepo Remote Cache API
