---
source: https://developers.cloudflare.com/d1/configuration/data-location/
---

# Data location

How D1 decides where the primary database instance runs, and how to control it with a location hint or a jurisdiction.

## Signature / Usage

```sh
wrangler d1 create new-database --location=weur
npx wrangler@latest d1 create db-with-jurisdiction --jurisdiction=eu
```

Create with a jurisdiction via REST API:

Adapted (not in the official docs): `$TOKEN` replaces the official `$TOKENn` typo; see Notes.

```curl
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<account_id>/d1/database" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     --data '{"name": "db-with-jurisdiction", "jurisdiction": "eu" }'
```

## Options / Props

Supported jurisdictions:

| Parameter | Location |
| --- | --- |
| eu | The European Union |
| fedramp | FedRAMP-compliant data centers |
| us | The United States |

Available location hints:

| Hint | Hint description |
| --- | --- |
| wnam | Western North America |
| enam | Eastern North America |
| weur | Western Europe |
| eeur | Eastern Europe |
| apac | Asia-Pacific |
| oc | Oceania |

## Notes

- Default (recommended): D1 creates the primary database instance close to where the create request was issued.
- Jurisdictions restrict where the database runs and stores data (e.g. GDPR, FedRAMP). Workers may still access the database from anywhere; consider Regional Services to control the regions that respond to requests.
- Jurisdictions can only be set at creation and cannot be added or updated later. If both a jurisdiction and a location hint are given, the jurisdiction wins and the hint is ignored.
- A location hint does not guarantee placement; D1 runs in the nearest possible location (by latency). Useful for distributed teams, user-specific databases, and CD/IaC creation.
- Location hints are not supported for South America (`sam`), Africa (`afr`), and the Middle East (`me`); D1 databases do not run there.
- With read replication enabled, D1 creates a read replica in every available region, including the primary's region. If a jurisdiction is configured, read replicas are only created within it.
- The dashboard offers equivalents (Create Database > Data location / Location).
- Corrected from the official docs: the REST example uses `$TOKENn`, a typo that expands an unset variable; it is written as `$TOKEN`.

## Related

- [Global read replication](./read-replication.md)
- [Wrangler commands](./wrangler-commands.md)
- [Getting started](./get-started.md)
