---
source: https://docs.cloud.google.com/sdk/docs/enabling-accessibility-features
---

# Enabling accessibility features

The gcloud CLI has an `accessibility/screen_reader` property for a more streamlined screen reader experience.

## Signature / Usage

```bash
gcloud config set accessibility/screen_reader true
```

When the property is true:

- Status trackers instead of unicode spinners: the phrase 'working' is displayed on stderr while gcloud performs tasks.
- Percentage progress bars: progress is displayed as a percentage on stderr.
- Flattened tables: instead of Unicode-drawn boxed tables (the default output of many list commands), results are rendered as a flattened list of items. Consider also using `--format` to define your own format.

### Refining gcloud CLI output

- `--verbosity`: debug, info, warning, error, critical, or none.
- List commands: `--limit` (maximum resources), `--page-size` (resources per page if the service pages output), `--sort-by` (field to sort by).
- `--quiet` disables interactive prompting.
- `--format` for tabulated/flattened output or machine-readable output (json, csv, yaml, value); projections to format a list of keys selecting resource data values; `--filter` to refine by criteria.
- To search the reference docs for a keyword or command, use `gcloud help` (searches all commands with matching help text).

### Filing feedback

`gcloud feedback` opens the public issue tracker in a browser window. You can also log issues directly at https://issuetracker.google.com/issues/new?component=187143 and set the 'Type' field (Bug, Feature Request, etc.).

```bash
gcloud feedback
```

Snippet taken from the prose of this page (the command is named in the "Filing feedback" section).

## Notes

- The Windows installer exposes this as the **Turn on screen reader mode** checkbox or the `/screenreader` flag; `install.sh` accepts `--screen-reader=true` (see downloads-interactive and downloads-versioned-archives).
- Source: https://docs.cloud.google.com/sdk/docs/enabling-accessibility-features (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-sdk.md](./install-sdk.md)
- [downloads-interactive.md](./downloads-interactive.md)
- [getting-support.md](./getting-support.md)
