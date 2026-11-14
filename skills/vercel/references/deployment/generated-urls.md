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
| `<project-name>-<unique-hash>-<scope-slug>.vercel.app` | Unique deployment URL; this is the standard output of `vercel deploy` |
| `<project-name>-<scope-slug>.vercel.app` | Also generated when deploying to production; points to the production deployment afterwards |
| `<project-name>-<author-name>-<scope-slug>.vercel.app` | Author-specific URL on team deployments |

## URL Components

| Value | Description | Created when |
|-------|-------------|--------------|
| `<project-name>` | Name of the Vercel Project | Git branch, Git commit, CLI |
| `<unique-hash>` | 9 randomly generated alphanumeric characters | Git commit, CLI |
| `<scope-slug>` | Account or team slug | Git branch, Git commit, CLI |
| `<branch-name>` | Git branch name | Git branch |

## Notes

- A deployment can have several URLs: unique deployment URL (a specific deployment), Git branch URL (latest deployment of the branch), production URL, and custom domains you assign.
- A generated URL stays usable only as long as the deployment retention policy allows.
- URLs are publicly accessible by default; restrict with [Deployment Protection](https://vercel.com/docs/security/deployment-protection).
- Vercel shortens URLs so each DNS label stays within the 63-character limit (RFC 1035); a label before `.vercel.app` (or the Preview Deployment Suffix) over the limit is truncated. Anti-phishing shortening can also apply within the limit.
- Project names resembling web domains may be shortened to prevent anti-phishing browser warnings (e.g., `www-company-com` → `company`).
- The commit URL is accessible from the **View deployment** button in a PR; the branch URL from the **Visit Preview** button.
- Pro/Enterprise teams can replace `.vercel.app` with a custom domain via **Preview Deployment Suffix** (requires permission).
- Source: https://vercel.com/docs/deployments/generated-urls (fetched 2026-11-14)

## Related

- [environments.md](./environments.md)
- [overview.md](./overview.md)
