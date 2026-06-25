# Subscription Groups

Collections of related auto-renewable subscriptions that share upgrade/downgrade/cross-grade eligibility.

## Signature / Usage

```
POST   /v1/subscriptionGroups
GET    /v1/subscriptionGroups/{id}
PATCH  /v1/subscriptionGroups/{id}
DELETE /v1/subscriptionGroups/{id}
GET    /v1/apps/{id}/subscriptionGroups
```

## Options / Props

### Core CRUD

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/subscriptionGroups` | Create a subscription group for an app |
| GET | `/v1/subscriptionGroups/{id}` | Read subscription group information |
| PATCH | `/v1/subscriptionGroups/{id}` | Modify a subscription group (e.g. reference name) |
| DELETE | `/v1/subscriptionGroups/{id}` | Delete an empty subscription group |
| GET | `/v1/apps/{id}/subscriptionGroups` | List all subscription groups for an app |
| GET | `/v1/apps/{id}/relationships/subscriptionGroups` | List subscription group IDs for an app |

### Related Resources

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/subscriptionGroups/{id}/subscriptions` | List all subscriptions in a group |
| GET | `/v1/subscriptionGroups/{id}/relationships/subscriptions` | List subscription IDs in a group |
| GET | `/v1/subscriptionGroups/{id}/subscriptionGroupLocalizations` | List all localizations for a group |
| GET | `/v1/subscriptionGroups/{id}/relationships/subscriptionGroupLocalizations` | List localization IDs for a group |

## Notes

- A subscription group can only be deleted when it contains no subscriptions.
- Customers can only subscribe to one subscription at a time within a group; they can upgrade, downgrade, or cross-grade between members.

## Related

- [Subscriptions](./subscriptions.md)
