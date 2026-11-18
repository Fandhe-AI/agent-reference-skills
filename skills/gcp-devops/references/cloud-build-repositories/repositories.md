---
source: https://docs.cloud.google.com/build/docs/repositories
---

# Cloud Build repositories overview

Cloud Build connects to source code repositories in two ways: Developer Connect connections, and Cloud Build repositories (2nd gen). With 2nd gen you can additionally configure repositories programmatically (gcloud, API, Terraform) and independently of a trigger. You must create a host connection before linking repositories with 2nd gen. Cloud Build repositories (1st gen) is superseded by 2nd gen but remains available as a legacy option. Cloud Build is Google Cloud's managed build service; GitHub Actions and GitLab CI workflows are not covered here (`github-docs` covers GitHub Actions).

## Signature / Usage

### Link a repository to an existing host connection (2nd gen)

Snippet taken from https://docs.cloud.google.com/build/docs/automating-builds/github/connect-repo-github (the same command is used for GitHub, GitLab and Bitbucket Cloud).

```bash
gcloud builds repositories create REPO_NAME \
  --remote-uri=REPO_URI \
  --connection=CONNECTION_NAME --region=REGION
```

## Options / Props

### Supported providers

| Provider | Developer Connect | Cloud Build repositories (2nd gen) |
|---|---|---|
| GitHub | Yes | Yes |
| GitHub Enterprise | Yes | Yes |
| GitLab | Yes | Yes |
| GitLab Enterprise Edition | Yes | Yes |
| Bitbucket Data Center | Yes | Yes |
| Bitbucket Cloud | Yes | Yes |
| Cloud Source Repositories | No | No |

### Repository capabilities

| Capability | Cloud Build repositories (2nd gen) | Developer Connect repositories |
|---|---|---|
| Build in response to branch pushes, tag pushes, or pull request events | Yes | Yes |
| Create a manual trigger | Yes | No |
| Create a Pub/Sub trigger | Yes | No |
| Create a webhook trigger | Yes | No |
| Create a single connection for a repository and use authentication from that connection to set up additional connections | Yes | Yes |
| Create repository connections using gcloud | Yes | Yes |
| Create and automate repository connections using Terraform | Yes, except for Bitbucket Data Center and Bitbucket Cloud | No |
| Link repositories without creating a host connection | No | No |
| Host connections and linked repositories must exist in a particular region | Yes | Yes |

## Notes

- With 2nd gen you can set up a single connection and use Secret Manager secrets from that connection to programmatically set up additional connections across regions and projects.
- By default the build repository is the repository that triggers the build (when using a trigger) or the one given to `gcloud builds submit`. Repositories can also be specified explicitly as dependencies (https://docs.cloud.google.com/build/docs/building/manage-dependencies).
- Cloud Source Repositories: effective June 17, 2024 it isn't available to new customers. If your organization hasn't previously used it, you can't enable the API or use it; new projects not connected to an organization can't enable the API. Organizations that used it before June 17, 2024 are not affected. Connecting Cloud Source Repositories repositories is not supported by either option.
- Source inconsistency: the capability table says Terraform is not supported for Bitbucket Data Center and Bitbucket Cloud with 2nd gen, yet the Bitbucket Cloud pages show Terraform examples; verify the Terraform provider documentation before relying on either.
- Besides repository events, builds can be invoked manually, on a Pub/Sub topic, or on an incoming webhook event (2nd gen only, per the table).
- This page does not cover the 1st gen details beyond the legacy statement. The source has no code block, so the snippet above is borrowed.
- Remember that Cloud Build builds run with the trigger's service account; repository connections are credentials-bearing resources, so restrict who holds `roles/cloudbuild.connectionAdmin`.
- Source: https://docs.cloud.google.com/build/docs/repositories (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-repo-github.md](./connect-repo-github.md)
- [connect-host-gitlab.md](./connect-host-gitlab.md)
- [connect-host-bitbucket-cloud.md](./connect-host-bitbucket-cloud.md)
- [build-repos-from-github.md](./build-repos-from-github.md)
