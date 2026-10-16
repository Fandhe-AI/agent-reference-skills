# Daemon requests

Biome daemon は JSON-RPC 2.0 を使用し、エディタ拡張などのサードパーティクライアントから利用できる。`method` は下表のいずれか。

## Signature / Usage

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "biome/open_project",
  "params": {
    "path": "/Some/path",
    "openUninitialized": false
  }
}
```

## Methods

型定義は公式の TypeScript interface に基づく。複数メソッドで共有される型（`Configuration` / `Diagnostic` / `FeatureName` / `TextRange` 等）は公式ページでも詳細展開されない。

| Method | Params | Returns |
|--------|--------|---------|
| `biome/file_features` | `SupportsFeatureParams` | `FileFeaturesResult` |
| `biome/update_settings` | `UpdateSettingsParams` | `UpdateSettingsResult` |
| `biome/open_project` | `OpenProjectParams` | `OpenProjectResult` |
| `biome/scan_project` | `ScanProjectParams` | `ScanProjectResult` |
| `biome/open_file` | `OpenFileParams` | `OpenFileResult` |
| `biome/change_file` | `ChangeFileParams` | `ChangeFileResult` |
| `biome/close_file` | `CloseFileParams` | `void` |
| `biome/file_exists` | `FileExistsParams` | `boolean` |
| `biome/is_path_ignored` | `PathIsIgnoredParams` | `boolean` |
| `biome/update_module_graph` | `UpdateModuleGraphParams` | `void` |
| `biome/get_syntax_tree` | `GetSyntaxTreeParams` | `GetSyntaxTreeResult` |
| `biome/check_file_size` | `CheckFileSizeParams` | `CheckFileSizeResult` |
| `biome/get_file_content` | `GetFileContentParams` | `string` |
| `biome/get_control_flow_graph` | `GetControlFlowGraphParams` | `string` |
| `biome/get_formatter_ir` | `GetFormatterIRParams` | `string` |
| `biome/get_type_info` | `GetTypeInfoParams` | `string` |
| `biome/get_registered_types` | `GetRegisteredTypesParams` | `string` |
| `biome/get_semantic_model` | `GetSemanticModelParams` | `string` |
| `biome/get_module_graph` | `GetModuleGraphParams` (`{}`) | `GetModuleGraphResult` |
| `biome/pull_diagnostics` | `PullDiagnosticsParams` | `PullDiagnosticsResult` |
| `biome/process_file` | `ProcessFileParams` | `ProcessFileResult` |
| `biome/pull_actions` | `PullActionsParams` | `PullActionsResult` |
| `biome/pull_diagnostics_and_actions` | `PullDiagnosticsAndActionsParams` | `PullDiagnosticsAndActionsResult` |
| `biome/format_file` | `FormatFileParams` | `Printed` |
| `biome/format_range` | `FormatRangeParams` | `Printed` |
| `biome/format_on_type` | `FormatOnTypeParams` | `Printed` |
| `biome/fix_file` | `FixFileParams` | `FixFileResult` |
| `biome/rename` | `RenameParams` | `RenameResult` |
| `biome/parse_pattern` | `ParsePatternParams` | `ParsePatternResult` |
| `biome/search_pattern` | `SearchPatternParams` | `SearchResults` |
| `biome/drop_pattern` | `DropPatternParams` | `void` |

## Key types

```ts
interface OpenProjectParams {
	/**
	 * Whether the folder should be opened as a project, even if no `biome.json` can be found.
	 */
	openUninitialized: boolean;
	/**
	 * The path to open
	 */
	path: string;
}

interface OpenProjectResult {
	/**
	 * A unique identifier for this project
	 */
	projectKey: number;
}

interface ScanProjectParams {
	/**
	 * Forces scanning of the folder, even if it is already being watched.
	 */
	force: boolean;
	projectKey: number;
	scanKind: ScanKind;
	verbose?: boolean;
	/**
	 * Whether the watcher should watch this path. Does nothing if the watcher is already watching this path.
	 */
	watch: boolean;
}

interface OpenFileParams {
	content: FileContent;
	documentFileSource?: DocumentFileSource;
	editorFeatures?: EditorFeatures;
	inlineConfig?: Configuration;
	path: string;
	persistNodeCache?: boolean;
	projectKey: number;
}

interface ChangeFileParams {
	content: string;
	editorFeatures?: EditorFeatures;
	inlineConfig?: Configuration;
	path: string;
	projectKey: number;
	version: number;
}

interface FormatFileParams {
	inlineConfig?: Configuration;
	path: string;
	projectKey: number;
}

interface Printed {
	code: string;
	range?: TextRange;
	sourcemap: SourceMarker[];
	verbatimRanges: TextRange[];
}

interface PullDiagnosticsResult {
	diagnostics: Diagnostic[];
	errors: number;
	infos: number;
	parseErrors: number;
	skippedDiagnostics: number;
	warnings: number;
}

interface FixFileParams {
	enabledRules?: string[];
	fixFileMode: FixFileMode;
	inlineConfig?: Configuration;
	only?: string[];
	path: string;
	projectKey: number;
	ruleCategories: RuleCategories;
	shouldFormat: boolean;
	skip?: string[];
	suppressionReason?: unknown;
}

interface RenameParams {
	newName: string;
	path: string;
	projectKey: number;
	symbolAt: number;
}
```

## Notes

- These methods aren't part of the semantic versioning contract, and may change without notice.
- ほとんどのメソッドは `biome/open_project` が返す `projectKey` を要求する。
- `ScanProjectResult` は `configurationFiles: string[]` / `diagnostics: Diagnostic[]` / `duration: Duration` を返す。`CheckFileSizeResult` は `fileSize` / `limit`。
- 全 params/returns の完全な interface は公式ページを参照（`update_settings` / `pull_actions` / `process_file` / `search_pattern` 等はここでは省略）。
- 出典: biomejs.dev/reference/daemon/（website tag release-2.5.15、commit c5cb3eb4）。

## Related

- [language-server](./language-server.md)
- [cli](./cli.md)
