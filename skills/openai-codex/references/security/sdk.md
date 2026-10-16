# Codex Security TypeScript SDK

Run Codex Security scans on repositories and code changes from TypeScript via `@openai/codex-security`. The SDK returns typed findings, coverage details, and paths to scan artifacts, and supports preflight checks, cost limits, progress callbacks, and cancellation. ESM; runs server-side on Node.js 22 (22.13.0 or later), 24, or 26; scanning also requires Python 3.10+ (3.10 needs `tomli`). Running scans requires Codex Security access. For best results use an account verified for Trusted Access for Cyber (signing in or providing an API key doesn't grant it).

## Signature / Usage

```bash
npm install @openai/codex-security
```

Before a scan set `OPENAI_API_KEY` or `CODEX_API_KEY`, use an existing file-backed Codex sign-in, or configure another provider (Amazon Bedrock uses AWS credentials; OpenRouter and Fireworks use provider API keys and configuration). The SDK runs with your local operating-system permissions and doesn't pause for approval; scan processes can inherit your environment.

```ts
import { CodexSecurity } from "@openai/codex-security";

const security = new CodexSecurity();

try {
  const result = await security.run("/path/to/repository", {
    outputDir: "/path/outside/repository/results",
  });

  console.log(result.reportPath);
  console.log(result.manifest.scan.status);
  console.log(result.findings.findings.length);
} finally {
  await security.close();
}
```

`run` starts the scan, waits for completion, validates the saved artifacts, and returns a `ScanResult` when `result.manifest.scan.status` is `"completed"` (a completed scan can still have coverage gaps; runtime, input, or result-integrity failures can throw). `close` releases the isolated runtime.

Preflight:

```ts
const plan = await security.preflight("/path/to/repository", {
  target: ["services/billing", "packages/auth"],
  knowledgeBasePaths: ["/path/to/architecture.md"],
  outputDir: "/path/outside/repository/results",
});
```

Scan targets:

```ts
await security.run(repo, { target: ["services/billing", "packages/auth"] });   // selected paths
const target = DiffTarget.refs({ base: "origin/main", head: "HEAD" });         // committed changes (head defaults to HEAD)
await security.run(repo, { target });
const wt = DiffTarget.workingTree({ base: "HEAD" });                            // staged and unstaged vs base (default HEAD)
await security.run(repo, { target: wt });
await security.run(repo, {
  target: ["services/billing"], mode: "deep",
  workers: 2, subagents: 0, stopAfterNoNew: 3, maxDiscoveryRuns: 10, maxTimeHours: 1.5,
});
```

Runtime configuration:

```ts
const security = new CodexSecurity({
  pluginPath: "/path/to/codex-security-plugin",
  pythonPath: "/path/to/python",
  codexOverrides: {
    model: "gpt-6.1-sol",
    model_reasoning_effort: "medium",
  },
});
```

## Options / Props

`ScanOptions` (selected):

| Name | Type | Description |
|------|------|-------------|
| `outputDir` | string | Private results directory outside the enclosing Git worktree (omitted: persistent state directory) |
| `target` | string[] \| DiffTarget | Paths or a diff/working-tree target; default is the complete repository |
| `mode` | `"standard"` \| `"deep"` | Scan mode; deep supports repository and path targets only |
| `workers` / `subagents` / `stopAfterNoNew` / `maxDiscoveryRuns` / `maxTimeHours` | number | Deep-mode settings (require `mode: "deep"`); `maxTimeHours` defaults to `96`, accepts fractions up to `96` |
| `knowledgeBasePaths` | string[] | Architecture/threat-model/policy files or directories (`.md`, `.markdown`, `.txt`, `.pdf`, `.docx`); directories searched recursively; linked inputs rejected |
| `scanPrompt` / `postScanPrompt` | string | Focus the scan / request a follow-up (a failing follow-up keeps the completed scan, reports via `onWarning`, and restores artifacts it changed) |
| `maxCostUsd` | number | Estimated cost limit (not a hard cap); can return a completed result with a budget warning for deep scans, otherwise throws `ScanCostLimitExceededError` |
| `auth` | `"chatgpt"` \| `"api-key"` | Explicit credential selection (also accepted by `preflight`) |
| `archiveExisting` | boolean | Archive an existing output directory before starting |
| `expectedPluginVersion` | string | Reject the scan if the installed plugin version differs (e.g. `result.pluginVersion`) |
| `signal` | AbortSignal | Cancellation |

Callbacks: `onAuthentication`, `onOutputArchived(archiveDir)`, `onOutputDirReady(scanDir)`, `onScanStarted`, `onTrustedAccessStatus` (`granted` / `not_granted` / `unknown`; missing or unknown also triggers `onWarning`), `onReconnect(attempt, maxAttempts)`, `onActivity`, `onProgress` (`phase`, `filesCompleted`, `filesTotal`), `onWorkerStatus`, `onSessionEvent` (not redacted; may contain source code or credentials), `onCost` (`estimatedUsd`), `onWarning`, `onObserverError`.

`ScanResult` (selected):

| Property | Contents |
|----------|----------|
| `manifest` | Sealed scan manifest (target, scope, producer, artifact records; `manifest.scan.status`) |
| `findings` | Findings from the current scan (`findings.findings`; optional `codeEvidence`, `rootCause`, `validation`, `attackPath`, `remediationTests`, `preventiveControls`) |
| `repositoryFindings` | Open findings across repository scans, when scan history is available (`confirmedInLatestScan`) |
| `coverage` | Reviewed surfaces, exclusions, deferred work, open questions |
| `scanDir` / `reportPath` / `manifestPath` / `findingsPath` / `coveragePath` / `artifactsDir` / `sarifPath` | Artifact paths (`sarifPath` is `null` when absent) |
| `threadId` / `turnResult` | Codex task metadata |
| `cost` | Estimated model and token cost or `null` |
| `pluginVersion` | Scan producer version |

`result.toJSON()` returns manifest, repository and current-scan findings, coverage, identifiers, `reportPath`, `artifactsDir`, `sarifPath`, cost, and turn metadata.

Authentication methods: `loginApiKey(apiKey)`, `loginChatGPT()`, `loginChatGPTDeviceCode()` (login handle: `waitForInstructions`, `authUrl`, `verificationUrl`, `userCode`, `wait`, `cancel`), `account()`, `logout()`.

## Notes

- Preflight checks local inputs (repository, target, mode, knowledge base, output location, Codex configuration) without starting Codex, loading credentials, or checking Python and plugin availability; a successful preflight doesn't prove the scan can authenticate or start. With `archiveExisting: true` the returned `archiveDir` previews naming; capture the real path with `onOutputArchived`.
- Cost limits: if a deep scan reaches `maxCostUsd` after aggregating completed worker results, `run` can return `manifest.scan.status` `"completed"` with the budget warning via `onWarning` (check `result.coverage` for unfinished work); if it can't produce a valid completed result it throws `ScanCostLimitExceededError` and preserves any output.
- Defaults: scans use `gpt-5.6-sol` with extra-high reasoning effort; set `model` and `model_reasoning_effort` in `codexOverrides` for another model (choose one your credentials can access; check GPT-6.1 Sol availability with ChatGPT sign-in). For Amazon Bedrock set `model_provider` and `model` in `codexOverrides`. For OpenRouter/Fireworks also provide the API key and a complete provider configuration (`model_provider`, `model_providers.<id>` with `name`, `base_url`, `env_key`, `wire_api: "responses"`; Fireworks: `name` `Fireworks AI`, `env_key` `FIREWORKS_API_KEY`, `base_url` `https://api.fireworks.ai/inference/v1`). `codexOverrides` can't restrict the scan's filesystem access or change its approval policy.
- When both an API key and a stored sign-in exist the SDK uses the API key; pass `auth: "chatgpt"` to override, or `auth: "api-key"` to require an environment API key. The SDK can reuse a file-backed Codex sign-in; use API keys for CI and server-side automation.
- Errors to catch: `AuthenticationRequiredError`, `ConfigurationError`, `InvalidTargetError`, `OutputDirectoryError`, `OutputInsideProtectedRootError`, `PluginPythonUnavailableError`, `PluginBootstrapError`, `ScanCostLimitExceededError`, `IncompleteScanError`, `ContractValidationError`, `ScanInterruptedError` (has `scanDir`; an interrupted scan can leave partial output, so preserve it for investigation). Cancel with `AbortSignal.timeout(...)`.
- New results don't include `coverage.completeness`; use `manifest.scan.status` for execution status and review `coverage` deferred surfaces, exclusions, and open questions.
- Publicly available at `github.com/openai/codex-security`; for general coding agents (not security-specific) see the Codex SDK guide in `security-automation`.

## Related

- [Codex Security CLI quickstart](./cli-quickstart.md)
- [Codex Security CLI reference](./cli-reference.md)
- [Run Codex Security in CI](./cli-ci.md)
