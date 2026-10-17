---
source: https://docs.astral.sh/uv/concepts/authentication/
---

# Authentication

Authentication is required when working with private repositories or package indexes. This page is the entry point to uv's authentication topics.

## Signature / Usage

```console
$ uv auth login example.com
```

## Topics

| Topic | Page |
|-------|------|
| Using the `uv auth` CLI | [auth-cli.md](./auth-cli.md) |
| HTTP authentication | [http-credentials.md](./http-credentials.md) |
| Git authentication | [git-credentials.md](./git-credentials.md) |
| TLS certificates | [certificates.md](./certificates.md) |
| Third-party services | [third-party-services.md](./third-party-services.md) |

## Notes

- This covers credentials for package registries and Git repositories used by uv, not application-level authentication (see better-auth / supabase for those).

## Related

- [The auth CLI](./auth-cli.md)
- [Package indexes](./indexes.md)
