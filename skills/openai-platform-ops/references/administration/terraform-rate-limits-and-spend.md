# Terraform: Rate Limits and Spend

Manage an existing project's per-model rate limits and configure monthly spend alerts (project or organization scoped) with Terraform.

## Signature / Usage

```terraform
data "openai_project_rate_limits" "current" {
  project_id = "proj_123"
}

resource "openai_project_rate_limit" "application" {
  project_id                = "proj_123"
  rate_limit_id             = "rl-gpt-3.5-turbo"
  max_requests_per_1_minute = 500
  max_tokens_per_1_minute   = 200000
}

resource "openai_project_spend_alert" "monthly" {
  project_id                          = "proj_123"
  threshold_amount                    = 20000
  currency                            = "USD"
  interval                            = "month"
  notification_channel_type           = "email"
  notification_channel_recipients     = ["platform-alerts@example.com"]
  notification_channel_subject_prefix = "OpenAI project spend"
}

resource "openai_organization_spend_alert" "monthly" {
  threshold_amount                = 100000
  currency                        = "USD"
  interval                        = "month"
  notification_channel_type       = "email"
  notification_channel_recipients = ["platform-alerts@example.com"]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| rate_limit_id | string | ID of an existing model rate-limit record (not a model ID) — OpenAI creates the record, Terraform only updates it |
| max_requests_per_1_minute / max_tokens_per_1_minute | integer | Model-specific rate limit fields; other record types expose images/min, audio MB/min, requests/day, or Batch tokens/day |
| threshold_amount | integer | Alert threshold in cents |
| notification_channel_recipients | string[] | Required, at least one email address |

## Notes

- `data.openai_project_rate_limits` is read-only; use it to discover the `rate_limit_id` for the model you want to manage.
- The first `terraform apply` for `openai_project_rate_limit` shows as an addition to state but updates the existing remote record; removing it from config drops it from state without resetting the remote value.
- `openai_organization_spend_alert` has no `project_id` — it measures organization-wide spend.
- Spend alerts are notifications only, not enforcement — pair with hard spend limits or rate limits for actual caps.

## Related

- [Spend Limits and Alerts](./spend-limits-and-alerts.md)
- [Terraform: Project Controls](./terraform-project-controls.md)
