---
source: https://developers.cloudflare.com/workers/versions-and-deployments/
---

# Versions, Deployments, and Rollbacks

A version captures a Worker's state; a deployment decides which version(s) serve traffic. Also covers Deployment management and Rollbacks pages.

## Signature / Usage

Upload a version without deploying, then deploy it (interactive prompts; set below 100% for a gradual deployment):

```
npx wrangler versions upload
```

```
npx wrangler versions deploy
```

Roll back with `wrangler rollback` (flags: see the commands reference). Dashboard: Worker > **Deployments** > three-dot icon on a version > **Rollback**; promote: **Promote deployment**.

## Notes

- Version: bundled code, static assets, bindings, compatibility settings; unique ID, creator, time, origin; optional message and tag. State of storage resources (KV, R2, Durable Objects, D1) is not tracked.
- Deployment: references one version (100%) or two versions (split during a gradual deployment).
- Default: `wrangler deploy`, Workers Builds, and the Workers Script Upload API create a version and deploy it to 100% in one step. Decouple with `versions upload` + `versions deploy` (or dashboard **Edit code** > down arrow next to **Deploy** > **Save**, then **Promote deployment**). Wrangler before 3.73.0 needs `--x-versions`.
- Route/domain/cron trigger changes: use `wrangler triggers deploy`.
- No new version is created when connected resources change (e.g. changing Worker B does not create a version of Worker A).
- Wrangler lists the 100 most recent versions and deployments (`versions list`, `deployments list`). Dashboard: Worker > **Deployments**.
- Limits: deployments only with the last 100 uploaded versions; first upload must use C3 or `wrangler deploy` (`versions upload` fails first time); service worker syntax unsupported for `versions upload` (use ES modules); versions that create, delete, rename, or transfer a Durable Object class (via `exports` or legacy `migrations`) cannot be uploaded; use `wrangler deploy`.
- Infrastructure as Code (API, SDKs, Terraform) can also create versions and deployments.
- Rollbacks: creates a new deployment with the chosen version at 100% across all routes and domains; works from single-version or split deployments (both versions replaced). Only the 100 most recently published versions; with Wrangler you can also pass the version ID directly.
- Rollback restrictions: resources connected via bindings are not changed. Rollback is not allowed if a Durable Object class lifecycle change occurred between the active and target versions, or if the target binds to an R2 bucket, KV namespace, or queue that no longer exists. Data structure changes can cause errors in prior code.
- `wrangler versions` / `deployments` / `rollback` flags: see [workers-versions.md](../commands/workers-versions.md).

## Related

- [versions-gradual-deployments.md](./versions-gradual-deployments.md)
- [versions-version-urls.md](./versions-version-urls.md)
- [versions-version-overrides.md](./versions-version-overrides.md)
- [versions-version-affinity.md](./versions-version-affinity.md)
- [workers-versions.md](../commands/workers-versions.md)
