---
source: https://developers.cloudflare.com/pages/migrations/migrating-jekyll-from-github-pages/
---

# Migrating a Jekyll-based site from GitHub Pages

Add a Gemfile with the `github-pages` gem, then connect the repository to Pages with `jekyll build` and `_site`.

## Signature / Usage

```sh
brew install ruby@3.2
export PATH="/usr/local/opt/ruby@3.2/bin:$PATH"
```

```sh
cd my-github-pages-repo
bundle init
```

Add to the end of the generated `Gemfile`:

```ruby
# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) { |repo_name| "https://github.com/#{repo_name}" }

# gem "rails"
gem "github-pages", group: :jekyll_plugins
```

```sh
bundle update
```

```sh
git add Gemfile Gemfile.lock
git commit -m "deps: added Gemfiles"
git push origin main
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | setting | — | `main` |
| Build command | setting | — | `jekyll build` |
| Build directory | setting | — | `_site` |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- If the repository already has a `Gemfile` and `Gemfile.lock`, skip the preparation step.
- Legacy: the page says Pages build system V2 uses Ruby 3.2.2 for the default Jekyll build, so it asks you to make local development compatible with Ruby 3.2. The v3 image default is Ruby 3.4.4 (see the build image page); override with `RUBY_VERSION` or `.ruby-version` if needed. The `/usr/local/opt/...` path is the Intel Homebrew prefix as printed in the source.
- Create the project: **Create application** > **Pages** > **Import an existing Git repository**. Every push rebuilds; pull requests get preview deployments.
- Custom domain: update the DNS `CNAME` from `<your-username>.github.io` to `<your-pages-site>.pages.dev`; DNS caches may delay the change.
- Without GitHub Pages, use the Jekyll framework guide at https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/.

## Related

- [Get started with Git integration](./get-started-git-integration.md)
- [Build image](../configuration/build-image.md)
- [Custom domains](../configuration/custom-domains.md)
