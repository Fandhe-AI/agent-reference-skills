---
source: https://developers.cloudflare.com/pages/platform/changelog/
---

# Changelog

History of notable Cloudflare Pages changes from 2022-06 to 2025-04.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/configuration/preview-deployments/ (2022-12-01: aliased deployments can be deleted; the API needs `force=true`):

```sh
npx wrangler pages deployment delete <DEPLOYMENT_ID> --project-name <PROJECT_NAME>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| 2025-04-18 | notice | — | Node.js 18, the V2 build system default, ends LTS on April 30, 2025; Pages did not change the default and recommends pinning a Node.js version (`NODE_VERSION` variable or `.node-version` file). |
| 2025-02-26 | change | — | Build system supports pnpm 10. |
| 2024-12-19 | notice | — | Cloudflare GitHub App requests Repository Administration (read/write) and Contents (read/write) permissions for upcoming template onboarding; declining keeps current behavior. |
| 2024-10-24 | change | — | Bun updated from 1.0.1 to 1.1.33 in the V2 build system. |
| 2023-09-13 | change | — | Support for D1's new storage subsystem (Wrangler v3.5.0 and up); clearer build-time-limit and other error messages. |
| 2023-08-23 | change | — | Commit messages up to 384 characters before trimming. |
| 2023-08-01 | change | — | Newer TLDs such as `.party` and `.music` supported. |
| 2023-07-11 | change | — | V2 build system is the default for all new projects. |
| 2023-07-10 | change | — | Faster project creation. |
| 2023-05-19 | change | — | Out-of-memory builds return a proper error message. |
| 2023-05-17 | change | — | V2 build system open beta. |
| 2023-05-16 | change | — | Smart Placement can be enabled for Pages. |
| 2023-03-23 | change | — | Uploaded files visible for Git projects. |
| 2023-03-20 | change | — | Notifications: deployment started, succeeded, failed. |
| 2023-02-14 | change | — | Analytics Engine available in Functions. |
| 2023-01-05 | change | — | Queues producer available in Functions. |
| 2022-12-01 | change | — | Aliased deployments can be deleted. |
| 2022-11-17 | change | — | Functions GA with metrics, billing, Unbound usage model, secrets and tailing (`wrangler pages deployment tail`). |
| 2022-11-15 | change | — | Service bindings available in Functions. |
| 2022-09-12 | change | — | Custom domain limits raised from 10: Free 100, Pro 250, Business and Enterprise 500. |
| 2022-09-08 | change | — | `_routes.json` support. |
| 2022-08-25 | change | — | Build log retention increased from 2 weeks to 1 year. |
| 2022-08-08 | change | — | R2 and D1 bindings supported. |
| 2022-07-05 | change | — | `.dev.vars` supported in `wrangler pages` (Wrangler v2.0.16 or higher). |
| 2022-06-13 | change | — | Delta uploads (Wrangler v2.0.11 or higher). The entry names the since-removed `wrangler pages publish`; current command is `wrangler pages deploy`. |
| 2022-06-08 | change | — | Branch alias added to pull request comments. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- The changelog ends at 2025-04-18 in the fetched page. Later changes, such as the v3 build system and deprecation dates, are on the build image page.
- Entries are historical: Wrangler version numbers and the V2/V1 build image statements refer to their time; see the build image page for current defaults.

## Related

- [Build image](../configuration/build-image.md)
- [Limits](./limits.md)
- [Known issues](./known-issues.md)
