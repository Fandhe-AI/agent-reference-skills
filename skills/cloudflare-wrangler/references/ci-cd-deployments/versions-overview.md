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
- Deployment changes take up to a few seconds to reach every location on the network, so locations can use different versions during that time, and a browser's HTML and asset requests can use different versions even when you deploy to 100% of traffic (see `versions-version-skew.md`). A version override can select a version in the deployment, even at 0% of traffic.
- Uploading a version does not add it to a deployment. To test it on your production hostname with a version override, add it to the deployment (it can be at 0% of traffic); alternatively turn on a Version URL.
- In-flight requests: a deployment changes which versions receive new requests; requests already executing can continue running the version that accepted them, and deploying new code does not update code in an invocation that has already started. A successful deployment does not confirm that earlier invocations or their external operations have completed; coordinate in your application before making incompatible data or configuration changes. Existing requests remain subject to the invocation duration rules and `ctx.waitUntil()` limits; the grace period for Workers runtime updates applies when Cloudflare updates the runtime, not when you deploy your code. Durable Objects have separate code update behavior.
- Route/domain/cron trigger changes: use `wrangler triggers deploy`.
- No new version is created when connected resources change (e.g. changing Worker B does not create a version of Worker A).
- Wrangler lists the 100 most recent versions and deployments (`versions list`, `deployments list`). Dashboard: Worker > **Deployments**.
- Limits: deployments only with the last 100 uploaded versions; first upload must use C3 or `wrangler deploy` (`versions upload` fails first time); service worker syntax unsupported for `versions upload` (use ES modules); versions that create, delete, rename, or transfer a Durable Object class (via `exports` or legacy `migrations`) cannot be uploaded; use `wrangler deploy`.
- Infrastructure as Code (API, SDKs, Terraform) can also create versions and deployments.
- Rollbacks: creates a new deployment with the chosen version at 100% for your Worker's routes and domains; works from single-version or split deployments (the other version is removed from the deployment, and version overrides naming the removed version are ignored). The change takes time to reach every location, and pages loaded before the rollback can still request the newer version's assets; check whether the older version includes those files (see `versions-version-skew.md`). Only the 100 most recently published versions; with Wrangler you can also pass the version ID directly.
- Rollback restrictions: resources connected via bindings are not changed. Rollback is not allowed if a Durable Object class lifecycle change occurred between the active and target versions, or if the target binds to an R2 bucket, KV namespace, or queue that no longer exists. Data structure changes can cause errors in prior code.
- `wrangler versions` / `deployments` / `rollback` flags: see [workers-versions.md](../commands/workers-versions.md).
- Source: https://developers.cloudflare.com/workers/versions-and-deployments/ , https://developers.cloudflare.com/workers/versions-and-deployments/deployment-management/ and https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [versions-gradual-deployments.md](./versions-gradual-deployments.md)
- [versions-version-urls.md](./versions-version-urls.md)
- [versions-version-overrides.md](./versions-version-overrides.md)
- [versions-version-affinity.md](./versions-version-affinity.md)
- [versions-version-skew.md](./versions-version-skew.md)
- [workers-versions.md](../commands/workers-versions.md)
