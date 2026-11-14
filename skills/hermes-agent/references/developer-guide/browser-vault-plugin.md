# Browser Vault Plugins

A plugin from a verified source can add a password manager as a login source for the `browser_vault` tool with `ctx.register_login_backend`; the agent sees handles and metadata, never a password.

## Signature / Usage

An in-process plugin subclasses `agent.vault_backends.base.LoginBackend` and registers one instance:

```python
from agent.vault_backends.base import LoginBackend
from agent.vault_store import VaultItemMeta


class KeePassBackend(LoginBackend):
    name = "keepass"            # lowercase identifier; also the config key
    prefix = "keepass:"         # must be exactly "<name>:"
    display_name = "KeePass"

    def list_items(self) -> list[VaultItemMeta]:
        ...  # metadata only: ids "keepass:<opaque>", exact HTTPS origins, identifier

    def get_meta(self, handle: str) -> VaultItemMeta | None:
        ...

    def resolve_password(self, handle: str) -> str:
        ...  # called once per fill, after the page origin matched the item


def register(ctx):
    ctx.register_login_backend(KeePassBackend())
```

The backend stays off until the user enables it for the profile:

```yaml
vault:
  keepass:
    enabled: true   # exactly true; installed code is never enabled automatically
```

A plugin browser with no CDP endpoint (for example Camofox, which uses its own REST server) registers a page backend instead:

```python
from agent.browser_page_backend import BrowserPageBackend


class MyBrowserPages(BrowserPageBackend):
    name = "mybrowser"

    def has_page(self, task_id: str) -> bool:
        ...  # True when this task already has a live tab here; never open one to answer

    def evaluate(self, task_id: str, expression: str, *, secret: bool):
        ...  # run the script on that tab and return its value; raise on failure


def register(ctx):
    if hasattr(ctx, "register_browser_page_backend"):  # older cores lack the seam
        ctx.register_browser_page_backend(MyBrowserPages())
```

## Options / Props

Isolation rules (Hermes wraps every plugin backend in a core-owned adapter):

| Rule | Meaning |
|---|---|
| Own namespace only | Handles are `<name>:...`; ids outside it are dropped; Hermes never calls `owns()` and never passes you another backend's handle |
| Handle in, value out | `list_items()` takes no arguments; `get_meta()`, `resolve_password()`, `resolve_otp()`, `resolve_secret()` get your handle only; no page, CDP session, task or other backend's data |
| No master-password prompt | `needs_unlock = True` is refused at registration; the `unlock` action is never offered for plugin backends |
| Reserved namespaces | `local`, `onepassword`, `bitwarden`, `vault`, `op`, `bw`, any built-in prefix, and names already held by another plugin are refused; `name` / `prefix` must be plain string attributes; no `__getattribute__` / `__class__` override |
| Off by default | Only `vault.<name>.enabled: true` enables a backend |
| In-process only | Refused under `plugins.isolation: host` (`fill_context()` is a server-local context manager) |
| Same fill path | Exact-origin pre-check, in-page origin re-assertion, supervisor CDP secret evaluation (never argv) and payment confirmation as built-in items |
| Secrets stay out of the conversation | Returned values are registered with the redaction boundary; any exception becomes the fixed message `The <name> login backend failed.`; wrong-typed values are refused the same way |

## Notes

- Who can register: `ctx.register_login_backend` is accepted only from a plugin bundled with Hermes, or installed from the Hermes plugin catalog at `tier: verified` (published by the manager's vendor) or `tier: official` (maintained by Nous) at the reviewed pin. Hand-dropped plugins in `~/.hermes/plugins/`, Git URL installs, community-tier entries, installs moved off the pin with `--ref` or installed with `--allow-removed`, project plugins and pip entry-point plugins are refused with a log line. Provenance comes from `plugins/.install-metadata.json`, never from a file inside the plugin; no config key relaxes the rule. To get listed, submit to the catalog and ask for `verified` tier (catalog admission rule 18).
- Browser login backends are separate from secret sources: a `SecretSource` registration does not make a manager available to `browser_vault`.
- Construct the backend without fetching credentials or reading profile state; read the active profile's config lazily. Registration is profile-scoped and removed when the plugin unloads.
- `fill_context()` defaults to a no-op; a backend may return a context manager that locks fills and freezes credential-reference/origin config for the operation. Hermes enters it only for fills of your own handles, after the page origin matched `get_meta()`, calls `get_meta()` again inside it, and exits with `(None, None, None)`. Release on exit even when the fill failed.
- Raise exceptions with fixed diagnostics; never put credential values or response bodies in them. Never expose a model-facing tool that returns a password.
- Page backends: when `has_page(task_id)` is true, the vault reads the origin, inspects the form and writes the password through `evaluate` instead of CDP. A `secret=True` script arrives wrapped; send it only over loopback or HTTPS, never follow a redirect with it, never log it. The same provenance rule applies and registration is refused under `plugins.isolation: host`.
- These rules are an API contract, not a sandbox: an in-process plugin is ordinary Python.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/browser-vault-plugin (pinned to v0.23.1)

## Related

- [Secret Source Plugins](./secret-source-plugin.md)
- [Browser Provider Plugins](./browser-provider-plugin.md)
- [Plugin catalog submission](./plugins-catalog-submission.md)
