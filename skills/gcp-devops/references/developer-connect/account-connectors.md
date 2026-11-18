---
source: https://docs.cloud.google.com/developer-connect/docs/account-connectors
---

# Account connectors

An account connector connects your Google Cloud account with your individual account on a non-Google developer-tools provider. Users pick scopes for the connector; once it exists for an organization, users in that organization authorize their own accounts through it.

## Signature / Usage

Create a connector with a pre-configured OAuth client:

Adapted (not in the official docs): `PROVIDER` takes the lower-case value the gcloud 593.0.0 help lists (`github`, `gitlab`, `bitbucket-cloud`) rather than `GITHUB`.

```bash
gcloud alpha developer-connect account-connectors create my-ac \
    --location=LOCATION \
    --provider-oauth-config-system-id=PROVIDER \
    --provider-oauth-config-scopes=SCOPES \
    --project=PROJECT_ID
```

## Options / Props

| Configuration | Use |
|---------------|-----|
| Developer Connect pre-configured OAuth client | Built-in providers, for example GitHub or GitLab |
| Custom OAuth client | Your own OAuth app, for example an on-premises GitHub Enterprise instance |

## Notes

- In most cases platform administrators configure account connectors inside the Google Cloud service that integrates with Developer Connect, following prompts without leaving context; the Developer Connect UI is useful for managing many integrations in one place.
- Unlike Git repository connections, account connectors suit cases where the authorizing user must be present to invoke the connection.
- Adapted from the official docs: the borrowed command used `--provider-oauth-config-system-id=PROVIDER` with upper-case provider names.
- Snippet taken from https://docs.cloud.google.com/developer-connect/docs/configure-connectors (the source page has no code block). `gcloud developer-connect account-connectors create` (GA) also exists in gcloud 593.0.0 with the same flags.
- Source: https://docs.cloud.google.com/developer-connect/docs/account-connectors (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-connectors.md](./configure-connectors.md)
- [overview.md](./overview.md)
