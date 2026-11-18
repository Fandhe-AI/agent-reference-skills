---
source: https://docs.cloud.google.com/monitoring/alerts/doc-variables
---

# Annotate Notifications with User-Defined Documentation

Alerting policies can carry custom documentation (subject, content, links) that Cloud Monitoring includes in notifications. Content supports Markdown and `${varname}` variables that Monitoring replaces with details about the policy and monitored data. Configure it in the console, the Cloud Monitoring API, or the Google Cloud CLI.

## Signature / Usage

### API example (`documentation` field of `AlertPolicy`)

Fragment of the policy JSON; the links appear in the email Quick Links section.

```text
      "documentation": {
        "content": "### CPU utilization exceeded\n\n### Summary\n\nThe ${metric.display_name} of the ${resource.type} ${resource.label.instance_id} in the project ${resource.project} has exceeded 5% for over 60 seconds.\n\n#### Additional resource information\n\nCondition resource name: ${condition.name}  \nAlerting policy resource name: ${policy.name}",
        "mimeType": "text/markdown",
        "subject": "Alert: ${metric.display_name} exceeded",
        "links": [
          {
            "displayName": "Playbook",
            "url": "https://myownpersonaldomain.com/playbook?name=${resource.type}"
          },
          {
            "displayName": "Repository with debug scripts",
            "url": "https://altostrat.com"
          },
          {
            "displayName": "Google Cloud dashboard",
            "url": "https://example.com"
          }
        ]
      }
```

### Console example (Documentation field)

```text
### CPU utilization exceeded

#### Summary

The ${metric.display_name} of the ${resource.type}
${resource.label.instance_id} in the project ${resource.project} has
exceeded 5% for over 60 seconds.

#### Additional resource information

Condition resource name: ${condition.name}  
Alerting policy resource name: ${policy.name}  

#### Troubleshooting and Debug References

Playbook: https://myownpersonaldomain.com/playbook?name=${resource.type}  
Repository with debug scripts: https://altostrat.com  
${resource.type} dashboard: https://example.com
```

### Slack channel control

Channel-specific characters in the documentation text are passed to the channel. For Slack, `@` mentions link to a user ID (not a name); a string like this makes Slack send an extra message to user ID `backendoncall`:

```text
<@backendoncall> Alert created based on policy ${policy.display_name}
```

## Options / Props

### Documentation parts

| Part | API field | Console field | Limits and where it appears |
|---|---|---|---|
| Subject | `documentation.subject` | Notification subject line | Field at most 10,240 bytes; after variable expansion truncated to 255 bytes (at a UTF-8 character boundary); plain text and variables; if unset Monitoring chooses |
| Content | `documentation.content` | Documentation | Plain text, variables, channel controls, Markdown subset; shown in email (Policy Documentation), PagerDuty, Pub/Sub, Slack, Webhooks. Discovery: at most 8,192 Unicode characters and 10,240 bytes |
| Links | `documentation.links[]` (`displayName`, `url`) | Put links in the Documentation field | Up to three links; shown in email (Quick Links), PagerDuty, Pub/Sub, Webhooks. Discovery: link `displayName` non-empty and at most 63 characters; URL at most 2083 characters |
| MIME type | `documentation.mimeType` | | Only `text/markdown` |

### Variables

| Variable | Value |
|---|---|
| `condition.name` | REST resource name of the condition, such as `projects/foo/alertPolicies/1234/conditions/5678` |
| `condition.display_name` | Condition display name; `"Log match condition"` for log-based policies created in Logs Explorer |
| `log.extracted_label.KEY` | Label `KEY` extracted from a log entry (log-based policies only) |
| `metadata.system_label.KEY` | System-supplied resource metadata label |
| `metadata.user_label.KEY` | User-defined resource metadata label |
| `metric.type` | Metric type such as `compute.googleapis.com/instance/cpu/utilization` |
| `metric.display_name` | Metric display name such as `CPU utilization` |
| `metric.label.KEY` | Metric label value; omitted from notifications if the value does not start with a digit, letter, `/` or `=`. For migrated Prometheus rules, `{{$value}}` and `{{humanize $value}}` appear as `${metric.label.value}` |
| `metric.label.metadata_system_VALUE` | PromQL metadata system label, e.g. `${metric.label.metadata_system_version}` |
| `metric.label.metadata_user_VALUE` | PromQL metadata user label, e.g. `${metric.label.metadata_user_name}` |
| `metric_or_resource.labels` | All metric and resource label values as a sorted list of `key-value` pairs; if names collide only the metric label is rendered. Migrated: `{{$labels}}` |
| `metric_or_resource.label.KEY` | Metric label value if valid, else resource label value, else empty string. Migrated: `{{$labels.KEY}}` |
| `policy.name` | REST resource name of the policy, such as `projects/foo/alertPolicies/1234` |
| `policy.display_name` | Policy display name |
| `policy.user_label.KEY` | User label value; keys start with a lowercase letter; keys and values only lowercase letters, digits, underscores, dashes |
| `project` | ID of the scoping project of a metrics scope |
| `resource.type` | Monitored-resource type, such as `gce_instance` |
| `resource.project` | Project ID of the monitored resource (use for the `project_id` label) |
| `resource.label.KEY` | Resource label value; user-defined resource metadata labels need `metadata.user_label.KEY` instead |

### Variable resolution contexts

| Context | Resolved |
|---|---|
| Email, Google Chat, Slack | Yes |
| Pub/Sub, Webhooks, PagerDuty | Yes, JSON schema version 1.2 |
| Google Cloud console alert details view | Usually |
| Other contexts | No; appears as `${varname}` |

## Notes

- Documentation parts: Markdown subset: headers (`#`), unordered lists (`+`, `-`, `*`), ordered lists, italic, bold, and `[link text](url)` (the API `Link` object is recommended for links).
- Variable values come from time series and can be `null`: after cross-series aggregation, labels not used in grouping are dropped and render as `null`; `metadata.*` values exist only if the label is in the condition filter or grouping. Make sure the aggregation does not eliminate the labels you reference. Labels added to log-based metrics cannot be used in template expressions.
- Only the listed variables are supported; expressions like `${varname1 + varname2}` are not. To write a literal `${` use `$${`. Policies always display variable strings like `${varname}`.
- Notifications can reach third parties (email, Slack, webhooks, Pub/Sub); do not put secrets, tokens or personal data in documentation text or link URLs.
- The `Link` snippet in the retrieved twin (`"links" [`) is malformed JSON (missing colon), so it is not reproduced; the complete API example above uses `"links": [`. The fragments above are not standalone JSON documents, so they use the `text` tag.
- Corrected from the official docs: this page says "Subject lines are limited to 255 characters." The monitoring v3 Discovery document (`Documentation.subject`) says "The subject line may not exceed 10,240 bytes. In notifications generated by this policy, the contents of the subject line after variable expansion will be truncated to 255 bytes or shorter at the latest UTF-8 character boundary." The table follows Discovery; with multi-byte characters 255 bytes is fewer than 255 characters.
- Source: https://docs.cloud.google.com/monitoring/alerts/doc-variables (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [alerts.md](./alerts.md)
- [using-alerting-ui.md](./using-alerting-ui.md)
- [policies-in-api.md](./policies-in-api.md)
