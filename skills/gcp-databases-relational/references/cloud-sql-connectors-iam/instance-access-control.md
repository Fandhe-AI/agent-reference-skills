---
source: https://docs.cloud.google.com/sql/docs/postgres/instance-access-control
---

# Instance access control

Cloud SQL instance access has two levels that you must configure before you can manage your instance: instance-level access (who or what can reach the instance) and database access (PostgreSQL roles and users).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/connect-connectors (restrict instance-level access to the Auth Proxy and Language Connectors; replace `INSTANCE_NAME`):

```bash
gcloud sql instances patch INSTANCE_NAME \
--connector-enforcement=REQUIRED
```

## Options / Props

Instance-level access by connection source:

| Connection source | Access configuration options |
|-------------------|------------------------------|
| Compute Engine | Cloud SQL Auth Proxy; authorize static IP address |
| Google Kubernetes Engine | Cloud SQL Auth Proxy Docker image; private IP; if using public IP, the Auth Proxy is required |
| App Engine standard environment | Same project: configure IAM. Between projects: configure IAM |
| App Engine flexible environment | Same project: preconfigured. Between projects: configure IAM |
| Cloud Run | A Cloud SQL instance set up with a public IP. Between projects: also configure IAM |

## Notes

- Database access: after connecting, a user or application logs in with a user or service account. Creating an instance sets up the default (root) user; create more users for finer-grained control. Database access uses PostgreSQL roles.
- Controlling who can manage the instance is covered by project access control (see [roles-and-permissions.md](./roles-and-permissions.md)).
- Authorize static IP address and Cloud Run with public IP expose the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Snippet is borrowed because the source has no code block.
- Cloud SQL is managed PostgreSQL on Google Cloud, distinct from Supabase Postgres (`supabase`) access control.
- Source: https://docs.cloud.google.com/sql/docs/postgres/instance-access-control (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/sql/docs/postgres/connect-connectors

## Related

- [roles-and-permissions.md](./roles-and-permissions.md)
- [connect-connectors.md](./connect-connectors.md)
- [iam-authentication.md](./iam-authentication.md)
