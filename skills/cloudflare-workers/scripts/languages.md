---
source: https://developers.cloudflare.com/workers/languages/python/
---

# Languages

Project setup commands for Python and Rust Workers. Pinned to cloudflare-docs production SHA `d0995b9`, fetched 2026-11-03. Rust from `/workers/languages/rust/`; Python also from `/workers/languages/python/basics/`, `/packages/`, `/packages/django/`.

Full Wrangler command set: see the cloudflare-wrangler skill. For uv itself, see the uv skill.

## Python: initialize a project with pywrangler

```bash
uvx --from workers-py pywrangler init
```

Requires uv and Node. Creates `pyproject.toml` (with `workers-py` as a dev dependency) and a wrangler config file. The `python_workers` compatibility flag must be set on the Worker.

## Python: initialize from a template

```bash
uv run pywrangler init
```

Prompts for a template.

```bash
uv run pywrangler init django-worker --template https://github.com/cloudflare/python-workers-examples/tree/main/django
```

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/hello
```

## Python: run locally

```bash
uv run pywrangler dev
```

## Python: deploy

```bash
uv run pywrangler deploy
```

Packages in `pyproject.toml` are bundled on deploy. Deploy is a production-affecting operation.

## Python: list all supported commands

```bash
uv run pywrangler --help
```

## Python: generate types

```bash
uv run pywrangler types
```

## Python: upgrade pywrangler

```bash
uv tool upgrade workers-py
```

```bash
uv lock --upgrade-package workers-py
```

First is global, second is per-project.

## Python: set a secret

```bash
uv run pywrangler secret put DJANGO_SECRET_KEY
```

Example from the Django guide.

## Rust: prerequisites

```sh
rustup target add wasm32-unknown-unknown
```

```sh
cargo install cargo-generate
```

## Rust: create a project

```sh
cargo generate cloudflare/workers-rs
```

## Rust: develop and deploy

```sh
npx wrangler dev
```

```sh
npx wrangler deploy
```

The template's `wrangler.toml` invokes `worker-build` as the build command.

## Rust: patch wasm-bindgen output without workers-rs

```sh
wasm-pack build --target bundler
```

Only when using `wasm-bindgen` without `workers-rs` / `worker-build`; the emitted JavaScript must then be patched as shown in the Rust page.

## Notes

- Doc inconsistencies (kept verbatim above): the Rust page titles its project step "Create a new project with Wrangler" but uses `cargo generate`, and names the bundler step `worker-bundle` / `web-pack` where `worker-build` / webpack is meant.
- The Rust template uses `wrangler.toml`; the Python local-dev page shows both `.jsonc` and `.toml` config.
