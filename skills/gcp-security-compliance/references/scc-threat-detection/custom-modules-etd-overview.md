---
source: https://docs.cloud.google.com/security-command-center/docs/custom-modules-etd-overview
---

# Overview of custom modules for Event Threat Detection

Custom modules (Premium and Enterprise (Deprecated) service tiers) are a select group of Event Threat Detection detectors that you configure with your own detection parameters, remediation guidance and severity to process the Cloud Logging stream. You can create one in the Google Cloud console or by sending a JSON module template through the Google Cloud CLI. Enabled modules run in real-time mode alongside the built-in detectors, triggering scans whenever new logs are created.

## Signature / Usage

### Create an Event Threat Detection custom module

`config.json` is the custom config file for the chosen module type, written from the JSON module template of that type (see Notes). The help also offers `--validate-only` to validate the request (including IAM checks) without creating the module, and `--enablement-state` accepts `ENABLED`, `DISABLED` or `INHERITED`.

```bash
gcloud scc manage custom-modules etd create \
    --organization=organizations/123 \
    --display-name="test_display_name" \
    --module-type="CONFIGURABLE_BAD_IP" \
    --enablement-state="ENABLED" --custom-config-file=config.json
```

## Options / Props

### Module types and required logs

| Finding category | Module type | Log source types | Detects |
|---|---|---|---|
| Configurable bad IP | `CONFIGURABLE_BAD_IP` | VPC flow logs, Firewall Rules logs | A connection to a specified IP address |
| Configurable bad domain | `CONFIGURABLE_BAD_DOMAIN` | Cloud DNS logs | A connection to a specified domain name |
| Unexpected Compute Engine instance type | `CONFIGURABLE_ALLOWED_COMPUTE_ENGINE_INSTANCE_TYPE` | Cloud Audit Logs: Admin Activity logs | Creation of Compute Engine instances that do not match a specified instance type or configuration |
| Unexpected Compute Engine source image | `CONFIGURABLE_ALLOWED_COMPUTE_ENGINE_SOURCE_IMAGE` | Cloud Audit Logs: Admin Activity logs | Creation of an instance with an image or image family that does not match a specified list |
| Unexpected Compute Engine region | `CONFIGURABLE_ALLOWED_COMPUTE_ENGINE_REGION` | Cloud Audit Logs: Admin Activity logs | Creation of an instance in a region not in a specified list |
| Breakglass account used | `CONFIGURABLE_BREAKGLASS_ACCOUNT_USED` | Cloud Audit Logs: Admin Activity logs; Data Access logs (optional) | Use of an emergency access (breakglass) account |
| Unexpected role grant | `CONFIGURABLE_UNEXPECTED_ROLE_GRANT` | Cloud Audit Logs: Admin Activity logs | A specified role is granted to a user |
| Custom role with prohibited permission | `CONFIGURABLE_CUSTOM_ROLE_WITH_PROHIBITED_PERMISSION` | Cloud Audit Logs: Admin Activity logs | A custom role with any specified IAM permission is created or updated |
| Unexpected Cloud API Call | `CONFIGURABLE_UNEXPECTED_CLOUD_API_CALL` | Cloud Audit Logs: Admin Activity logs; Data Access logs (optional) | A specified principal calls a specified method against a specified resource; a finding is generated only if all regular expressions match in a single log entry |

### Quotas and limits

| Limit | Value |
|---|---|
| Custom modules creation (default quota) | 200 |
| Get, List API calls | 1,000 API calls per minute, per organization |
| Create, Update, Delete API calls | 60 API calls per minute, per organization |
| Module size | 6 MB per custom module |
| Findings per custom module | 30 findings per custom module per hour |
| Findings per parent resource | 200 custom module findings per parent resource (organization or project) per hour; each finding counts toward the organization or project where the source module was created |

## Notes

- The rate limits (30 per module per hour, 200 per parent resource per hour) can't be increased.
- The feature is free of charge to Security Command Center Premium customers.
- Example: the built-in `Malware: Bad IP` detector checks VPC Flow Logs for known suspicious IPs; the `Configurable Bad IP` custom module lets you supply your own list. Custom modules still use Event Threat Detection's proprietary detection logic and threat intelligence.
- JSON module templates: the source page shows one per module type (click the expand icon next to its name); you need them to create or update custom modules with the gcloud CLI. They are not reproduced here.
- Creation, update and deletion of custom modules change what detects threats in the organization; use `--validate-only` (the help states it validates the request including IAM checks) before applying changes, and try changes on a test project first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/custom-modules/etd/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/security-command-center/docs/custom-modules-etd-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after that date.

## Related

- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [event-threat-detection-rules.md](./event-threat-detection-rules.md)
- [how-to-use-event-threat-detection.md](./how-to-use-event-threat-detection.md)
