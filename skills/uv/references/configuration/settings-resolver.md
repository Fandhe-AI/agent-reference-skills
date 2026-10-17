---
source: https://docs.astral.sh/uv/reference/settings/#configuration
---

# Settings: resolver

Resolver-related settings from the Configuration section of the settings reference. They apply in `[tool.uv]` of `pyproject.toml` or at the top level of `uv.toml`.

## Signature / Usage

```toml
# pyproject.toml
[tool.uv]
resolution = "lowest-direct"
prerelease = "allow"
exclude-newer = "2006-12-02T02:07:43Z"
```

```toml
# uv.toml
resolution = "lowest-direct"
prerelease = "allow"
exclude-newer = "2006-12-02T02:07:43Z"
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `add-bounds` | `"lower" \| "major" \| "minor" \| "exact"` | `"lower"` | Default version specifier when adding a dependency without a constraint or URL. `lower`: `>=1.2.3`; `major`: `>=1.2.3, <2.0.0`; `minor`: `>=1.2.3, <1.3.0`; `exact`: `==1.2.3`. With `--frozen`, no resolution is performed and dependencies are added without constraints. **In preview.** |
| `dependency-metadata` | `list[dict]` | `[]` | Pre-defined static metadata for dependencies (direct or transitive); the resolver uses it instead of querying the registry or building from source. Respected fields: `name`, optional `version` (omitted: applies to all versions), `requires-dist`, `requires-python`, `provides-extra`. |
| `exclude-newer` | `str \| false` | `None` | Limit candidates to those uploaded prior to the given date, compared against the upload time of each distribution artifact. Accepts RFC 3339 timestamps, "friendly" durations (`24 hours`, `1 week`, `30 days`), or ISO 8601 durations (`PT24H`, `P7D`, `P30D`). Durations resolve to a fixed number of seconds (day = 24 hours); months and years are not allowed. `false` disables. |
| `exclude-newer-package` | `dict` | `None` | Per-package `PACKAGE = "DATE"` cutoffs (same formats). Set a package to `false` to exempt it from the global `exclude-newer`. |
| `fork-strategy` | `"fewest" \| "requires-python"` | `"requires-python"` | How to select multiple versions of a package across Python versions and platforms. `requires-python`: latest supported version for each supported Python version. `fewest`: fewest versions per package, preferring older versions compatible with a wider range. |
| `no-sources` | `bool` | `false` | Ignore the `tool.uv.sources` table when resolving, to lock against standards-compliant, publishable metadata instead of local or Git sources. |
| `no-sources-package` | `list[str]` | `[]` | Ignore `tool.uv.sources` for the specified packages. |
| `prerelease` | `"disallow" \| "allow" \| "if-necessary" \| "explicit" \| "if-necessary-or-explicit"` | `"if-necessary"` | Pre-release strategy. `if-necessary`: prefer stable, fall back to pre-releases. `explicit`: prefer stable for first-party packages with explicit pre-release specifiers; disallow pre-releases for all others. `if-necessary-or-explicit`: deprecated alias for `if-necessary`. |
| `prerelease-package` | `dict` | `{}` | Pre-release mode per package (package-specific modes take precedence over `prerelease`). |
| `resolution` | `"highest" \| "lowest" \| "lowest-direct"` | `"highest"` | Strategy for selecting between compatible versions. `lowest-direct`: lowest for direct dependencies, highest for transitive. |
| `torch-backend` | `str` | `null` | Backend for fetching PyTorch-ecosystem packages. When set, uv ignores configured index URLs for those packages (e.g., `cpu`, `cu126`; `auto` detects from installed CUDA drivers). Only respected by `uv pip` commands. **In preview.** |
| `upgrade` | `bool` | `false` | Allow package upgrades, ignoring pinned versions in any existing output file. |
| `upgrade-package` | `list[str]` | `[]` | Allow upgrades for a specific package. Accepts package names (`ruff`) and specifiers (`ruff<0.5.0`). |

Examples from the reference:

```toml
[tool.uv]
add-bounds = "major"
dependency-metadata = [
    { name = "flask", version = "1.0.0", requires-dist = ["werkzeug"], requires-python = ">=3.6" },
]
exclude-newer-package = { tqdm = "2022-04-04T00:00:00Z", markupsafe = false }
fork-strategy = "fewest"
prerelease-package = { numpy = "allow", scipy = "disallow" }
torch-backend = "auto"
```

Independent alternatives (do not combine the global and per-package forms):

```toml
[tool.uv]
no-sources = true
```

```toml
[tool.uv]
no-sources-package = ["ruff"]
```

```toml
[tool.uv]
upgrade = true
```

```toml
[tool.uv]
upgrade-package = ["ruff"]
```

## Notes

- `add-bounds` and `torch-backend` are in preview and may change in any future release.
- `torch-backend` selects a PyTorch wheel index only; it does not configure GPU programming (see nvidia-cuda, amd-rocm).
- A matching `[tool.uv.pip]` variant exists for `uv pip` (see the pip settings pages).

## Related

- [Settings: indexes and network](./settings-index-network.md)
- [Settings: project metadata](./settings-project-metadata.md)
- [Settings: pip (a-l)](./settings-pip-a-l.md)
