# Generated URLs

When a deployment is created (preview or production), Vercel automatically generates a unique URL for accessing that specific deployment.

## URL Formats

### From Git

| Type | Format | Behavior |
|------|--------|----------|
| Commit-specific | `<project-name>-<unique-hash>-<scope-slug>.vercel.app` | Always points to this exact commit |
| Branch-specific | `<project-name>-git-<branch-name>-<scope-slug>.vercel.app` | Always points to the latest commit on the branch |

### From Vercel CLI

| Format | Notes |
|--------|-------|
| `<project-name>-<scope-slug>.vercel.app` | Standard CLI deployment URL |
| `<project-name>-<author-name>-<scope-slug>.vercel.app` | Author-specific URL on team deployments |

## URL Components

| Value | Description | Created when |
|-------|-------------|--------------|
| `<project-name>` | Name of the Vercel Project | Git branch, Git commit, CLI |
| `<unique-hash>` | 9 randomly generated alphanumeric characters | Git commit |
| `<scope-slug>` | Account or team slug | Git branch, Git commit, CLI |
| `<branch-name>` | Git branch name | Git branch |

## Notes

- URLs are publicly accessible by default; restrict with [Deployment Protection](https://vercel.com/docs/security/deployment-protection).
- URLs longer than 63 characters before `.vercel.app` are truncated.
- Project names resembling web domains may be shortened to prevent anti-phishing browser warnings (e.g., `www-company-com` → `company`).
- The commit URL is accessible from the **View deployment** button in a PR; the branch URL from the **Visit Preview** button.
- Pro/Enterprise teams can replace `.vercel.app` with a custom domain via **Preview Deployment Suffix** (requires permission).

## Related

- [environments.md](./environments.md)
- [overview.md](./overview.md)
