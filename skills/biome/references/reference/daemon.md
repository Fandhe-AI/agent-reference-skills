# Daemon requests

The Biome daemon uses JSON-RPC 2.0 and can be used by third-party clients such as editor extensions. `method` is one of the values in the table below.

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

Type definitions follow the official TypeScript interfaces. Types shared by several methods (`Configuration`, `Diagnostic`, `FeatureName`, `TextRange`, etc.) are not expanded on the official page either.

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
- Most methods require the `projectKey` returned by `biome/open_project`.
- `ScanProjectResult` returns `configurationFiles: string[]`, `diagnostics: Diagnostic[]`, and `duration: Duration`. `CheckFileSizeResult` returns `fileSize` and `limit`.
- See the official page for the full params/returns interfaces (`update_settings`, `pull_actions`, `process_file`, `search_pattern`, etc. are omitted here).
- Source: https://biomejs.dev/reference/daemon/ (biomejs/website commit c5cb3eb4, release 2.5.15)

## Related

- [language-server](./language-server.md)
- [cli](./cli.md)
