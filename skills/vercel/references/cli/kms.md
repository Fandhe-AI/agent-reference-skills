# vercel kms

Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens (beta).

## Signature / Usage

```bash
vercel kms list --scope my-team --json
vercel kms inspect iss_example --scope my-team --json
vercel kms list --scope my-team --limit 10 --next your_cursor_here --json
vercel kms create example-issuer --scope my-team --algorithm ES256
vercel kms import example-issuer --scope my-team --key ./private-key.pem
cat private-key.pem | vercel kms import example-issuer --scope my-team --key - --algorithm RS256
vercel kms update iss_example --scope my-team --name billing-tokens
vercel kms update iss_example --scope my-team --claims-schema '{"type":"object"}'
vercel kms update iss_example --scope my-team --remove-claims-schema
vercel kms add-key iss_example --scope my-team --activation manual
vercel kms activate-key iss_example key_example --scope my-team --revoke-previous-after-hours 24
vercel kms add-grant iss_example --scope my-team --project prj_example --environment production --environment preview
vercel kms update-grant iss_example prj_example --scope my-team --environment production
vercel kms update-grant iss_example prj_example --scope my-team --token-claims '{"aud":"https://example.com"}'
vercel kms update-grant iss_example prj_example --scope my-team --remove-token-claims
vercel kms remove-grant iss_example prj_example --scope my-team --yes
```

## Options / Props

| Command | Alias | Options |
|---------|-------|---------|
| `list` | `ls` | `--limit <NUMBER>` (`-n`), `--next <CURSOR>`, `--json` |
| `inspect <issuerId>` | `get` (deprecated) | `--json` |

| Option | Commands | Description |
|--------|----------|-------------|
| `--algorithm <ALGORITHM>` | `create`, `import` | One of `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `ES256`, `ES384`, `ES512`, `EdDSA`. Defaults to `RS512` for `create`. Required for imported RSA keys; otherwise derived from the imported key |
| `--claims-schema <JSON>` | `create`, `import`, `update` | JSON Schema that validates token claims. Accepts inline JSON, `@<file>`, or `@-` for stdin |
| `--remove-claims-schema` | `update` | Remove the claims schema (not with `--claims-schema`) |
| `--name` | `update` | Rename the issuer |
| `--key <FILE>` | `import`, `import-key` | Required PEM private key path, or `-` for stdin |
| `--key-id <KID>` | `import`, `import-key` | The imported key's JWKS `kid`. Defaults to a server-generated value |
| `--activation <MODE>` | `add-key`, `import-key` | `automatic` (default; waits for public key propagation) or `manual` (pending until `activate-key`) |
| `--revoke-previous-after-hours <HOURS>` | `add-key`, `import-key`, `activate-key` | Nonnegative hours the previous key keeps verifying after activation. Defaults to one hour; `0` retires it immediately |
| `--project <NAME_OR_ID>`, `-p` | `add-grant` | Project name or ID. Defaults to the linked project. `update-grant` takes the project ID as its second positional argument |
| `--environment <ENVIRONMENT>`, `-e` | `add-grant`, `update-grant` | Repeatable. `production`, `preview`, `development`, or a custom environment ID such as `env_example` (use IDs, not names) |
| `--token-claims <JSON>` | `add-grant`, `update-grant` | Claims included in signed tokens. Inline JSON object, `@<file>`, or `@-` |
| `--remove-token-claims` | `update-grant` | Remove the grant's token claims. Conflicts with `--token-claims` |
| `--json` | `list`, `inspect`, `create`, `import`, `update`, `add-key`, `import-key`, `activate-key`, `add-grant`, `update-grant` | Structured output (`--format=json` also accepted) |
| `--yes`, `-y` | `delete`, `revoke-key`, `remove-grant` | Confirm without a prompt; required in non-interactive mode |

### Destructive operations

| Command | Effect |
|---------|--------|
| `delete <issuerId>` | Delete the issuer and all its signing keys (aliases `rm`, `del`) |
| `revoke-key <issuerId> <keyId>` | End a retiring key's grace period and remove its public key from the issuer's JWKS |
| `remove-grant <issuerId> <projectId>` | Stop the project from signing new tokens with the issuer |

## Notes

- Sign in with `vercel login` or supply a Vercel access token. KMS management uses your account credentials, not the deployment OIDC token used for signing. Use `--scope` to select the issuer's team; in non-interactive mode pass it explicitly (`vercel kms list --scope my-team --non-interactive`)
- Issuer commands need no linked project. `vercel kms` without a subcommand runs `list`
- List limit defaults to 20, max 100. `pagination.next` null means no more pages
- Only team owners can see grants; an empty `policies` array can mean no grants or no permission to read them
- Pass private key material via file or stdin, not as an inline argument
- Key origin decides rotation: `add-key` for Vercel-generated issuers, `import-key` for imported ones; the CLI rejects mixing sources. Choose a grace period at least as long as the lifetime of tokens signed by the previous key. `revoke-key` only works on keys already scheduled for revocation; activate a replacement first
- `update-grant`: passed environments replace the previous selection; omitted fields stay unchanged; at least one change is required. `add-grant` requires at least one environment
- Deprecated forms: `remove`, `rm-grant`, `delete-grant`; use the names above
- Relying parties may retain cached public keys until they refresh the issuer's JWKS
- Non-interactive mode returns JSON on stdout with `status`, `message`, and suggested `next` commands; results include `issuers`/`pagination`, `issuer`, `signingKey`, `grant`. For example `vercel kms list --scope my-team --non-interactive | jq -r '.issuers[].id'`. `delete`, `revoke-key`, `remove-grant` use `--non-interactive --yes` and have no `--json`
- Source: https://vercel.com/docs/cli/kms (fetched 2026-11-14)

## Related

- [tokens.md](./tokens.md)
- [login.md](./login.md)
- [global-options.md](./global-options.md)
