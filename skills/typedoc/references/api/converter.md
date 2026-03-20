# Converter

TypeScript ソースコードを Reflection モデルに変換するクラス。Application のサブコンポーネントとして動作する。

## シグネチャ

```typescript
class Converter extends AbstractComponent<Application, ConverterEvents> {
  // コア変換メソッド
  convert(entryPoints: readonly DocumentationEntryPoint[]): Models.ProjectReflection;
  convertSymbol(context: Context, symbol: ts.Symbol, exportSymbol?: ts.Symbol): void;
  convertType(context: Context, node: ts.TypeNode | undefined): Models.SomeType;
  convertType(context: Context, type: ts.Type, node?: ts.TypeNode): Models.SomeType;

  // ドキュメント管理
  addProjectDocuments(project: Models.ProjectReflection): void;
  parseRawComment(
    file: MinimalSourceFile,
    files: Models.FileRegistry
  ): { content: Models.CommentDisplayPart[]; frontmatter: Record<string, unknown> };
  processDocumentTags(reflection: Models.Reflection, parent: Models.ContainerReflection): void;

  // リンク解決
  resolveLinks(reflection: Models.Reflection): void;
  resolveLinks(comment: Models.Comment, owner: Models.Reflection): void;
  resolveLinks(
    parts: readonly Models.CommentDisplayPart[],
    owner: Models.Reflection
  ): Models.CommentDisplayPart[];
  resolveExternalLink(
    ref: DeclarationReference,
    refl: Models.Reflection,
    part: Models.CommentDisplayPart | undefined,
    symbolId: Models.ReflectionSymbolId | undefined
  ): string | ExternalResolveResult | undefined;

  // 外部シンボル解決
  addUnknownSymbolResolver(resolver: ExternalSymbolResolver): void;

  // 遅延変換
  permitDeferredConversion(): void;
  deferConversion(cb: () => void): void;
  finalizeDeferredConversion(): void;

  // フィルタリング
  shouldIgnore(symbol: ts.Symbol, checker: ts.TypeChecker): boolean;
  isExternal(symbol: ts.Symbol, checker: ts.TypeChecker): boolean;

  // イベントメソッド
  on<K extends keyof ConverterEvents>(
    event: K,
    listener: (this: undefined, ...args: ConverterEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof ConverterEvents>(
    event: K,
    listener: (this: undefined, ...args: ConverterEvents[K]) => void
  ): void;
  trigger<K extends keyof ConverterEvents>(
    event: K,
    ...args: ConverterEvents[K]
  ): void;

  // 静的イベント定数
  static readonly EVENT_BEGIN: "begin";
  static readonly EVENT_END: "end";
  static readonly EVENT_CREATE_PROJECT: "createProject";
  static readonly EVENT_CREATE_DECLARATION: "createDeclaration";
  static readonly EVENT_CREATE_DOCUMENT: "createDocument";
  static readonly EVENT_CREATE_SIGNATURE: "createSignature";
  static readonly EVENT_CREATE_PARAMETER: "createParameter";
  static readonly EVENT_CREATE_TYPE_PARAMETER: "createTypeParameter";
  static readonly EVENT_RESOLVE_BEGIN: "resolveBegin";
  static readonly EVENT_RESOLVE: "resolveReflection";
  static readonly EVENT_RESOLVE_END: "resolveEnd";

  // プロパティ
  componentName: string;
}
```

## 主要メソッド

### convert()

```typescript
convert(entryPoints: readonly DocumentationEntryPoint[]): Models.ProjectReflection
```

指定されたソースファイルをコンパイルし、プロジェクト Reflection を作成する。エントリーポイントの配列を受け取り、変換されたプロジェクトモデルを返す。

### convertSymbol()

```typescript
convertSymbol(context: Context, symbol: ts.Symbol, exportSymbol?: ts.Symbol): void
```

TypeScript シンボルを Reflection に変換する内部メソッド。

### convertType()

```typescript
convertType(context: Context, node: ts.TypeNode | undefined): Models.SomeType
convertType(context: Context, type: ts.Type, node?: ts.TypeNode): Models.SomeType
```

TypeScript の型を TypeDoc の型 Reflection に変換する。`TypeNode` または `Type` のいずれかを受け取るオーバーロードを持つ。

### addProjectDocuments()

```typescript
addProjectDocuments(project: Models.ProjectReflection): void
```

プロジェクトドキュメントを登録する内部メソッド。

### parseRawComment()

```typescript
parseRawComment(
  file: MinimalSourceFile,
  files: Models.FileRegistry
): { content: Models.CommentDisplayPart[]; frontmatter: Record<string, unknown> }
```

Markdown ファイルをコメントとフロントマターに解析する。

### resolveLinks()

```typescript
resolveLinks(reflection: Models.Reflection): void
resolveLinks(comment: Models.Comment, owner: Models.Reflection): void
resolveLinks(
  parts: readonly Models.CommentDisplayPart[],
  owner: Models.Reflection
): Models.CommentDisplayPart[]
```

