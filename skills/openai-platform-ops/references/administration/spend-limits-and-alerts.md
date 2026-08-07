# Spend Limits and Alerts

Two distinct controls track and cap monthly API costs: spend alerts (notification only) and hard spend limits (enforce a cap by failing requests).

## Signature / Usage

Set an organization hard spend limit:

```bash
curl -X POST https://api.openai.com/v1/organization/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "threshold_amount": 10000,
    "currency": "USD",
    "interval": "month"
  }'
```

Create a project spend alert:

```python
spend_alert = client.admin.organization.projects.spend_alerts.create(
    "proj_abc",
    currency="USD",
    interval="month",
    notification_channel={
        "recipients": ["billing@example.com"],
        "type": "email",
        "subject_prefix": "[OpenAI spend]",
    },
    threshold_amount=50000,
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| threshold_amount | integer | Threshold in cents |
| currency | string | Must be `USD` |
| interval | string | Must be `month` |
| notification_channel.type | string | `email` |
| notification_channel.recipients | string[] | Email recipients |

## Notes

- Spend alert: sends a notification; API traffic continues. Hard spend limit: affected requests return `429` with `organization_spend_limit_exceeded` or `project_spend_limit_exceeded`.
- Spend alerts remain active even after a hard limit is added — use them to get warned before the hard limit interrupts traffic.
- Organization hard limits apply across all projects; project hard limits apply only to that project's billed traffic.
- Enforcement isn't instantaneous, so recorded spend can slightly exceed the configured amount.
- OpenAI also assigns an approved monthly usage limit based on usage tier, separate from configured spend limits (`organization_usage_limit_exceeded`).
- Configuring via dashboard: Organization limits page → Spend → Edit spend limit (org); Project settings → Limits → Spend (project).
- Restoring traffic: check `error.code`, raise/remove the limit, or add credits for `credit_balance_exhausted`.

## Related

- [Projects](./projects.md)
- [Terraform: Rate Limits and Spend](./terraform-rate-limits-and-spend.md)
- [Usage and Costs API](./usage-and-costs-api.md)
