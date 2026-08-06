# Admin API Keys

Admin API keys authenticate requests to the Administration API (organization management endpoints: users, invites, projects, spend limits, audit logs, and more). They cannot be used for non-administration OpenAI API endpoints (chat completions, embeddings, etc.).

## Signature / Usage

Create an Admin API key at [platform.openai.com/settings/organization/admin-keys](https://platform.openai.com/settings/organization/admin-keys), set it as `OPENAI_ADMIN_KEY`, and initialize the SDK with it:

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ["OPENAI_ADMIN_KEY"],
)
```

Or with `curl` directly against Administration API endpoints:

```bash
curl -X POST https://api.openai.com/v1/organization/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"threshold_amount": 10000, "currency": "USD", "interval": "month"}'
```

## Notes

- Minimum SDK versions for Admin API support: Node `6.36.0`, Python `2.34.0`, Go `3.34.0`, Ruby `0.61.0`, Java `4.34.0`.
- Admin API keys are scoped to administration endpoints only; they cannot call model/inference endpoints.
- Full endpoint reference: [Administration API reference](https://developers.openai.com/api/reference/administration/overview) (covers Admin API keys, Invites, Users, Projects, Spend limits, Audit logs subresources).
- Service-account API keys (project-scoped, non-admin) are created separately via the Administration API — see Terraform: Service Accounts.

## Related

- [RBAC](./rbac.md)
- [Invites and Users](./invites-and-users.md)
- [Terraform: Service Accounts](./terraform-service-accounts.md)
