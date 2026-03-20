# Application

TypeDoc のメインエントリーポイント。TypeScript ソースファイルのドキュメント変換を Converter と Renderer を通じてオーケストレーションする。

## シグネチャ

```typescript
class Application extends AbstractComponent<Application, ApplicationEvents> {
  // 静的メソッド
  static bootstrap(
    options?: Configuration.TypeDocOptions,
    readers?: readonly Configuration.OptionsReader[]
  ): Promise<Application>;

  static bootstrapWithPlugins(
    options?: Configuration.TypeDocOptions,
    readers?: readonly Configuration.OptionsReader[]
  ): Promise<Application>;

  // インスタンスメソッド
  convert(): Promise<Models.ProjectReflection | undefined>;
  convertAndWatch(
    success: (project: Models.ProjectReflection) => Promise<void>
  ): Promise<boolean>;
  generateDocs(project: Models.ProjectReflection, out: string): Promise<void>;
  generateJson(project: Models.ProjectReflection, out: string): Promise<void>;
  generateOutputs(project: Models.ProjectReflection): Promise<void>;
  validate(project: Models.ProjectReflection): void;
  getEntryPoints(): DocumentationEntryPoint[] | undefined;
  getDefinedEntryPoints(): DocumentationEntryPoint[] | undefined;
  setOptions(options: Configuration.TypeDocOptions, reportErrors?: boolean): boolean;
  watchFile(path: string, shouldRestart?: boolean): void;
  toString(): string;

  // イベントメソッド
  on<K extends keyof ApplicationEvents>(
    event: K,
    listener: (this: undefined, ...args: ApplicationEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof ApplicationEvents>(
    event: K,
    listener: (this: undefined, ...args: ApplicationEvents[K]) => void
  ): void;
  trigger<K extends keyof ApplicationEvents>(
    event: K,
    ...args: ApplicationEvents[K]
  ): void;

  // プロパティ
  converter: Converter;
  renderer: Renderer;
  outputs: Outputs;
  serializer: Serializer;
  deserializer: Deserializer;
  options: Configuration.Options;
  logger: Logger;
  internationalization: Internationalization;
  files: Models.FileRegistry;  // 非推奨
  componentName: string;

  // 静的プロパティ
  static readonly VERSION: string;

  // 静的イベント
  static readonly EVENT_BOOTSTRAP_END: string;
  static readonly EVENT_PROJECT_REVIVE: string;
  static readonly EVENT_VALIDATE_PROJECT: string;
}
```

## 主要メソッド

### bootstrap()

```typescript
static bootstrap(
  options?: Configuration.TypeDocOptions,
  readers?: readonly Configuration.OptionsReader[]
): Promise<Application>
```

プラグインをロードせずに TypeDoc を初期化する。テスト時やプラグインが不要な場合に使用する。

### bootstrapWithPlugins()

```typescript
static bootstrapWithPlugins(
  options?: Configuration.TypeDocOptions,
  readers?: readonly Configuration.OptionsReader[]
): Promise<Application>
```

プラグインのロードを有効にして TypeDoc を初期化する。通常のユースケースではこちらを使用する。

### convert()

```typescript
convert(): Promise<Models.ProjectReflection | undefined>
```

設定されたファイルに対してコンバーターを実行し、プロジェクト Reflection を返す。エラー時は `undefined` を返す。

### convertAndWatch()

```typescript
convertAndWatch(
  success: (project: Models.ProjectReflection) => Promise<void>
): Promise<boolean>
```

変換/ウォッチサイクルを実行し、各変換後にコールバックを実行する。再起動が必要な場合は `true`、エラー時は `false` を返す。

### generateDocs()

```typescript
generateDocs(project: Models.ProjectReflection, out: string): Promise<void>
```

プロジェクトの HTML ドキュメントを指定ディレクトリにレンダリングする。

### generateJson()

