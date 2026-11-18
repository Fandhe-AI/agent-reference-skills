---
source: https://docs.cloud.google.com/stackdriver/docs/agent-deprecation-policy
---

# Cloud Logging and Monitoring agents deprecation policy

Deprecation policy for the legacy Cloud Logging agent, the legacy Cloud Monitoring agent and related client-side components. It does not apply to the Ops Agent or the Google-Built OpenTelemetry Collector, which follow the support time horizons page. These legacy agents are not current; use the Ops Agent for new work.

## Signature / Usage

Uninstalling a legacy agent repository left behind by a failed install (a command from the troubleshooting page, not from this policy):

```bash
sudo bash add-monitoring-agent-repo.sh --remove-repo
```

## Options / Props

### Components covered

| Component |
|-----------|
| Legacy Cloud Logging agent |
| Legacy Cloud Monitoring agent |
| Stackdriver Metadata agent |
| Heapster (for GKE version 1.15 and below) |
| Cloud Monitoring-Prometheus integration |

### Versioning and decommission rules

| Rule | Policy |
|------|--------|
| Versioning | `<MAJOR>.<MINOR>.<PATCH>`, for example stackdriver-agent 5.5.2; MAJOR for backwards-incompatible changes, MINOR for compatible features, PATCH for compatible fixes |
| Lifespan of a major version | At least 12 months |
| Decommission of major version N | 12 months after the release of the next major version N+1 |
| After decommission | No bug fixes or minor releases, no customer support, installer files removed from download |
| Minor releases | Do not reset the clock; a minor version follows its major version's schedule |
| Security / critical bugs | Backported to all supported major versions unless the fix is not backwards compatible; new features are not backported |
| Announcements | No Mandatory Service Announcement (MSA) per release; the planned decommission date is on each agent's README page |
| Environment / OS end of life | Agent support is deprecated as well; decommission happens when support for the environment or OS ends unless a date is already set |

### Transition plan (versions existing before the policy)

| Component | Name | Version number |
|-----------|------|----------------|
| Legacy Logging agent | google-fluentd | 1.6.3 and all earlier versions |
| Legacy Logging agent | fluent-plugin-google-cloud | 0.7.4 and all earlier versions |
| Legacy Logging agent | fluentd-catch-all-config | 1.0 and all earlier versions |
| Legacy Logging agent | fluent-plugin-detect-exceptions | 0.0.11 and all earlier versions |
| Legacy Logging agent | gcr.io/stackdriver-agents/stackdriver-logging-agent | 0.8-1.6.2-1 and all earlier versions |
| Legacy Monitoring agent | stackdriver-agent | 5.5.2-383 and all earlier versions |
| Metadata agent | metadata | 0.0.21 and all earlier versions |
| Heapster | heapster | 1.6.0-beta.1 and all earlier versions |
| Prometheus Sidecar | stackdriver-prometheus-sidecar | 0.3.1 and all earlier versions |

## Notes

- Transition plan (versions existing before the policy): These versions are available and supported at least until February 28, 2020; bug fixes are not backported for them.
- This page states no end-of-support date for the current legacy agents beyond the February 28, 2020 transition-plan date; decommission dates for other versions are on each component's README page.
- Deprecating support for an environment, OS or feature sends an MSA with a link to the policy; its decommission date is the decommission date of that major version, which is the last major version supporting it.
- `gcr.io` appears only as a legacy image name in the transition table (Container Registry is not a current registry).
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/troubleshoot-install-startup (no code on this page).
- Source: https://docs.cloud.google.com/stackdriver/docs/agent-deprecation-policy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [telemetry-agents.md](./telemetry-agents.md)
- [troubleshoot-install-startup.md](./troubleshoot-install-startup.md)
