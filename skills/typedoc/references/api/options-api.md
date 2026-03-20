# Options

TypeDoc と TypeScript のオプション宣言を管理するクラス。型安全なオプションの取得・設定を提供する。

## シグネチャ

```typescript
class Options {
  constructor();

  // 宣言管理
  addDeclaration<K extends keyof TypeDocOptionMap>(
    declaration: { name: K } & KeyToDeclaration<K>
  ): void;
  getDeclaration(name: string): Readonly<DeclarationOption> | undefined;
  getDeclarations(): Readonly<DeclarationOption>[];

  // 値の操作
  getValue<K extends keyof TypeDocOptionMap>(name: K): TypeDocOptionValues[K];
  setValue<K extends keyof TypeDocOptionMap>(
    name: K,
    value: Exclude<TypeDocOptions[K], undefined>,
    configPath?: string
  ): void;
  isSet(name: keyof TypeDocOptionMap): boolean;
  getRawValues(): Readonly<Partial<TypeDocOptionValues>>;
  reset(name?: keyof TypeDocOptionMap): void;

  // リーダー管理
  addReader(reader: OptionsReader): void;
  read(logger: Logger, cwd?: string, usedFile?: (path: string) => void): Promise<void>;

  // コンパイラオプション
  getCompilerOptions(logger: Logger): ts.CompilerOptions;
  setCompilerOptions(
    fileNames: readonly string[],
    options: ts.CompilerOptions,
    projectReferences?: readonly ts.ProjectReference[]
  ): void;
  fixCompilerOptions(
    options: Readonly<ts.CompilerOptions>,
    logger: Logger
  ): ts.CompilerOptions;
  getFileNames(): readonly string[];
  getProjectReferences(): readonly ts.ProjectReference[];

  // ユーティリティ
  getHelp(): string;
  getSimilarOptions(missingName: string): string[];
  copyForPackage(packageDir: string): Options;
  snapshot(): { __optionSnapshot: never };
  restore(snapshot: { __optionSnapshot: never }): void;

  // プロパティ
  packageDir?: string;
}
```

## 主要メソッド

### addDeclaration()

```typescript
addDeclaration<K extends keyof TypeDocOptionMap>(
  declaration: { name: K } & KeyToDeclaration<K>
): void
```

新しいオプション宣言を追加する。プラグインでカスタムオプションを定義する際に使用する。

### getValue()

```typescript
getValue<K extends keyof TypeDocOptionMap>(name: K): TypeDocOptionValues[K]
```

指定されたオプションの現在の値を型安全に取得する。

### setValue()

```typescript
setValue<K extends keyof TypeDocOptionMap>(
  name: K,
  value: Exclude<TypeDocOptions[K], undefined>,
  configPath?: string
): void
```

指定されたオプションの値を設定する。`configPath` はファイルパスの解決に使用される。

### isSet()

```typescript
isSet(name: keyof TypeDocOptionMap): boolean
```

オプションが明示的に設定されているかどうかを返す（デフォルト値のままでないか）。

### getRawValues()

```typescript
getRawValues(): Readonly<Partial<TypeDocOptionValues>>
```

すべてのオプションの生の値を読み取り専用で返す。

### reset()

```typescript
reset(name?: keyof TypeDocOptionMap): void
```

指定されたオプション（または全オプション）をデフォルト値にリセットする。

### addReader()

```typescript
addReader(reader: OptionsReader): void
```

オプションリーダーを追加する。

### read()

```typescript
read(logger: Logger, cwd?: string, usedFile?: (path: string) => void): Promise<void>
```

登録されたすべてのリーダーからオプションを読み取る。

### getCompilerOptions()

```typescript
getCompilerOptions(logger: Logger): ts.CompilerOptions
```

TypeScript コンパイラオプションを取得する。

### snapshot() / restore()

```typescript
snapshot(): { __optionSnapshot: never }
restore(snapshot: { __optionSnapshot: never }): void
```

オプションの状態をスナップショットとして保存し、後で復元する。パッケージモードでの使用を想定。

## 主要プロパティ

### packageDir

```typescript
packageDir?: string
```

