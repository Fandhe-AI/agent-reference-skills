# Cache Management

Downloaded, compiled model files are stored in a local on-disk cache so they run offline and don't need to be re-downloaded on subsequent launches. The CLI and the SDK expose equivalent cache operations.

## Signature / Usage

```bash
foundry cache location
foundry cache list
foundry cache cd /custom/path/to/cache
foundry cache remove qwen2.5-0.5b
```

## Options / Props

| CLI command | SDK equivalent (Python legacy) | Description |
|---|---|---|
| `foundry cache location` | `manager.get_cache_location()` | Shows/returns the local cache directory path. |
| `foundry cache list` | `manager.list_cached_models()` | Lists all models currently stored in the local cache. |
| `foundry cache cd <path>` | `Configuration(model_cache_dir=...)` / `config.Web.Urls` (current SDK) | Changes/sets the cache directory. |
| `foundry cache remove <model>` | — (no direct SDK method; use CLI) | Removes a model from the local cache. |
| — | `manager.download_model(alias, force=False)` / `DownloadModelAsync` | Downloads a model to cache (skips if already cached; `force=True` re-downloads). |

## Notes

- Cache is populated on first use (`foundry model run`/`download`, or SDK `download_model`/`DownloadAsync`) and persists across restarts; only the initial download requires network access.
- The current (non-CLI-dependent) SDK sets the cache directory via `Configuration(model_cache_dir=...)` (Python) / `FoundryLocalConfig::with_model_cache_dir(...)` (Rust) at manager creation time, instead of the legacy `foundry cache cd` command.
- Combine with `foundry model info <model>` or `GetModelInfoAsync`/`get_model_info` to inspect a cached model's metadata (size via `fileSizeMb`, execution provider, etc.) before removing it.

## Related

- [Foundry Local CLI](./installation-and-cli.md)
- [Foundry Local SDK](./sdk.md)
- [Model Catalog and Hardware Variants](./model-catalog.md)
