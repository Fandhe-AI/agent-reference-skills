# Suppressions

Disable Biome diagnostics for a single line, a range, or an entire file.

```javascript
// Inline: suppress next line only
// biome-ignore lint/suspicious/noDebugger: temporary debugging
debugger;

// File-level: suppress throughout the file (must be at top of file)
// biome-ignore-all lint/suspicious/noDebugger: test file

// Range: suppress a block of lines
// biome-ignore-start lint/suspicious/noDoubleEquals: legacy code
a == b;
c == d;
// biome-ignore-end lint/suspicious/noDoubleEquals: legacy code

// Suppress formatter for a single statement
// biome-ignore format: hand-formatted table
const matrix = [[1,0,0],[0,1,0],[0,0,1]];

// Suppress an entire category
// biome-ignore lint: third-party code
eval(code);
```

## Notes

- Syntax: `// biome-ignore <category>[/<group>[/<rule>]]: <reason>` — reason is required
- `biome-ignore-all` placed outside the file top triggers a `suppression/unused` diagnostic
- Range suppressions can be nested; each `biome-ignore-start` must have a matching `biome-ignore-end`
- Categories: `lint`, `assist`, `format`, `syntax`
