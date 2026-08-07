# Remote Caching

## Usage

Shares task cache artifacts across machines and CI systems. When inputs are identical, duplicate work is prevented.

The standard Turborepo cache lives on the local machine only, so developers, teammates, and CI systems each end up re-running the same tasks independently. Remote Caching solves this by sharing cache artifacts through a central location.

```bash
# Step 1: authenticate
turbo login

# For SSO
npx turbo login --sso-team=team-name

# Step 2: link the repository
turbo link

# Step 3: verify it works
rm -rf ./.turbo/cache
turbo run build
```

## Options / Props

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| Vercel Remote Cache (managed) | implementation | — | Free on all plans; usable even without hosting the app on Vercel |
| Self-hosted | implementation | — | Custom implementation on any HTTP server that satisfies the Turborepo API spec |

## Notes

- Artifact signature verification supports HMAC-SHA256:

```json
{
  "remoteCache": {
    "signature": true
  }
}
```

- Set the secret key via the `TURBO_REMOTE_CACHE_SIGNATURE_KEY` environment variable.

## Related

- [Package and Task Graph](./package-and-task-graph.md)
