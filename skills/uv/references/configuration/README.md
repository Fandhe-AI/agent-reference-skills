# configuration

| Name | Description | Path |
|------|-------------|------|
| Caching | uv caches aggressively to avoid re-downloading and re-building dependencies from prior runs. | [cache.md](./cache.md) |
| Configuration files | Persistent project- and user-level configuration files (`pyproject.toml` / `uv.toml`). | [configuration-files.md](./configuration-files.md) |
| Externally defined environment variables | Externally defined environment variables that uv also reads, such as `HTTPS_PROXY`. | [environment-variables-external.md](./environment-variables-external.md) |
| Environment variables (UV_A-UV_M) | Environment variables from `UV_ASTRAL_MIRROR_URL` through `UV_MANAGED_PYTHON`. | [environment-variables-uv-a-m.md](./environment-variables-uv-a-m.md) |
| Environment variables (UV_N-UV_Z) | Environment variables from `UV_NATIVE_TLS` through `UV_WORKING_DIR`. | [environment-variables-uv-n-z.md](./environment-variables-uv-n-z.md) |
| Preview features | Opt-in preview features for community feedback before they are enabled for everyone. | [preview-features.md](./preview-features.md) |
| Settings: build and install | Caching, build, and installation settings from the uv settings reference. | [settings-build-install.md](./settings-build-install.md) |
| Settings: indexes and network | Index, network, TLS, and publishing settings from the uv settings reference. | [settings-index-network.md](./settings-index-network.md) |
| Settings: pip (a-l) | Settings for the `uv pip` CLI in `[tool.uv.pip]`, from `all-extras` to `link-mode`. | [settings-pip-a-l.md](./settings-pip-a-l.md) |
| Settings: pip (m-z) | Settings for the `uv pip` CLI in `[tool.uv.pip]`, from `no-annotate` to `verify-hashes`. | [settings-pip-m-z.md](./settings-pip-m-z.md) |
| Settings: project metadata | Project-specific `[tool.uv]` settings and the `[tool.uv.workspace]` table. | [settings-project-metadata.md](./settings-project-metadata.md) |
| Settings: Python and misc | Python installation, preview, version-requirement, and `[tool.uv.audit]` settings. | [settings-python-misc.md](./settings-python-misc.md) |
| Settings: resolver | Resolver-related settings from the Configuration section of the uv settings reference. | [settings-resolver.md](./settings-resolver.md) |
| Storage | Storage directories uv uses; XDG conventions on Linux and macOS, Known Folders on Windows. | [storage.md](./storage.md) |
| uv cache | Manage uv's cache. | [uv-cache.md](./uv-cache.md) |
| uv self | Manage the uv executable. | [uv-self.md](./uv-self.md) |
| uv generate-shell-completion and uv help | Generate shell completion scripts (`uv generate-shell-completion`) and show help (`uv help`). | [uv-shell-completion-help.md](./uv-shell-completion-help.md) |
