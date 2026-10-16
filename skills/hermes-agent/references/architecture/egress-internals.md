# Egress Proxy Internals

Architecture of the egress credential-injection firewall (`hermes egress`, iron-proxy) for contributors and plugin authors: module layout, lifecycle, security invariants and extension points.

## Signature / Usage

Lifecycle commands:

```text
hermes egress install
hermes egress setup [--from-bitwarden | --no-bitwarden] [--rotate-tokens]
hermes egress start
hermes egress stop
```

Adding a bearer-token provider (`_BEARER_PROVIDERS` in `agent/proxy_sources/iron_proxy.py`):

```python
_BEARER_PROVIDERS: Dict[str, Tuple[str, ...]] = {
    ...,
    "MY_PROVIDER_API_KEY": ("api.myprovider.com",),
}
```

Header-token provider (non-Authorization header such as `x-api-key`):

```python
_HEADER_AUTH_PROVIDERS: Dict[str, Dict[str, Tuple[str, ...]]] = {
    ...,
    "MY_PROVIDER_API_KEY": {
        "hosts": ("api.myprovider.com",),
        "match_headers": ("x-my-auth-header", "Authorization"),
        "aliases": (),
    },
}
```

Signature-auth (uncovered) providers:

```python
_NON_BEARER_PROVIDERS: Tuple[str, ...] = (
    ...,
    "MY_SIGNED_PROVIDER_ACCESS_KEY",
)
```

## Options / Props

Module layout:

| Path | Role |
|------|------|
| `pm/security_packages.py` | Pinned binary acquisition and publication through PM; release provenance staging |
| `agent/proxy_sources/iron_proxy.py` | Core: binary lookup, GPG checks, CA generation, config build, subprocess lifecycle, mappings I/O, PID/nonce defense |
| `hermes_cli/proxy_cli.py` | Wizard and slash command handlers for `hermes egress {install,setup,start,stop,status,disable,config}` |
| `hermes_cli/subcommands/egress.py:_dispatch_egress` | Subparser dispatcher, `dest='egress_command'` (disjoint from the OAuth `hermes proxy` with `dest='proxy_command'`) |
| `hermes_cli/config.py` | `proxy:` block in `DEFAULT_CONFIG` |
| `tools/environments/docker.py` | `_egress_proxy_args_for_docker()` and Docker-side merge / collision logic |

Filesystem permissions under `~/.hermes/proxy/`: directory `0o700`; `ca.key`, `proxy.yaml`, `mappings.json`, `iron-proxy.pid`, `iron-proxy.nonce`, `audit.log`, `iron-proxy.log` all `0o600`; `ca.crt` `0o644`.

## Notes

- Write paths use `os.open(O_WRONLY | O_CREAT | O_NOFOLLOW, 0o600)` plus an `os.fstat().st_uid` check; `shutil.copy2` + `os.chmod` is forbidden (default-umask window).
- `_build_proxy_subprocess_env` must not use `os.environ.copy()`; it uses `_PROXY_SUBPROCESS_ENV_ALLOWLIST` plus env names referenced by `load_mappings()`.
- Bind policy (`_default_http_listen`): Docker bridge gateway IP on Linux, loopback on macOS/Windows Docker Desktop, loopback fallback with a warning; never `0.0.0.0` or `:PORT`. On the pinned iron-proxy v0.39 schema `tunnel_listen` (CONNECT + MITM) binds `tunnel_port` and `http_listen` binds `tunnel_port + 1`; the Docker backend sets `HTTPS_PROXY` to `tunnel_port` and `HTTP_PROXY` to `tunnel_port + 1`. Liveness probes use the configured bind host.
- `metrics.listen` must be pinned to `127.0.0.1:0` (v0.39 defaults to `:9090`, colliding with the default `tunnel_port`).
- `_DEFAULT_UPSTREAM_DENY_CIDRS` covers loopback, link-local (incl. IMDS), RFC1918, IPv6 ULA, CGNAT and RFC2544; only an explicit empty list opts out.
- `ensure_audit_log` raises `RuntimeError` on `OSError`; on v0.39 `log.audit_path` does not exist, so `build_proxy_config` does not emit it and per-request records land in `iron-proxy.log`.
- Bitwarden mode (`credential_source: bitwarden`, `proxy.allow_env_fallback: false`) fails loud on a missing access token, project ID or secret values.
- With `enforce_on_docker: true`, `docker_env` overriding egress-controlling vars (HTTPS_PROXY, SSL_CERT_FILE, NODE_EXTRA_CA_CERTS, ...) or mapped `real_env_name` raises `RuntimeError` before the container starts.
- PID recycling defense: `_pid_alive` checks the in-process `_proxy_nonce` or on-disk `iron-proxy.nonce`; `stop_proxy` re-checks `/proc/<pid>/stat` starttime and suppresses SIGKILL on drift.
- `merge_mappings(existing, discovered, rotate=False)` preserves prior tokens; `--rotate-tokens` is the explicit opt-in. `cmd_setup` must not downgrade `credential_source: bitwarden` to `env` without `--no-bitwarden`.
- `aliases` only for interchangeable env-var names of the same credential. Also update `_DEFAULT_ALLOWED_HOSTS` when adding providers.
- A non-Docker backend needs its own analogue of `_egress_proxy_args_for_docker`: read `proxy` config, `get_status()`, `load_mappings()`, set the env vars (HTTPS_PROXY, NO_PROXY, REQUESTS_CA_BUNDLE, SSL_CERT_FILE, CURL_CA_BUNDLE, NODE_EXTRA_CA_CERTS, HERMES_EGRESS_PROXY, per-mapping `HERMES_PROXY_TOKEN_<NAME>`), distribute the CA cert and detect collisions.
- Audit events: tail line-delimited JSON in `~/.hermes/proxy/iron-proxy.log` on v0.39.
- Tests:

```bash
# Hermetic suite (no network, no real binary)
scripts/run_tests.sh tests/agent/test_iron_proxy.py tests/hermes_cli/test_iron_proxy_cli.py

# Live E2E (real binary, real curl, real CONNECT tunnel)
HERMES_RUN_E2E=1 scripts/run_tests.sh tests/agent/test_iron_proxy_e2e.py
```

## Related

- [Tools Runtime](./tools-runtime.md)
- [CLI Internals](./cli-internals.md)
