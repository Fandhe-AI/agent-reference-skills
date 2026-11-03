---
source: https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/
---

# Gradual Deployment with Smoke Test

Upload a new version, split traffic, and target a specific version with a version override.

Upload a new version (not deployed automatically):

```sh
npx wrangler versions upload
```

Create a deployment that splits traffic (interactive prompts for percentages):

```sh
npx wrangler versions deploy
```

Test the split:

```bash
for j in {1..10}
do
    curl -s https://$WORKER_NAME.$SUBDOMAIN.workers.dev
done
```

Smoke test a 0% version before shifting traffic (from the version overrides page):

```sh
curl -s https://example.com -H 'Cloudflare-Workers-Version-Overrides: my-worker-name="dc8dcd28-271b-4367-9840-6c244f84cb40"'
```

Finish by running `npx wrangler versions deploy` again and set the new version to 100%.

## Notes

- `versions upload` creates a version without deploying it; `versions deploy` prompts for percentages. Only two versions can be in one deployment.
- A version override applies only if the version is in the current deployment; `wrangler deployments list` shows it.
- Requests are routed per request by default; use version affinity to pin users to one version.
- With Durable Objects, use `wrangler deploy` to apply a pending migration (Wrangler before 4.131.0 may return error `10211` on `versions upload`).
- See [../references/ci-cd-deployments/README.md](../references/ci-cd-deployments/README.md).
