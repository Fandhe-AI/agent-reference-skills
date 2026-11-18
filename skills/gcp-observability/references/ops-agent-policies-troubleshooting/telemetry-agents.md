---
source: https://docs.cloud.google.com/stackdriver/docs/support-info/telemetry-agents
---

# Support time horizons for the Ops Agent and Google-Built OpenTelemetry Collector

Each minor version of the Ops Agent and the Google-Built OpenTelemetry Collector gets active support for two years after release, then Keep The Lights On (KTLO) for one more year, then it is unsupported. The page does not apply to the legacy Monitoring and Logging agents (see the deprecation policy).

## Signature / Usage

To stay in active support, move to a current version. A GA agent policy that pins major version 2 (the version string is the one used by the agent-policies page):

```yaml
agentsRule:
  packageState: installed
  version: 2.*.*
instanceFilter:
  inventories:
  - osShortName: rhel
    osVersion: '7.*'
  - osShortName: debian
    osVersion: '11'
```

## Options / Props

### Support modes

| | Active support (years 1 and 2) | KTLO (year 3) | Unsupported (after year 3) |
|---|---|---|---|
| Bug fixes & security patches | Yes | No | No |
| New distro support | Yes | No | No |
| Case support | Yes | No | No |
| Upgrade support | Yes | No | No |
| Fleet-wide installation | Yes | Yes | No |
| Manual installation | Yes | Yes | Possibly |
| Telemetry ingestion | Yes | Yes | Yes |

## Notes

- Active support: regular bug fixes and feature upgrades and security patches as new versions, support for new distro releases, support cases accepted, compatibility with Google fleet-wide management tools, ability to migrate or upgrade to the latest version from any version in active support; for the Google-Built OpenTelemetry Collector, container image vulnerabilities are fixed for the current version and released in the subsequent version.
- KTLO: no bug fixes unless the issue also exists in the latest version (then fixed in the next version), no new distro releases, no support cases, packages and repositories remain available for manual or fleet-wide installation, no upgrade assistance beyond the documentation.
- Unsupported: existing deployments can still send telemetry and won't break unless something outside the agent (such as a logs or metrics API) changes; new installations might be possible but are strongly discouraged.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/agent-policies (this page has no code).
- Source inconsistency: the borrowed policy targets `rhel` `7.*` and `debian` `11`, which are not in the Ops Agent supported operating systems list (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent, retrieved 2026-11-18); the block shows the `version: 2.*.*` syntax only.
- Source: https://docs.cloud.google.com/stackdriver/docs/support-info/telemetry-agents (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [agent-deprecation-policy.md](./agent-deprecation-policy.md)
- [agent-policies.md](./agent-policies.md)
