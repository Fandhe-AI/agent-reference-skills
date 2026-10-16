---
source: https://docs.astral.sh/uv/concepts/authentication/cli/
---

# The auth CLI

uv provides a high-level interface (`uv auth`) for storing and retrieving credentials from services.

## Signature / Usage

```console
$ uv auth login example.com
```

This prompts for the credentials. Credentials can also be provided with `--username` and `--password`, or `--token` for services which use a `__token__` or arbitrary username.

Providing the secret via stdin is recommended. Use `-` to read the value from stdin:

```console
$ echo 'my-password' | uv auth login example.com --password -
```

The same pattern can be used with `--token`.

## Logging in to a service

Once credentials are added, uv uses them for packaging operations that require fetching content from the given service. At this time, only HTTPS Basic authentication is supported. The credentials are not yet used for Git requests. Credentials are not validated, i.e., incorrect credentials will not fail.

## Logging out of a service

```console
$ uv auth logout example.com
```

Credentials are not invalidated with the remote server; they are only removed from local storage.

## Showing credentials for a service

```console
$ uv auth token example.com
```

If a username was used to log in, it must be provided as well:

```console
$ uv auth token --username foo example.com
```

## Using credentials with external tools

`uv auth helper` allows tools that support credential helpers to request HTTP credentials from uv. At this time, uv supports the Bazel credential helper protocol. The command is intended to be invoked by external tools: it reads a JSON request from stdin and writes a JSON response to stdout. When matching credentials are available, the response includes the `Authorization` header:

```console
$ echo '{"uri": "https://example.com/path"}' | uv --preview-features auth-helper auth helper --protocol=bazel get
{"headers":{"Authorization":["Basic ..."]}}
```

If no credentials are found, uv returns an empty set of headers:

```json
{ "headers": {} }
```

## Configuring the storage backend

Credentials are persisted to the uv credentials store. By default, credentials are written to a plaintext file. An encrypted system-native storage backend can be enabled with `UV_PREVIEW_FEATURES=native-auth`.

## Notes

- `uv auth helper` is experimental. Use `--preview-features auth-helper` or `UV_PREVIEW_FEATURES=auth-helper` to disable the warning. It is not listed under the `uv auth` subcommands in the CLI reference (login / logout / token / dir).
- The `native-auth` storage backend is a preview feature.
- These commands manage package-registry credentials, not application authentication; for app auth see better-auth / supabase.

## Related

- [uv auth login](./uv-auth-login.md)
- [uv auth logout](./uv-auth-logout.md)
- [uv auth token](./uv-auth-token.md)
- [uv auth dir](./uv-auth-dir.md)
- [HTTP credentials](./http-credentials.md)
