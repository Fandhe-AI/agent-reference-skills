---
source: https://docs.cloud.google.com/appengine/docs/standard/lifecycle/support-schedule
---

# Runtime support schedule (standard environment)

Key dates for App Engine standard environment language runtimes. Availability and dates might be delayed; revisit the official page. Tables below are split into runtimes not yet past end of support and runtimes already past end of support (relative to the 2026-11-15 retrieval date); do not use the latter for new deployments.

## Signature / Usage

```yaml
runtime: python315
```

The runtime ID in the tables below goes in the `runtime` element of `app.yaml`. `python315` is Preview.

## Options / Props

Columns: Runtime ID / Environment / End of support / Deprecated / Decommissioned.

### Not yet past end of support

| Runtime | Runtime ID | Environment | End of support | Deprecated |
|---|---|---|---|---|
| Go 1.27 | `go127` | Ubuntu 24.04 | Aug/Sept 2027 | Aug/Sept 2028 |
| Go 1.26 | `go126` | Ubuntu 24.04 | Feb/March 2027 | Feb/March 2028 |
| Go 1.25 | `go125` | Ubuntu 22.04 | 2027-03-02 | 2028-03-02 |
| Go 1.24 | `go124` | Ubuntu 22.04 | 2027-03-02 | 2028-03-02 |
| Java 25 | `java25` | Ubuntu 24.04 | Oct 2031 | — |
| Java 21 | `java21` | Ubuntu 22.04 | Sept 2031 | — |
| Java 17 | `java17` | Ubuntu 22.04 | Oct 2027 | — |
| Node.js 26 (Preview) | `nodejs26` | Ubuntu 24.04 | — | — |
| Node.js 24 | `nodejs24` | Ubuntu 24.04 | 2028-04-30 | 2029-04-30 |
| Node.js 22 | `nodejs22` | Ubuntu 22.04 | 2027-04-30 | 2028-04-30 |
| Python 3.15 (Preview) | `python315` | Ubuntu 24.04 | — | — |
| Python 3.14 | `python314` | Ubuntu 24.04 | 2030-10-10 | 2031-10-10 |
| Python 3.13 | `python313` | Ubuntu 22.04 | 2029-10-10 | 2030-10-10 |
| Python 3.12 | `python312` | Ubuntu 22.04 | 2028-10-02 | 2029-10-02 |
| Python 3.11 | `python311` | Ubuntu 22.04 | 2027-10-24 | 2028-10-24 |
| PHP 8.5 | `php85` | Ubuntu 24.04 | 2029-12-31 | 2030-12-31 |
| PHP 8.4 | `php84` | Ubuntu 22.04 | 2028-12-31 | 2029-12-31 |
| PHP 8.3 | `php83` | Ubuntu 22.04 | 2027-12-31 | 2028-12-31 |
| PHP 8.2 | `php82` | Ubuntu 22.04 | 2026-12-31 | 2027-12-31 |
| Ruby 4.0 | `ruby40` | Ubuntu 24.04 | 2029-03-31 | 2030-03-31 |
| Ruby 3.4 | `ruby34` | Ubuntu 22.04 | 2028-03-31 | 2029-03-31 |
| Ruby 3.3 | `ruby33` | Ubuntu 22.04 | 2027-03-31 | 2028-03-31 |

### Past end of support (as of 2026-11-15)

Not recommended; you can no longer create or update apps on these runtimes. In certain cases Google may permit an organization to re-enable deployments by organization policy, but only until the runtime's Deprecated date (see [runtime-lifecycle.md](./runtime-lifecycle.md)). Decommissioned column is empty unless noted.

