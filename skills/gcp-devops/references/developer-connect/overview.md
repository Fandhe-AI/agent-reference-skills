---
source: https://docs.cloud.google.com/developer-connect/docs/overview
---

# Developer Connect overview

Developer Connect is a secure platform for integrating with source-code management (SCM) tools and getting insights into those connections. It offers two kinds of connections (system connections and account connectors) plus insights on deployments.

## Signature / Usage

Check a connection after creating it:

```bash
gcloud developer-connect connections describe CONNECTION_NAME \
    --location=REGION
```

## Options / Props

### Connection types

| Type | What it is | Needs the authorizing user present at invocation |
|------|------------|----|
| Git repository connection (system connection) | Narrowly scoped connection from a service account to a Git repository on an SCM outside Google Cloud, for example GitHub | No |
| HTTP connection (system connection) | Reusable connection that lets a service account use an arbitrary HTTP service endpoint; Developer Connect handles authentication each time | No |
| Account connector | Links your Google Account with your individual account on a non-Google provider; users in the organization authorize their own accounts | Yes |
| Insights | Deployment-event log entries in Cloud Logging, consumed by Gemini Cloud Assist | Not applicable |

### Products that can use Git repository connections

| Product |
|---------|
| Application Design Center |
| Cloud Build |
| Cloud Run |
| Dataform |
| Firebase App Hosting web apps |
| Gemini Code Assist code customization |
| Gemini code review agent |
| App Lifecycle Manager |
| Agent Runtime on Gemini Enterprise Agent Platform |

## Notes

- Git repository connections are for cases where the user who created the connection need not be present at invocation; for example a Cloud Build trigger runs on commit once the service account is permitted to use the connection. Account connectors are for cases where the authorizing user must be present.
- Account connectors can use a Developer Connect pre-configured OAuth client (for example GitHub or GitLab) or your own custom OAuth client (for example an on-premises GitHub Enterprise instance). The source lists connecting BigQuery Studio Git repositories as a use of account connectors.
- Insights use log entries for deployment events in Cloud Logging, which give Gemini Cloud Assist information about runtimes, deployed artifacts, source files and dependencies.
- Cloud Build is Google Cloud's managed build service; GitHub Actions workflows are in `github-docs`.
- Snippet taken from https://docs.cloud.google.com/developer-connect/docs/connect-github-repo (the source page itself contains no code block).
- Source: https://docs.cloud.google.com/developer-connect/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [git-repo-connections.md](./git-repo-connections.md)
- [http-connections.md](./http-connections.md)
- [account-connectors.md](./account-connectors.md)
- [insights.md](./insights.md)
