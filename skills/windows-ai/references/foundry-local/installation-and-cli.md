# Foundry Local CLI

Command-line interface for installing Foundry Local and managing models, the local service, and the model cache. The CLI is in preview.

## Signature / Usage

```bash
# Install (Windows)
winget install Microsoft.FoundryLocal

# Verify
foundry --version
foundry --help

# Run a model interactively (downloads it first if not cached)
foundry model run qwen2.5-0.5b
```

## Options / Props

Model commands:

| Command | Description |
|---|---|
| `foundry model --help` | Show all model-related commands. |
| `foundry model run <model>` | Runs a model, downloading it first if not cached, and starts an interactive session. |
| `foundry model list` | Lists all available models. On first run, downloads execution providers (EPs) for the local hardware. |
| `foundry model list --filter <key>=<value>` | Filters the list by `device`, `provider`, `task`, or `alias`. Supports `!` negation and `*` wildcard (alias only). |
| `foundry model info <model>` | Shows detailed info about a model. |
| `foundry model info <model> --license` | Shows license information for a model. |
| `foundry model download <model>` | Downloads a model to the local cache without running it. |
| `foundry model load <model>` | Loads a model into the service. |
| `foundry model unload <model>` | Unloads a model from the service. |

Service commands:

| Command | Description |
|---|---|
| `foundry service --help` | Show all service-related commands. |
| `foundry service start` | Starts the Foundry Local service. |
| `foundry service stop` | Stops the Foundry Local service. |
| `foundry service restart` | Restarts the service (fixes port-binding/connection errors). |
| `foundry service status` | Shows service status and its local endpoint. |
| `foundry service ps` | Lists models currently loaded in the service. |
| `foundry service diag` | Shows service logs. |
| `foundry service set <options>` | Sets service configuration. |

Cache commands:

| Command | Description |
|---|---|
| `foundry cache --help` | Show all cache-related commands. |
| `foundry cache location` | Shows the current cache directory. |
| `foundry cache list` | Lists all models stored in the local cache. |
| `foundry cache cd <path>` | Changes the cache directory. |
| `foundry cache remove <model>` | Removes a model from the local cache. |

## Notes

- You can pass a model **alias** (auto-selects the best variant for available hardware, for example a CUDA build on an NVIDIA GPU or an NPU build on a supported NPU) or a specific **model ID** (for example `qwen2.5-0.5b-instruct-generic-cpu`) to force a hardware variant.
- Install on macOS with `brew tap microsoft/foundrylocal && brew install foundrylocal`.
- Upgrade: `winget upgrade --id Microsoft.FoundryLocal` (Windows) / `brew upgrade foundrylocal` (macOS). Uninstall: `winget uninstall Microsoft.FoundryLocal` / `brew rm foundrylocal`.
- If commands fail with `Request to local service failed`, run `foundry service restart`.
- Filtering supports one key per command; comparisons are case-insensitive; unrecognized filter keys error.
- The `foundry model run`/`list`/`load` commands drive the same service that the REST API and SDK talk to; `foundry service status` prints the dynamic port used by the REST endpoint.
- Namespace: `foundry` CLI is distinct from the Windows `winget` package manager CLI itself (used only to install/upgrade Foundry Local).

## Related

- [Foundry Local REST API](./rest-api.md)
- [Cache Management](./cache-management.md)
- [Model Catalog and Hardware Variants](./model-catalog.md)
