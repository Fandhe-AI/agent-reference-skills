---
source: https://docs.cloud.google.com/appengine/docs/flexible/lifecycle/support-schedule
---

# Runtime support schedule (flexible environment)

Key dates for App Engine flexible environment language runtimes. Availability and dates might be delayed. Tables below are split into runtimes not yet past end of support and runtimes already past end of support (relative to the 2026-11-15 retrieval date); do not use the latter for new deployments.

## Signature / Usage

```yaml
runtime_config:
  operating_system: "ubuntu24"
  runtime_version: "3.15"
```

Flexible runtimes are selected by runtime version (the Runtime Version column), for example through `runtime_config` for Python. `3.15` is Preview.

## Options / Props

### Not yet past end of support

| Runtime | Runtime Version | Environment | End of support | Deprecated |
|---|---|---|---|---|
| Go 1.27 | `1.27` | Ubuntu 24.04 | Aug/Sept 2027 | Aug/Sept 2028 |
| Go 1.26 | `1.26` | Ubuntu 24.04 | Feb/March 2027 | Feb/March 2028 |
| Go 1.25 | `1.25` | Ubuntu 22.04 | 2027-03-02 | 2028-03-02 |
| Go 1.24 | `1.24` | Ubuntu 22.04 | 2027-03-02 | 2028-03-02 |
| Java 25 | `25` | Ubuntu 24.04 | Oct 2031 | — |
| Java 21 | `21` | Ubuntu 22.04 | Sept 2031 | — |
| Java 17 | `17` | Ubuntu 22.04 | Oct 2027 | — |
| Node.js 26 (Preview) | `26` | Ubuntu 24.04 | — | — |
| Node.js 24 | `24` | Ubuntu 24.04 | 2028-04-30 | 2029-04-30 |
| Node.js 22 | `22` | Ubuntu 22.04 | 2027-04-30 | 2028-04-30 |
| Python 3.15 (Preview) | `3.15` | Ubuntu 24.04 | — | — |
| Python 3.14 | `3.14` | Ubuntu 24.04 | 2030-10-10 | 2031-10-10 |
| Python 3.13 | `3.13` | Ubuntu 22.04 | 2029-10-10 | 2030-10-10 |
| Python 3.12 | `3.12` | Ubuntu 22.04 | 2028-10-02 | 2029-10-02 |
| Python 3.11 | `3.11` | Ubuntu 22.04 | 2027-10-24 | 2028-10-24 |
| PHP 8.5 | `8.5` | Ubuntu 24.04 | 2029-12-31 | 2030-12-31 |
| PHP 8.4 | `8.4` | Ubuntu 22.04 | 2028-12-31 | 2029-12-31 |
| PHP 8.3 | `8.3` | Ubuntu 22.04 | 2027-12-31 | 2028-12-31 |
| PHP 8.2 | `8.2` | Ubuntu 22.04 | 2026-12-31 | 2027-12-31 |
| Ruby 4.0 | `4.0` | Ubuntu 24.04 | 2029-03-31 | 2030-03-31 |
| Ruby 3.4 | `3.4` | Ubuntu 22.04 | 2028-03-31 | 2029-03-31 |
| Ruby 3.3 | `3.3` | Ubuntu 22.04 | 2027-03-31 | 2028-03-31 |
| .NET 10 | `10` | Ubuntu 24.04 | 2028-11-14 | 2029-11-14 |

### Past end of support (as of 2026-11-15)

Not recommended. Decommissioned/Decommission column is empty for all rows in the source.

| Runtime | Runtime Version | Environment | End of support | Deprecated |
|---|---|---|---|---|
| Go 1.23 | `1.23` | Ubuntu 22.04 | 2026-08-21 | 2027-08-21 |
| Go 1.22 | `1.22` | Ubuntu 22.04 | 2026-07-28 | 2027-07-28 |
| Go 1.21 | `1.21` | Ubuntu 22.04 | 2026-03-03 | 2027-03-03 |
| Go 1.20 | `1.20` | Ubuntu 22.04 | 2024-03-27 | 2025-03-27 |
| Go 1.19, 1.18 | `1.19`, `1.18` | Ubuntu 22.04 | 2024-07-10 | 2025-07-10 |
| Go 1.15 to 1.9 | `1.15`, `1.14`, `1.13`, `1.12`, `1.11`, `1.10`, `1.9` | Distroless | 2024-07-10 | 2025-07-10 |
| Java 11 | `11` | Ubuntu 18.04 | 2024-10-31 | 2025-10-31 |
| Java 8 | `8` | Debian 9 | 2024-07-10 | 2025-07-10 |
| Node.js 20 | `20` | Ubuntu 22.04 | 2026-04-30 | 2027-04-30 |
| Node.js 18 | `18` | Ubuntu 22.04 | 2025-04-30 | 2026-04-30 |
| Node.js 16, 14, 12, 10, 8 | `16`, `14`, `12`, `10`, `8` | Ubuntu 16.04 | 2024-07-10 | 2025-07-10 |
| Python 3.10 | `3.10` | Ubuntu 22.04 | 2026-10-04 | 2027-10-04 |
| Python 3.9 | `3.9` | Ubuntu 18.04 | 2025-10-05 | 2026-10-05 |
| Python 3.8 | `3.8` | Ubuntu 18.04 | 2024-10-14 | 2025-10-14 |
| Python 3.7, 3.6, 3.5, 3.4 | `3.7`, `3.6`, `3.5`, `3.4` | Ubuntu 16.04 | 2024-07-10 | 2025-07-10 |
| Python 2.7 | `2` | Ubuntu 16.04 | 2024-07-10 | 2025-07-10 |
| PHP 8.1 | `8.1` | Ubuntu 18.04 | 2025-12-31 | 2026-12-31 |
| PHP 7.4 | `7.4` | Ubuntu 18.04 | 2024-07-10 | 2025-07-10 |
| PHP 7.3, 7.2 | `7.3`, `7.2` | Ubuntu 16.04 | 2024-07-10 | 2025-07-10 |
| Ruby 3.2 | `3.2` | Ubuntu 22.04 | 2026-03-31 | 2027-03-31 |
| Ruby 3.1, 3.0, 2.7, 2.6 | `3.1`, `3.0`, `2.7`, `2.6` | Ubuntu 16.04 | 2024-07-10 | 2025-07-10 |
| .NET 8 | `8` | Ubuntu 22.04 | 2026-11-10 | 2027-11-10 |
| .NET 6 | `6` | Ubuntu 22.04 | 2024-11-12 | 2025-11-12 |
| .NET 3, 2, 1 | `3`, `2`, `1` | Ubuntu 16.04 | 2024-07-10 | 2025-07-10 |

## Notes

- Go's release policy: each major Go release is supported until there are two newer major releases; key dates might not be available until newer versions are public.
- Snippet taken from https://docs.cloud.google.com/appengine/docs/flexible/reference/app-yaml (`runtime_config`); the schedule page itself has no code block.
- Rows are grouped and merged (versions with identical dates) by the editor from the source tables; "past end of support" is computed against the 2026-11-15 retrieval date, not stated in the source.
- Source: https://docs.cloud.google.com/appengine/docs/flexible/lifecycle/support-schedule (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [standard-support-schedule.md](./standard-support-schedule.md)
- [runtime-lifecycle.md](./runtime-lifecycle.md)
- [flexible-app-yaml.md](./flexible-app-yaml.md)
