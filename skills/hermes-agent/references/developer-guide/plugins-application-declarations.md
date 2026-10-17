# Application declarations

A plugin whose MCP server fronts a desktop application declares which application that is and what the server needs of it. The core evaluates the declaration on the host and gates the server's tools, and any skill that names the application, on the answer.

## Signature / Usage

```python
from hermes_platform import declaration

decl = declaration.parse_declaration(
    "my-server",
    raw_app={"linux": {"presence": "executable", "location": "/opt/my-app/server"}},
    raw_requires={"app": True},
    where="my-plugin/plugin.yaml",   # human label used in error messages
)
declaration.register("my-server", decl)
```

```yaml
app:
  win32:
    presence: executable
    location: "%ProgramFiles%/Vendor/Vendor App/McpServer/Server.exe"
    version: { kind: uninstall_registry, display_name_prefix: "Vendor App" }
    liveness:
      kind: server_json
      path: "%LOCALAPPDATA%/Vendor/Vendor App/McpServer/server.json"
      pid_key: pid
      url_key: http
      token_key: token
      endpoint_path: /mcp
  darwin:
    presence: bundle
    location: /Applications/Vendor.app
    version: { kind: plist }
requires:
  app: true
  min_version: "2.3.0"
```

## Options / Props

`app.<os>` fields:

| Field | Type | Rule |
|-------|------|------|
| `<os>` | `win32` \| `darwin` \| `linux` | At least one; unknown key is an error |
| `presence` | `executable` \| `bundle` | Required per OS |
| `location` | str \| list | Required. Drive-rooted path on Windows, or starts with `~` / `%VAR%` / `$VAR`; UNC paths rejected; no `..`, `**` or URL scheme. List holds paths and location-kind mappings; first present wins (with `requires.min_version`, first copy that qualifies) |
| `version.kind` | `pe_resource` \| `plist` \| `uninstall_registry` \| `none` | Default `none`; `pe_resource` / `uninstall_registry` only under `win32`, `plist` only under `darwin` |
| `version.display_name_prefix` | str | Required when `uninstall_registry` |
| `liveness.kind` | `server_json` \| `none` | Default `none` |
| `liveness.path` | str | Required when `server_json` |
| `liveness.pid_key` / `url_key` / `token_key` | str | Defaults `pid` / `http` / `token` |
| `liveness.endpoint_path` | str | Default `/mcp`; path used for `initialize` |

Location kinds:

| Kind | OS | Key | Where it looks |
|------|----|-----|----------------|
| (path string) | any | — | That path; `*` stands for a versioned folder, highest first |
| `command` | any | `name` | `PATH` (`executable` only) |
| `uninstall_registry` | win32 | `display_name_prefix`, `file` | `InstallLocation` of matching uninstall entries joined with `file` |
| `app_bundle` | darwin | `name` | `/Applications`, then `~/Applications` (`bundle` only) |
| `flatpak` | linux | `app_id` | System, then per-user flatpak `exports/bin` |
| `snap` | linux | `name` | `/snap/bin` |

`requires` fields:

| Field | Type | Rule |
|-------|------|------|
| `app` | bool | When true, `app:` must exist and the server is gated on presence |
| `min_version` | str | Requires `app: true`; dotted numeric, compared per segment (non-numeric characters dropped; prerelease suffixes not ordered). Every `win32` / `darwin` entry must declare a real `version.kind`; Linux may omit it |
| `gpu` | str | `nvidia`; server offered only where `hermes_platform.host.facts.gpu_class()` reports that vendor. Independent of `app` |

Availability states (`hermes_platform/resolver/availability.py::availability(decl)`): `available`, `installed_not_running` (reserved, never produced), `missing_app`, `version_too_old`, `unsupported_os`, `unsupported_gpu`, `no_requirements`.

## Notes

- `register(server_name, decl)` stores one declaration in a process-local registry; core does not read plugin YAML automatically. Registrations are process-wide, not profile-scoped; `clear()` removes all.
- An unregistered MCP server keeps its connection-only check. A skill that names an unregistered server is hidden (fail closed).
- `requires.app: true` with no `app:` block is a `DeclarationError`; an OS missing from `app:` gives `unsupported_os`.
- `gpu_class()` reads the registry on Windows, sysfs on Linux, CPU architecture on macOS; when it cannot read the GPU (`unknown`) the requirement passes.
- Evaluation never probes a server, launches an application or connects.
- Two gates: MCP `check_fn` (`tools/mcp_tool_handlers.py::_make_check_fn`, connection alive AND `availability(decl).offerable`) and skill `requires_apps:` frontmatter (`agent/skill_utils.py::skill_matches_apps`).
- Source: developer-guide/plugins/application-declarations (v0.22.2 snapshot).

## Related

- [Build a Hermes Plugin](./plugins.md)
- [Submitting to the Plugin Catalog](./plugins-catalog-submission.md)
