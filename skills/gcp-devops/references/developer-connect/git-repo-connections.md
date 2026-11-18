---
source: https://docs.cloud.google.com/developer-connect/docs/git-repo-connections
---

# Git repository connections

A Git repository connection is a Developer Connect system connection for narrowly scoped connections to Git-based repositories on SCMs outside Google Cloud. A connection holds the link to the SCM platform; a link is the association with one repository under it.

## Signature / Usage

Create a repository link under an existing connection:

```bash
gcloud developer-connect connections git-repository-links create REPO_NAME \
    --clone-uri=REPO_URI \
    --connection=CONNECTION_NAME \
    --location=REGION
```

## Options / Props

### Key concepts

| Concept | Meaning |
|---------|---------|
| Connection | First step in creating a bridge between Google and a non-Google SCM platform |
| Link | Association with an individual Git repository selected within a connected SCM platform; a connection can have multiple links |

### Supported products, use cases and SCMs

| Product | Use case | Supported SCMs |
|---------|----------|----------------|
| Gemini Enterprise Agent Platform | Deploy directly from a repository linked using Developer Connect | GitHub, GitLab, Bitbucket Cloud |
| Firebase App Hosting | Create a web app from your GitHub repositories | GitHub |
| Cloud Build triggers | Trigger builds from events in connected repositories | GitHub, GitHub Enterprise Cloud, GitHub Enterprise, GitLab, GitLab Enterprise, Bitbucket Cloud, Bitbucket Data Center |
| App Lifecycle Manager | Connect to Terraform files stored in external Git repositories | GitHub, GitHub Enterprise Cloud, GitHub Enterprise |
| Application Design Center | Create and share templates so applications follow organizational standards and to reduce deployment time | GitHub |
| Gemini Code Assist code customization | AI-powered coding assistance tailored to your connected repositories | GitHub, GitHub Enterprise Cloud, GitHub Enterprise, GitHub Enterprise in private networks, GitLab, GitLab Enterprise (including GitLab Community Edition), GitLab Enterprise in private networks, Bitbucket Cloud, Bitbucket Data Center, Bitbucket Data Center in private networks |
| Gemini Code Assist | Gemini-powered agent that summarizes pull requests and gives in-depth code reviews | GitHub |

## Notes

- When you create a link, webhooks are enabled for the linked repository. You can enable or disable Git proxy per linked repository; proxy is enabled by default when you create a connection in the Google Cloud console.
- Developer Connect guides you through authentication, authorization and networking configuration; connections to publicly hosted repositories can often use prebuilt Google-managed processes and apps. All repository connections are managed in one place.
- Bot services in the SCM accounts can handle routine tasks such as cloning and indexing repositories.
- Resource names use `.../connections/CONNECTION/gitRepositoryLinks/LINK`.
- Snippet taken from https://docs.cloud.google.com/developer-connect/docs/connect-github-repo (the source page has no code block).
- Source: https://docs.cloud.google.com/developer-connect/docs/git-repo-connections (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-repo.md](./connect-repo.md)
- [connect-github-repo.md](./connect-github-repo.md)
- [connect-gitlab.md](./connect-gitlab.md)
- [connect-secure-source-manager.md](./connect-secure-source-manager.md)
- [overview.md](./overview.md)