| Runtime | Runtime ID | Environment | End of support | Deprecated | Decommissioned |
|---|---|---|---|---|---|
| Go 1.23 | `go123` | Ubuntu 22.04 | 2026-08-21 | 2027-08-21 | |
| Go 1.22 | `go122` | Ubuntu 22.04 | 2026-07-28 | 2027-07-28 | |
| Go 1.21 | `go121` | Ubuntu 22.04 | 2026-03-03 | 2027-03-03 | |
| Go 1.20 | `go120` | Ubuntu 22.04 | 2024-11-01 | 2025-11-01 | |
| Go 1.19 | `go119` | Ubuntu 22.04 | 2024-04-30 | 2025-04-30 | |
| Go 1.18 | `go118` | Ubuntu 22.04 | 2024-01-30 | 2025-01-31 | |
| Go 1.16 to 1.12 | `go116`, `go115`, `go114`, `go113`, `go112` | Ubuntu 18.04 | 2024-01-30 | 2025-01-31 | |
| Go 1.11 | `go111` | Ubuntu 18.04 (first-generation) | 2024-01-30 | 2026-01-31 | 2027-01-31 |
| Java 11 | `java11` | Ubuntu 18.04 | 2024-10-31 | 2025-10-31 | |
| Java 8 | `java8` | first-generation | 2024-01-31 | 2026-01-31 | 2027-01-31 |
| Node.js 20 | `nodejs20` | Ubuntu 22.04 | 2026-04-30 | 2027-04-30 | |
| Node.js 18 | `nodejs18` | Ubuntu 22.04 | 2025-04-30 | 2026-04-30 | |
| Node.js 16, 14, 12, 10 | `nodejs16`, `nodejs14`, `nodejs12`, `nodejs10` | Ubuntu 18.04 | 2024-01-30 | 2025-01-31 | |
| Node.js 8 | `nodejs8` | Ubuntu 18.04 | 2018-06-27 | 2019-10-01 | |
| Python 3.10 | `python310` | Ubuntu 22.04 | 2026-10-04 | 2027-10-01 | |
| Python 3.9 | `python39` | Ubuntu 18.04 | 2025-10-05 | 2026-10-01 | |
| Python 3.8 | `python38` | Ubuntu 18.04 | 2024-10-14 | 2025-10-01 | |
| Python 3.7 | `python37` | Ubuntu 18.04 | 2024-01-30 | 2025-01-31 | |
| Python 2.7 | `python27` | first-generation | 2024-01-31 | 2026-01-31 | 2027-01-31 |
| PHP 8.1 | `php81` | Ubuntu 18.04 | 2025-12-31 | 2026-12-31 | |
| PHP 7.4, 7.3, 7.2 | `php74`, `php73`, `php72` | Ubuntu 18.04 | 2024-01-30 | 2025-01-31 | |
| PHP 5.5 | `php55` | first-generation | 2024-01-30 | 2026-01-31 | 2027-01-31 |
| Ruby 3.2 | `ruby32` | Ubuntu 22.04 | 2026-03-31 | 2027-03-31 | |
| Ruby 3.0 | `ruby30` | Ubuntu 18.04 | 2024-03-31 | 2025-03-31 | |
| Ruby 2.7, 2.6, 2.5 | `ruby27`, `ruby26`, `ruby25` | Ubuntu 18.04 | 2024-01-30 | 2025-01-31 | |

## Notes

- Go's release policy: each major Go release is supported until there are two newer major releases; key dates might not be available until newer versions are public.
- First-generation runtimes (`go111`, `java8`, `python27`, `php55`) have decommission dates of 2027-01-31 and may be disabled afterwards; migrate with the second-generation migration overview.
- Snippet taken from https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml (`runtime: python315`); the schedule page itself has no code block.
- Rows are grouped and merged (runtimes with identical dates) by the editor from the source tables; "past end of support" is computed against the 2026-11-15 retrieval date, not stated in the source.
- Source: https://docs.cloud.google.com/appengine/docs/standard/lifecycle/support-schedule (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime-lifecycle.md](./runtime-lifecycle.md)
- [flexible-support-schedule.md](./flexible-support-schedule.md)
- [standard-app-yaml.md](./standard-app-yaml.md)
