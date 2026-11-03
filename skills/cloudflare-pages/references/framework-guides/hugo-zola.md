---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-zola-site/
---

# Hugo and Zola

Single-binary static generators; both output to `public`. Both use Pages-provided environment variables for base URL handling and version pinning.

## Signature / Usage

Hugo project creation:

```sh
hugo new site my-hugo-site
```

Hugo base URL with the Pages URL:

Adapted (not in the official docs): the variable is quoted to avoid word splitting.

```sh
hugo -b "$CF_PAGES_URL"
```

Zola project creation:

```sh
zola init my-zola-project
```

Zola preview-deployment build command (set as the Pages build command):

Adapted (not in the official docs): `$CF_PAGES_URL` is quoted.

```sh
if [ "$CF_PAGES_BRANCH" = "main" ]; then zola build; else zola build --base-url "$CF_PAGES_URL"; fi
```

Zola `config.toml` after the first deploy:

Adapted (not in the official docs): fence language changed from `yaml` to `toml`, since `base_url = ...` is TOML.

```toml
# The URL the site will be built for
base_url = "https://my-zola-project.pages.dev"
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Hugo build command | — | — | `hugo` |
| Hugo build directory | — | — | `public` (configurable with `publishDir`) |
| Zola build command | — | — | `zola build` |
| Zola build directory | — | — | `public` |
| `HUGO_VERSION` | — | — | Environment variable to pin a specific or newer Hugo version, for example `0.128.0`; set under Pages project > **Settings** > **Environment variables** |
| `ZOLA_VERSION` | — | — | Optional environment variable to pin a Zola version, for example `0.19.2`; Zola is preinstalled in the build environment |
| `CF_PAGES_URL` | — | — | Provided by Pages; the deployment URL, used for base URL flags |
| `CF_PAGES_BRANCH` | — | — | Provided by Pages; the branch being built |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Hugo: `draft: true` posts are skipped by the build. Add `HUGO_VERSION` to the **Preview** environment too if you use preview deployments.
- Hugo theme setup in the guide uses `git submodule add https://github.com/gohugo-ananke/ananke.git themes/ananke` and `echo "theme = 'ananke'" >> hugo.toml`.
- Zola: preview deployments use branch URLs, so a hard-coded `base_url` can break asset loading; the conditional build command above handles that.
- Hugo and Zola themselves are out of scope for this skill.
- Corrected from the official docs: the shell variables are quoted to avoid word splitting (including `$CF_PAGES_URL`), and the fence language is changed from `yaml` to `toml` since `base_url = ...` is TOML.

## Related

- [jekyll.md](./jekyll.md)
- [overview.md](./overview.md)
