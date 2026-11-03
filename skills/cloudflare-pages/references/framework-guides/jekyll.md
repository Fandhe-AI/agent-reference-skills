---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/
---

# Jekyll

Jekyll needs a committed `Gemfile` and a `RUBY_VERSION` environment variable matching your local Ruby.

## Signature / Usage

```sh
rbenv install <RUBY_VERSION> # For example, 3.1.3
gem install jekyll
jekyll new my-jekyll-site
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Build command | — | — | `jekyll build` |
| Build directory | — | — | `_site` |
| `RUBY_VERSION` | — | — | Environment variable (example `3.1.3`); set on both preview and production deployments |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Pages reads your `Gemfile` and runs `bundle install`, so commit the `Gemfile` when migrating an existing project.
- Migrating from GitHub Pages: [migrating-jekyll-from-github-pages.md](../platform-howto/migrating-jekyll-from-github-pages.md).
- Jekyll itself is out of scope for this skill.

## Related

- [hugo-zola.md](./hugo-zola.md)
- [overview.md](./overview.md)
