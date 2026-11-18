---
source: https://docs.cloud.google.com/deploy/docs/analysis
---

# Cloud Deploy analysis

Analysis lets Cloud Deploy evaluate the performance of a deployed application over a set duration, using Google Cloud Observability alerting policies or a custom container for another metrics system such as Datadog or Prometheus. A failed analysis fails the rollout, and automations can react to the result. The source page describes the concept; the `analysis` stanza schema lives in the Cloud Deploy configuration reference.

## Signature / Usage

Analysis pairs with automation rules, for example `repairRolloutRule` to roll back automatically when an analysis job finds a problem. The `analysis` stanza for Google Cloud Observability can be used directly inside a strategy config (`strategy.standard.analysis`), or per phase in a custom canary. The source page has no code block, so the example below is borrowed from the configuration reference.

```text
analysis:
  duration: DURATION
  googleCloud:
    alertPolicyChecks:
    - id: CHECK_ID
      alertPolicies:
      - ALERT_POLICY_NAME
      labels:
        LABEL_KEY: LABEL_VALUE
```

## Options / Props

### Supported metrics providers

| Provider | How |
|----------|-----|
| Google Cloud Observability | Direct integration with alerting policies based on telemetry and logs; no customization needed. |
| Other (for example Prometheus, Datadog) | Custom analysis: your organization provides a container that supports the metrics system. Google Cloud provides a sample Datadog integration (`GoogleCloudPlatform/cloud-deploy-samples`, `analysis`). |

### Analysis job run states

| State | Meaning |
|-------|---------|
| `IN_PROGRESS` | The analysis has started and is running. The rollout remains `IN_PROGRESS` unless you cancel it. |
| `FAILED` | An alert from Google Cloud Observability was detected, or a custom container returned a non-zero exit code. The rollout state is `FAILED`; ignoring or retrying the analysis job sets it back to `IN_PROGRESS`. |
| `SUCCEEDED` | The `duration` expired with no unfavorable metrics. The rollout becomes `SUCCEEDED` after all other phases and jobs finish. |

### Order of jobs in a rollout

| Order | Job |
|-------|-----|
| 1 | Deploy |
| 2 | Verify (if the release includes one) |
| 3 | Analysis |
| 4 | Post-deploy jobs (if any) |

## Notes

- You can run analysis jobs in any target environment (for example staging or prod). Automations are not required to use analysis.
- Using Google Cloud Observability: configure metrics, create an alert policy, add an `analysis` stanza to the delivery pipeline configuration (one or more analysis checks plus a `duration`), then deploy. With another provider, alerting is the responsibility of that tool or your custom container.
- Custom analysis: each check includes a task that references your container, the commands to run, any environment variables, and a frequency (how often to run the check).
- Canary: use metrics to decide whether to advance to the next phase; combine with `advanceRolloutRule` (for example in the phase before `stable`, using an uptime check). For custom or custom-automated canaries, configure analysis jobs inside the configuration of each phase to analyse.
- `promoteReleaseRule` can promote to `prod` when analysis in `staging` completes without alerts.
- Alert policies are Cloud Monitoring features (`gcp-observability`).
- Snippet taken from https://docs.cloud.google.com/deploy/docs/config-files (the `analysis` for Google Cloud Observability block). `DURATION` is the time to run the analysis, for example `200s`; `CHECK_ID` a unique ID for the alert policy check; `ALERT_POLICY_NAME` the name of the alert policy created in Google Cloud Observability; `LABEL_KEY` / `LABEL_VALUE` a label to match against the alerting policy.
- Source: https://docs.cloud.google.com/deploy/docs/analysis (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [automation-rules.md](./automation-rules.md)
- [verify-deployment.md](./verify-deployment.md)
- [hooks.md](./hooks.md)
