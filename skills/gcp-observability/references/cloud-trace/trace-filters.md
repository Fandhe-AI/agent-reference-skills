---
source: https://docs.cloud.google.com/trace/docs/trace-filters
---

# Trace filters

Filter expressions for the Cloud Trace API `list` method (v1). A filter is a sequence of terms and a trace must match all of them. These expressions do not apply to the Trace Explorer page.

## Signature / Usage

### Basic filter

```text
+span:/modules.GetNumInstances latency:1s
```

### Quoting

Simple values matching `[a-zA-Z0-9./_][a-zA-Z0-9./_-]*` need no quotes; others are enclosed in double quotes, with `"` and `\` escaped by a backslash.

```text
my-label:"Notice: This value contains spaces, a colon, a \"quote\", and a backslash (\\)"
```

### Mixed terms with a root-span term

```text
+^url:/main /images method:200
```

Matches when the root span label `/http/url` is exactly `/main`, the root span name starts with `/images`, and any span has label `/http/method` with value 200.

### Examples of single terms

```text
root:/_ah/
```

```text
latency:1s
```

```text
g.co/gae/app/module_version:2017
```

## Options / Props

| Term | Meaning |
|---|---|
| `root:[NAME_PREFIX]` | Root span name begins with the prefix; `[NAME_PREFIX]` alone is a shortcut |
| `+root:[NAME]` | Root span name is exactly NAME; `+[NAME]` is a shortcut |
| `span:[NAME_PREFIX]` | At least one span name begins with the prefix |
| `+span:[NAME]` | At least one span name is exactly NAME |
| `latency:[DURATION]` | Overall latency greater than or equal to DURATION; integer plus `s`, `ms` or `ns`; no unit means milliseconds (`12s 12000ms 12000000ns 12000` are equal) |
| `label:[LABEL_KEY]` | Trace contains the label key, any value |
| `[LABEL_KEY]:[VALUE_PREFIX]` | Label key exists and its value starts with the prefix |
| `+[LABEL_KEY]:[VALUE_EXACT]` | Label key and exact value |
| `method:[VALUE_PREFIX]` / `+method:[VALUE_EXACT]` | Shortcuts for `/http/method` label tests |
| `url:[VALUE_PREFIX]` / `+url:[VALUE_EXACT]` | Shortcuts for `/http/url` label tests |
| `^` before a term (after the optional `+`) | Restrict the term to the root span; `^span:` equals `root:`, `+^span:` equals `+root:` |

## Notes

- All string comparisons are case-sensitive. Boolean attributes use `true` / `false` (for example `Client:true`).
- Do not use `root`, `span`, `label`, `method`, `latency` or `url` as label keys: traces with these label keys cannot be queried.
- Complicated filters are slow and can time out; simplify them. No results: allow spaces only between terms, check case and spelling (a misspelled `method:GET` is read as `label:method:GET`), and test terms one at a time in the APIs Explorer of the `list` method.
- Source: https://docs.cloud.google.com/trace/docs/trace-filters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [finding-traces.md](./finding-traces.md)
