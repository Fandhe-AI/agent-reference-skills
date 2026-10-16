# Vitest UI

Visual interface for exploring test results: a Live UI during watch mode, or a static HTML report for completed runs.

## Signature / Usage

```bash
npm i -D @vitest/ui
vitest --ui          # Live UI at http://localhost:51204/__vitest__/
```

```ts
// vitest.config.ts - static HTML report, keeping terminal output
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['html', ...configDefaults.reporters],
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `html` reporter `outputDir` | string | Artifact directory; entry is `<outputDir>/index.html` (default `.vitest`) |
| `html` reporter `singleFile` | boolean | Inline UI assets, metadata, and attachments into one portable `index.html` |

## Notes

- Live UI requires watch mode (default); it can rerun tests, update snapshots, and edit test files. Access is token-protected: open the URL with `?token=...` printed in the terminal if the plain URL errors.
- HTML report is read-only. Configuring `html` replaces the default terminal reporter.
- Preview locally: `npx vite preview --outDir .vitest`, or open `.vitest/index.html` in VS Code's Integrated Browser.
- `singleFile` caveats: file can grow very large; coverage HTML reports are not inlined.
- CI: upload `.vitest/` as an artifact and open it in Vitest Viewer via `https://viewer.vitest.dev/?url=<artifact-url>`; with `singleFile` upload `.vitest/index.html` with `archive: false`.

```yaml
- uses: actions/upload-artifact@v7
  id: upload-report
  with:
    name: vitest-report
    path: .vitest/
- name: Link HTML report
  run: echo "::notice title=Vitest HTML report::$REPORT_URL"
  env:
    REPORT_URL: https://viewer.vitest.dev/?url=${{ steps.upload-report.outputs.artifact-url }}
```

- Tags can be filtered by starting the UI filter with `tag:`. Coverage shows in both Live UI and HTML reports. With `browser.traceView` enabled the UI replays recorded browser interactions.
- Module Graph tab: shows the graph of the selected test file; with over 50 modules only the first two levels are shown ("Show Full Graph" expands); right-click or Shift+click expands a node; `node_modules` hidden by default ("Hide node_modules").
- Module Info (click a node): full module ID, "cached"/"not cached" badge when `fsModuleCache` is enabled, Self Time, Total Time, Transform time. Inlined modules additionally show Source, Transformed, and Source Map (v3). Imports slower than the `experimental.importDurations.thresholds` `danger` (default 500ms) show red, `warn` (default 100ms) orange. Type-only imports show no duration and cannot be opened.
- Import Breakdown: top 10 modules by Total Time (change with `experimental.importDurations.limit`).
- Integrations can use `vitest.experimental_getSourceModuleDiagnostic` to fetch module diagnostics.
- Source: https://vitest.dev/guide/ui (Vitest v5.0.5)

## Related

- [Extending Reporters](../advanced/extending-reporters.md)
- [Coverage](./coverage.md)
- [Profiling Test Performance](./profiling-test-performance.md)
