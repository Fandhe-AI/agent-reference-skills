---
source: https://docs.cloud.google.com/appengine/docs/standard/lifecycle/runtime-lifecycle
---

# Runtime lifecycle (standard environment)

App Engine standard runtimes use open source components maintained by their communities and are identified by language version (for example Java 17, Python 3.10). A runtime moves through GA support, end of support, deprecated and decommissioned phases.

## Signature / Usage

### Select a runtime in app.yaml

```yaml
runtime: python315
```

Pick a runtime that is within GA support in [standard-support-schedule.md](./standard-support-schedule.md); the example ID above is Preview there.

## Options / Props

| | GA-level support | End of Support | Deprecated | Decommissioned |
|---|---|---|---|---|
| Creation and redeployment | Yes | No (see note 1) | No | No |
| Project configuration updates | Yes | Yes | No | No |
| Running existing workloads | Yes | Yes | Yes | May be disabled |
| UI and CLI warnings | Yes | Yes | No | No |
| Language patches | Automatic | No automatic updates | No automatic updates | No automatic updates |
| Patching APIs and SDKs | Automatic | No automatic updates | No automatic updates | No automatic updates |
| Patching OS | Automatic | No automatic updates | No automatic updates | No automatic updates |
| Customer support | GA-level support | No runtime support | No runtime support | No runtime support |

### Phases

- Notification period: in-app notifications begin 90 days before end of support.
- End of support: no more security updates or patches; the app continues to run and receive traffic; you can no longer create or update the app on the unsupported runtime; issues from using it are not eligible for technical support. Google may let an organization re-enable deployments for legacy runtimes through an organization policy (note 1).
- Deprecated: if deployments were re-enabled for an organization, Google removes that ability once the runtime is deprecated.
- Decommissioned: apps still using a decommissioned runtime may be disabled without further notice; you must choose a newer runtime.

## Notes

- Note 1: in certain cases Google may permit an organization to re-enable deployments for legacy runtimes using an organization policy (`https://docs.cloud.google.com/appengine/docs/standard/long-term-support`). This is an exception, not a recommendation.
- Migration guides for first-generation runtimes: Python 2.7, PHP 5, Go 1.11 and Java 8 to the latest runtime (`https://docs.cloud.google.com/appengine/migration-center/standard/migrate-to-second-gen/overview`).
- Google may change any runtime's schedule in accordance with the agreement for Google Cloud platform services.
- Snippet taken from https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml (`runtime: python315`); the lifecycle page itself has no code block.
- Source: https://docs.cloud.google.com/appengine/docs/standard/lifecycle/runtime-lifecycle (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [standard-support-schedule.md](./standard-support-schedule.md)
- [flexible-support-schedule.md](./flexible-support-schedule.md)
- [standard-app-yaml.md](./standard-app-yaml.md)
