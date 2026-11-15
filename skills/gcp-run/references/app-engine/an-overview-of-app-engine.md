---
source: https://docs.cloud.google.com/appengine/docs/an-overview-of-app-engine
---

# An Overview of App Engine

App Engine is a fully managed serverless platform for hosting web applications at scale. An app is one application resource containing services, which contain versions, which run on instances. Google recommends Cloud Run as the newer alternative, and for new Google Cloud users as the preferred choice.

## Signature / Usage

### Resource hierarchy

- Application (one per project, region fixed at creation) > Service (at least the `default` service; each can use a different runtime and performance settings) > Version (each deploy to a service creates one) > Instance (versions run on one or more instances).
- Every service and every version must have a unique name; they are addressed by URL.

### Version URL

```text
https://VERSION_ID-dot-default-dot-PROJECT_ID.REGION_ID.r.appspot.com
```

## Options / Props

| Concept | Behavior |
|---|---|
| Services | Factor an app into logical components (microservices), e.g. mobile API requests, internal administration, backend processing. Each service consists of app source plus App Engine configuration files; each deploy creates another version. |
| Versions | Allow quick switching for rollbacks and testing. Route all traffic to one version by migrating traffic, or split it across versions. |
| Instances | By default App Engine scales instances to match load (up for consistent performance, down to reduce idle cost). |
| Flexible instances | Backed by Compute Engine resources; disk, CPU and memory count toward the project's Compute Engine API quotas. |
| Region ID | `REGION_ID.r` is included in App Engine URLs for apps created after February 2020; optional for earlier apps. The code is Google-assigned and does not correspond to a country or province. |
| Limits | Standard and flexible versions in the same app count toward the same services and versions limits (see [standard-quotas.md](./standard-quotas.md)). |
| Logging | Apps write their own log messages to `stdout` and `stderr`. |

## Notes

- Snippet taken from https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml (the version URL form with `-dot-`); the overview page itself has no code block.
- Cloud Run (`run/docs/overview/what-is-cloud-run`) is the recommended alternative for new projects; see the migration pages in the `app-engine-migration` category.
- Cloud Run and App Engine are Google Cloud's serverless platforms, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside a container.
- Source: https://docs.cloud.google.com/appengine/docs/an-overview-of-app-engine (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [the-appengine-environments.md](./the-appengine-environments.md)
- [standard-app-yaml.md](./standard-app-yaml.md)
- [standard-quotas.md](./standard-quotas.md)
