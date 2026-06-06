# --sanitize Flag

Pass API responses through a Model Armor template to scan for prompt injection before output.

## Signature / Usage

```bash
gws <service> <method> --sanitize "<PROJECT/LOCATION/TEMPLATE>"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--sanitize "<template_path>"` | string | Model Armor template resource path used to sanitize the response. |

## Environment Variables

| Variable | Values | Description |
|----------|--------|-------------|
| `GOOGLE_WORKSPACE_CLI_SANITIZE_TEMPLATE` | string | Default template path; used when `--sanitize` is not provided on the command line. |
| `GOOGLE_WORKSPACE_CLI_SANITIZE_MODE` | `warn` \| `block` | `warn` (default) logs a warning when sanitization triggers. `block` prevents the response from being output. |

## Notes

- `--sanitize` overrides `GOOGLE_WORKSPACE_CLI_SANITIZE_TEMPLATE` for that invocation.
- When `GOOGLE_WORKSPACE_CLI_SANITIZE_MODE` is `block`, the CLI suppresses the response and exits with a non-zero code if the template flags the content.
- The template path format follows Model Armor conventions: `projects/<project>/locations/<location>/templates/<template>`.

## Related

- [global-flags.md](./global-flags.md)
