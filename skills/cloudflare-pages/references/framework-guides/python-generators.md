---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-sphinx-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-an-mkdocs-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-pelican-site/
---

# Sphinx, MkDocs and Pelican

Python-based generators. Each needs a `PYTHON_VERSION` environment variable and a dependency manifest (Pipfile for Sphinx, `requirements.txt` for MkDocs and Pelican).

## Signature / Usage

Sphinx (inside a Pipenv environment):

```sh
pipenv --python 3.7
pipenv install sphinx
pipenv shell
sphinx-quickstart
```

MkDocs:

```sh
mkdocs new <PROJECT_NAME>
pip freeze > requirements.txt
```

Pelican:

```sh
python3 -m pip install pelican
pip freeze > requirements.txt
mkdir content
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Sphinx build command | — | — | `make html` |
| Sphinx build directory | — | — | `build/html` (answer `Y` to "Separate source and build directories" in `sphinx-quickstart`) |
| MkDocs build command | — | — | `mkdocs build` |
| MkDocs build directory | — | — | `site` |
| Pelican build command | — | — | `pelican content` |
| Pelican build directory | — | — | `output` |
| `PYTHON_VERSION` | — | — | Environment variable; the guides set `3.7` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- The guides state Python 3.7 is the latest version supported by Pages; this is legacy wording from the source. Check the current supported versions on the build image page ([build-image.md](../configuration/build-image.md)) before pinning.
- Sphinx: Pages natively supports Pipenv (latest version installed by default). The guide uses the `Pipfile` and `Pipfile.lock` that Pipenv generates.
- Pelican: `content` is the directory name set in the build command.
- `pip freeze` records every package installed in the active environment; run it inside a clean virtual environment so only project dependencies are captured.
- Sphinx, MkDocs and Pelican themselves are out of scope for this skill.

## Related

- [docs-site-generators.md](./docs-site-generators.md)
- [overview.md](./overview.md)