```typescript
generateJson(project: Models.ProjectReflection, out: string): Promise<void>
```

プロジェクト Reflection を JSON ファイルにシリアライズする。

### generateOutputs()

```typescript
generateOutputs(project: Models.ProjectReflection): Promise<void>
```

設定されたすべての出力形式を生成する。

### validate()

```typescript
validate(project: Models.ProjectReflection): void
```

プロジェクト Reflection に対してバリデーションを実行する。

### getEntryPoints()

```typescript
getEntryPoints(): DocumentationEntryPoint[] | undefined
```

ドキュメント化されたエントリーポイントを取得する。

### getDefinedEntryPoints()

```typescript
getDefinedEntryPoints(): DocumentationEntryPoint[] | undefined
```

ストラテジーオプションに従ってエントリーポイントを展開する。

### setOptions()

```typescript
setOptions(
  options: Configuration.TypeDocOptions,
  reportErrors?: boolean
): boolean
```

アプリケーションオプションを更新する。

### watchFile()

```typescript
watchFile(path: string, shouldRestart?: boolean): void
```

ウォッチモードでの再ビルド用にファイル依存関係を登録する。

## 主要プロパティ

### converter

```typescript
converter: Converter
```

宣言 Reflection を作成するコンバーターインスタンス。

### renderer

```typescript
renderer: Renderer
```

HTML 出力を生成するレンダラーインスタンス。

### serializer

```typescript
serializer: Serializer
```

JSON 出力を生成するシリアライザーインスタンス。

### deserializer

```typescript
deserializer: Deserializer
```

JSON から復元するデシリアライザーインスタンス。

### options

```typescript
options: Configuration.Options
```

設定コンテナ。オプションの取得・設定を行う。

### logger

```typescript
logger: Logger
```

メッセージ出力ユーティリティ。

### internationalization

```typescript
internationalization: Internationalization
```

翻訳サポート。`addTranslations()` で翻訳を追加できる。

### outputs

```typescript
outputs: Outputs
```

出力管理。

## 静的イベント

### EVENT_BOOTSTRAP_END

プラグインのロードとオプションの凍結後に発火する。

### EVENT_PROJECT_REVIVE

JSON デシリアライゼーション後に発火する。

### EVENT_VALIDATE_PROJECT

バリデーション中に発火する。

## アクセサ

| アクセサ | 型 | 説明 |
|---------|---|------|
| `application` | `Application` | Application インスタンスを返す |
| `owner` | `Application` | コンポーネントのオーナーを返す |
| `lang` | `string` | 言語設定 |
| `entryPointStrategy` | `EntryPointStrategy` | エントリーポイント展開戦略 |
| `entryPoints` | `string[]` | エントリーポイントパターン |
| `skipErrorChecking` | `boolean` | エラーチェックのトグル |

## コード例

```typescript
import { Application } from "typedoc";

// プラグイン付きで初期化
const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
  out: "docs",
});

// 変換
const project = await app.convert();

if (project) {
  // バリデーション
  app.validate(project);

  // HTML ドキュメント生成
  await app.generateDocs(project, "docs");

  // JSON 出力
  await app.generateJson(project, "docs/api.json");

  // すべての設定済み出力を生成
  await app.generateOutputs(project);
}
```

### イベントリスニング

```typescript
import { Application } from "typedoc";

const app = await Application.bootstrapWithPlugins();

// ブートストラップ完了後のイベント
app.on(Application.EVENT_BOOTSTRAP_END, () => {
  console.log("Bootstrap completed");
});

// バリデーションイベント
app.on(Application.EVENT_VALIDATE_PROJECT, (project) => {
  console.log(`Validating project: ${project.name}`);
});
```

## 関連

- [Converter](./converter.md)
- [Renderer](./renderer.md)
- [Options API](./options-api.md)
- [Serialization](./serialization.md)
- [アーキテクチャ概要](../development/overview.md)
