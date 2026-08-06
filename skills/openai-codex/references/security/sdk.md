# Codex Security TypeScript SDK

Run Codex Security scans from TypeScript, select targets, inspect results, and manage scan lifecycle via `@openai/codex-security`. ESM, Node.js 22+ (scanning also requires Python 3.10+).

## Signature / Usage

```ts
import { CodexSecurity } from "@openai/codex-security";

const security = new CodexSecurity();

try {
  const result = await security.run("/path/to/repository", {
    outputDir: "/path/outside/repository/results",
  });

  console.log(result.reportPath);
  console.log(result.coverage.completeness);
  console.log(result.findings.findings.length);
} finally {
  await security.close();
}
```

`run` starts the scan, waits for completion, validates sealed artifacts, and returns a `ScanResult`. `close` releases the isolated runtime.

## Preflight

```ts
const plan = await security.preflight("/path/to/repository", {
  target: ["services/billing", "packages/auth"],
  outputDir: "/path/outside/repository/results",
});
```

Leaves the Codex runtime, credentials, and plugin/Python discovery untouched — useful for validating user input before a credentialed operation.

## Scan targets

```ts
// selected paths
await security.run(repo, { target: ["services/billing", "packages/auth"] });

// committed changes
const target = DiffTarget.refs({ base: "origin/main", head: "HEAD" });
await security.run(repo, { target });

// working tree
const wt = DiffTarget.workingTree({ base: "HEAD" });
await security.run(repo, { target: wt });

// deep mode (repository/path targets only)
await security.run(repo, { target: ["services/billing"], mode: "deep" });
```

## Options / Props

`ScanOptions` (selected):

| Name | Type | Description |
|------|------|-------------|
| `outputDir` | string | Private results directory outside the Git worktree |
| `target` | string[] \| DiffTarget | Paths or a diff/working-tree target |
| `mode` | `"standard"` \| `"deep"` | Scan mode |
| `knowledgeBasePaths` | string[] | Architecture/threat-model/policy files or directories (`.md`, `.markdown`, `.txt`, `.pdf`, `.docx`) |
| `maxCostUsd` | number | Estimated cost limit; throws `ScanCostLimitExceededError` when exceeded |
| `auth` | `"chatgpt"` \| `"api-key"` | Explicit credential selection |
| `archiveExisting` | boolean | Archive existing output directory before starting |
| `signal` | AbortSignal | Cancellation |
| `onScanStarted` / `onWorkerStatus` / `onReconnect` / `onCost` / `onOutputArchived` / `onOutputDirReady` / `onObserverError` | function | Lifecycle callbacks |

`ScanResult` (selected):

| Property | Contents |
|----------|----------|
| `manifest` | Sealed scan manifest |
| `findings` | Findings document (`findings.findings`) |
| `coverage` | Reviewed surfaces, exclusions, deferred work, completeness |
| `scanDir` / `reportPath` / `manifestPath` / `findingsPath` / `coveragePath` / `artifactsDir` / `sarifPath` | Artifact paths |
| `threadId` / `turnResult` | Codex task metadata |
| `cost` | Estimated cost or `null` |
| `pluginVersion` | Scan producer version |

`result.toJSON()` returns a JSON-ready object with manifest, findings, coverage, identifiers, `reportPath`, `artifactsDir`, `sarifPath`, and turn metadata.

## Runtime configuration and authentication

```ts
const security = new CodexSecurity({
  pluginPath: "/path/to/codex-security-plugin",
  pythonPath: "/path/to/python",
  codexOverrides: {
    model: "gpt-5.6-terra",
    model_reasoning_effort: "high",
  },
});
```

Auth methods: `loginApiKey(apiKey)`, `loginChatGPT()`, `loginChatGPTDeviceCode()`, `account()`, `logout()`. Default model is `gpt-5.6-sol` with `xhigh` reasoning effort. When both an API key and stored sign-in exist, the SDK uses the API key by default; pass `auth: "chatgpt"` to override.

## Notes

- Error classes to catch: `AuthenticationRequiredError`, `ConfigurationError`, `InvalidTargetError`, `OutputDirectoryError`, `OutputInsideProtectedRootError`, `PluginPythonUnavailableError`, `PluginBootstrapError`, `ScanCostLimitExceededError`, `IncompleteScanError`, `ContractValidationError`, `ScanInterruptedError`
- An interrupted scan can leave partial output in `scanDir` — preserve it for investigation
- Publicly available on GitHub at `github.com/openai/codex-security`; running scans requires Codex Security access
- For general coding agents (not security-specific), see the separate Codex SDK guide in `security-automation`

## Related

- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Codex Security CLI reference](./cli-reference.md)
- [Run Codex Security in CI](./cli-ci.md)