Reflection やコメント内のドキュメントリンクを解決する。3つのオーバーロードがある。

### addUnknownSymbolResolver()

```typescript
addUnknownSymbolResolver(resolver: ExternalSymbolResolver): void
```

サードパーティライブラリのシンボルへのリンクを解決するリゾルバを追加する。テーマが外部シンボルのリンク先を決定するために使用される。

### deferConversion() / permitDeferredConversion() / finalizeDeferredConversion()

```typescript
permitDeferredConversion(): void      // v0.28.1+
deferConversion(cb: () => void): void // v0.28.0+
finalizeDeferredConversion(): void    // v0.28.1+
```

変換ステップを遅延実行するための API。

## イベント定数

### 変換ライフサイクルイベント

| 定数 | 値 | コールバック引数 | 説明 |
|-----|---|----------------|------|
| `EVENT_BEGIN` | `"begin"` | `(context: Context)` | 変換開始時 |
| `EVENT_END` | `"end"` | `(context: Context)` | 変換完了時 |

### 作成イベント

| 定数 | 値 | コールバック引数 | 説明 |
|-----|---|----------------|------|
| `EVENT_CREATE_PROJECT` | `"createProject"` | `(context: Context, project: ProjectReflection)` | プロジェクト Reflection 作成時 |
| `EVENT_CREATE_DECLARATION` | `"createDeclaration"` | `(context: Context, reflection: DeclarationReflection)` | 宣言 Reflection 作成時 |
| `EVENT_CREATE_DOCUMENT` | `"createDocument"` | `(undefined, reflection: DocumentReflection)` | ドキュメント Reflection 作成時 |
| `EVENT_CREATE_SIGNATURE` | `"createSignature"` | `(context: Context, reflection: SignatureReflection, node, signature: ts.Signature)` | シグネチャ Reflection 作成時 |
| `EVENT_CREATE_PARAMETER` | `"createParameter"` | `(context: Context, reflection: ParameterReflection, node?: ts.Node)` | パラメータ Reflection 作成時 |
| `EVENT_CREATE_TYPE_PARAMETER` | `"createTypeParameter"` | `(context: Context, reflection: TypeParameterReflection)` | 型パラメータ Reflection 作成時 |

### 解決イベント

| 定数 | 値 | コールバック引数 | 説明 |
|-----|---|----------------|------|
| `EVENT_RESOLVE_BEGIN` | `"resolveBegin"` | `(context: Context)` | 解決処理開始時 |
| `EVENT_RESOLVE` | `"resolveReflection"` | `(context: Context, reflection: Reflection)` | 個々の Reflection 解決時 |
| `EVENT_RESOLVE_END` | `"resolveEnd"` | `(context: Context)` | 解決処理完了時 |

## アクセサ

| アクセサ | 型 | 説明 |
|---------|---|------|
| `application` | `Application` | Application インスタンス |
| `commentStyle` | `Configuration.CommentStyle` | コメント解析スタイル |
| `config` | `CommentParserConfig` | コメントパーサー設定 |
| `excludeExternals` | `boolean` | 外部シンボルを除外するか |
| `excludePrivate` | `boolean` | private 宣言を除外するか |
| `excludeProtected` | `boolean` | protected 宣言を除外するか |
| `excludeReferences` | `boolean` | リファレンスシンボルを除外するか |
| `externalPattern` | `GlobString[]` | 外部モジュールのパターン |
| `externalSymbolLinkMappings` | `Record<string, Record<string, string>>` | 外部シンボルの URL マッピング |
| `maxTypeConversionDepth` | `number` | 型変換の最大再帰深度 |
| `preserveLinkText` | `boolean` | 元のリンクテキストを保持するか |
| `validation` | `Configuration.ValidationOptions` | バリデーション設定 |

## コード例

### 基本的な変換

```typescript
import { Application, Converter, Context, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  // 変換開始時
  app.converter.on(Converter.EVENT_BEGIN, (context: Context) => {
    console.log("Conversion started");
  });

  // 宣言 Reflection 作成時
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      // Reflection のカスタマイズ
      if (reflection.name.startsWith("_")) {
        // 内部 API としてマーク
        reflection.setFlag(ReflectionFlag.Private, true);
      }
    }
  );

  // 解決処理完了時
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    const project = context.project;
    console.log(`Resolved ${Object.keys(project.reflections).length} reflections`);
  });
}
```

### 外部シンボルリゾルバ

```typescript
import { Application } from "typedoc";

export function load(app: Application) {
  app.converter.addUnknownSymbolResolver((ref, refl, part, symbolId) => {
    if (ref.moduleSource === "react") {
      const name = ref.symbolReference?.path?.[0]?.path;
      if (name) {
        return `https://react.dev/reference/react/${name}`;
      }
    }
    return undefined;
  });
}
```

## 関連

- [Application](./application.md)
- [Reflections](./reflections.md)
- [イベントシステム](./events.md)
- [プラグイン開発](../development/plugin-development.md)
