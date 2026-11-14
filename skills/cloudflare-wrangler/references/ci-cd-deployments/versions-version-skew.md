---
source: https://developers.cloudflare.com/workers/versions-and-deployments/version-skew/
---

# Version Skew and Static Assets

Version skew occurs when related requests use incompatible application versions, for example HTML from one Worker version and a JavaScript file from another version that does not contain it.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/ (the version override header is one of the strategies below). A query parameter alone does not select a Worker version; the incoming request must set this header:

```sh
curl -s https://example.com -H 'Cloudflare-Workers-Version-Overrides: my-worker-name="dc8dcd28-271b-4367-9840-6c244f84cb40"'
```

## Options / Props

Strategies for related requests (choose based on how long pages can remain open and which versions can serve their requests):

| Strategy | What it does and where it applies |
| --- | --- |
| Version affinity | Sends requests with the same key to the same version while the deployment configuration stays the same. Changing traffic percentages or removing a version can change where requests go. |
| Version overrides | Selects a version in the deployment at the location handling the request, even at 0% of traffic. If that deployment does not include the version, Cloudflare uses the configured traffic percentages. |
| Include assets needed by older pages | Allows a newer version to serve files from earlier releases. It does not add new files to earlier versions. |

## Notes

- A Worker version includes code, configuration and static assets; its asset manifest maps request paths to uploaded files. Each asset request uses the files from the selected version, whether Cloudflare serves assets directly or your Worker uses `env.ASSETS.fetch()`. A deployment sets which versions receive requests and their traffic percentages.
- Deployment propagation: deployment changes take up to a few seconds to reach every location, and until then locations can use different deployment configurations. Uploading assets, creating a version and deploying it are separate steps; uploading a file does not add it to other versions' manifests, and reusing a previously uploaded file does not add it to every version either. A browser makes separate requests for HTML, scripts, stylesheets, images and imported JavaScript chunks, so serving HTML from one version does not keep later requests on that version, including when you deploy to 100% of traffic.
- Causes: (1) deployment propagation (B's HTML can be served by a location using B while the asset request reaches a location still using A, whose manifest lacks the path; the response then follows A's asset routing and fallback configuration, for example `404`); (2) traffic split during a gradual deployment (requests from the same browser can use different versions; changing percentages can move users while their page remains open); (3) older pages and rollbacks (a page loaded from version A can request a file that B lacks; rollbacks can cause the reverse).
- Missing assets: with default asset-first routing, a missing asset goes to the selected version's `fetch()` handler if you have a Worker script, and the handler decides the response (no automatic `404`). If the handler calls `env.ASSETS.fetch(request)` it still uses that version's assets and `not_found_handling` setting and does not search other versions. Without a Worker script the default response is `404`. Single-page application routing can serve `/index.html` for navigation requests without invoking your Worker.
- When keeping assets across releases, use content-hashed filenames and include every file the page needs (imported chunks, stylesheets, fonts). Keeping old files in a new release helps older pages, but new pages can still request new files from an earlier version, which must include them or the request must select a version that has them. For example, first deploy the existing HTML with both releases' asset files, then change the HTML in a later deployment while keeping those files. Waiting a fixed time or testing one location does not prove that every location has the change.
- If you include a version ID in asset URLs, include it in every script, stylesheet and other asset URL the page loads; a script's query string is not automatically copied to the URLs it loads.
- Source: https://developers.cloudflare.com/workers/versions-and-deployments/version-skew/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)
- Related Workers behavior (routing, `not_found_handling`) belongs to cloudflare-workers.

## Related

- [versions-overview.md](./versions-overview.md)
- [versions-gradual-deployments.md](./versions-gradual-deployments.md)
- [versions-version-affinity.md](./versions-version-affinity.md)
- [versions-version-overrides.md](./versions-version-overrides.md)