パッケージモードでのパッケージディレクトリ。

## オプションリーダー

オプションは優先度順に読み取られる:

| リーダー | 優先度 | 説明 |
|---------|-------|------|
| `ArgumentsReader` (最初) | 0 | CLI 引数 (最初のパス) |
| `TypeDocReader` | 100 | `typedoc.json` / `typedoc.config.js` |
| `TSConfigReader` | 200 | `tsconfig.json` |
| `ArgumentsReader` (最後) | 300 | CLI 引数 (最終パス、上書き) |
| `PackageJsonReader` | — | `package.json` の `typedocOptions` |

### OptionsReader インターフェース

```typescript
interface OptionsReader {
  name: string;
  readonly order: number;
  read(container: Options, logger: Logger, cwd: string): Promise<void> | void;
}
```

## ParameterType 列挙型

```typescript
enum ParameterType {
  String,         // 文字列値
  Path,           // ファイルパス (解決される)
  Number,         // 数値
  Boolean,        // 真偽値
  Map,            // キーと値のマップ
  Mixed,          // 混合型
  Array,          // 文字列配列
  PathArray,      // パス配列
  ModuleArray,    // モジュール配列
  GlobArray,      // Glob パターン配列
  Flags,          // フラグの組み合わせ
  Object,         // オブジェクト
}
```

## コード例

### カスタムオプションの定義

```typescript
import { Application, ParameterType } from "typedoc";

export function load(app: Application) {
  // 文字列オプション
  app.options.addDeclaration({
    name: "myPluginTitle",
    help: "Title for the custom section",
    type: ParameterType.String,
    defaultValue: "Custom Section",
  });

  // ブールオプション
  app.options.addDeclaration({
    name: "myPluginEnabled",
    help: "Enable the custom plugin feature",
    type: ParameterType.Boolean,
    defaultValue: true,
  });

  // パスオプション
  app.options.addDeclaration({
    name: "myPluginOutput",
    help: "Output directory for custom files",
    type: ParameterType.Path,
    defaultValue: "./custom-output",
  });

  // マップオプション (列挙的な選択肢)
  app.options.addDeclaration({
    name: "myPluginFormat",
    help: "Output format",
    type: ParameterType.Map,
    map: new Map([
      ["json", "json"],
      ["yaml", "yaml"],
      ["xml", "xml"],
    ]),
    defaultValue: "json",
  });

  // 配列オプション
  app.options.addDeclaration({
    name: "myPluginExclude",
    help: "Patterns to exclude",
    type: ParameterType.GlobArray,
    defaultValue: [],
  });
}
```

### オプション値の取得と使用

```typescript
import { Application, Converter } from "typedoc";

export function load(app: Application) {
  app.converter.on(Converter.EVENT_RESOLVE_END, () => {
    // 型安全に値を取得
    const title = app.options.getValue("myPluginTitle");
    const enabled = app.options.getValue("myPluginEnabled");
    const output = app.options.getValue("myPluginOutput");

    if (enabled) {
      app.logger.info(`Plugin active with title: ${title}`);
      app.logger.info(`Output to: ${output}`);
    }

    // オプションが明示的に設定されているか確認
    if (app.options.isSet("myPluginTitle")) {
      app.logger.info("Title was explicitly configured");
    }
  });
}
```

### オプションのスナップショット

```typescript
// パッケージモードでの使用例
const snap = app.options.snapshot();
try {
  app.options.setValue("out", "./package-docs");
  // パッケージ固有の処理
} finally {
  app.options.restore(snap);
}
```

## 注意点

- オプションは `Application.bootstrap()` または `bootstrapWithPlugins()` 後に凍結される
- プラグインのカスタムオプションは `load()` 関数内で `addDeclaration()` を使用して宣言する
- `ParameterType.Path` はファイルパスを自動的に解決する
- リーダーの優先度により CLI 引数が最終的に他の設定を上書きする
- `copyForPackage()` はパッケージモードでパッケージごとのオプションコピーを作成する

## 関連

- [Application](./application.md)
- [プラグイン開発](../development/plugin-development.md)
