---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-audit
---

# uv tool audit

Audit installed tools and their dependencies. Auditing requires network access and cannot be performed in offline mode.

## Signature / Usage

```
uv tool audit [OPTIONS] <NAME>...
```

```console
$ uv tool audit --all --output-format json
```

Argument `NAME`: the names of the installed tools to audit.

## Options / Props

| Name | Value | Description |
| --- | --- | --- |
| `--all` | | Audit all installed tools |
| `--ignore` | ignore | Ignore a vulnerability by ID. Vulnerabilities matching any of the provided IDs (including aliases) are excluded from the audit results. May be provided multiple times. |
| `--ignore-until-fixed` | ignore-until-fixed | Ignore a vulnerability by ID, but only while no fix is available. Once a fix version becomes available, the vulnerability is reported again. May be provided multiple times. |
| `--output-format` | output-format | Select the output format. Default `text`; possible values `text`, `json`, `sarif`. |
| `--service-format` | service-format | The service format to use for vulnerability lookups. Default `osv` (default URL <https://api.osv.dev/>); only `osv` is listed. |
| `--service-url` | service-url | The URL to the vulnerability service API endpoint. If not provided, the default URL for the selected service is used. The service must use the OSV protocol unless a different format was requested by `--service-format`. |

## Notes

- Global options are listed in uv.md (project-commands).
- Preview: the `audit-command` preview feature covers `uv audit` and `uv tool audit`. Tool audits use the lockfiles recorded by the `tool-install-locks` preview feature; enabling both features silences the preview warning for `uv tool audit`.

## Related

- [Tools](./tools.md)
- [uv tool list](./uv-tool-list.md)
