# TypeDoc アーキテクチャ概要

TypeDoc の高レベルアーキテクチャと処理フローの解説。

## 詳細説明

### 処理パイプライン

TypeDoc は以下の段階的パイプラインに従って実行される:

1. **オプション読み取り** — どのプラグインをロードするか決定
2. **プラグインロード** — プラグインシステムを初期化
3. **オプション再読み取り** — プラグイン固有のオプションを取得
4. **入力ファイルの変換 (Convert)** — ソースコードを「Reflection」と呼ばれる内部モデル表現に変換 (`src/lib/models`)
5. **モデルの解決 (Resolve)** — モデル間の相互参照とリンクを処理
6. **モデルの出力 (Output)** — HTML や JSON 形式にシリアライズ

```
Entry Points → Converter → Reflections → Resolver → Renderer → Output (HTML/JSON)
```

### コンポーネント構成

コードベースは処理段階に対応する構造になっている:

| 処理段階 | ソースパス |
|----------|-----------|
| オプション処理 | `src/lib/utils/options` |
| プラグインシステム | `src/lib/utils/plugins` |
| 変換ロジック | `src/lib/converter/symbols.ts` (`ts.SymbolFlags` で整理) |
| 解決処理 | `src/lib/output/plugins` (内部プラグインが `Converter.EVENT_RESOLVE` をリッスン) |
| JSON シリアライゼーション | `src/lib/serialization` |
| HTML 出力 | `src/lib/output` |

### コンバーター (Converter)

3つの主要変換モジュールが TypeScript の構文木を Reflection に変換する:

- **`symbols.ts`** — エクスポートされた `ts.Symbol` オブジェクトを処理
- **`types.ts`** — `ts.Type` と `ts.TypeNode` の変換を処理
- **`jsdoc.ts`** — JSDoc で宣言された型やシンボルを処理

### リフレクション (Reflections)

Reflection はテーマやシリアライゼーション全体で一貫した処理を可能にする内部モデル構造。すべてのドキュメント対象要素（クラス、関数、プロパティなど）が Reflection として表現される。

主要な Reflection 階層:

```
Reflection (基底クラス)
├── ContainerReflection
│   ├── ProjectReflection
│   └── DeclarationReflection
│       └── ReferenceReflection
├── SignatureReflection
├── ParameterReflection
├── TypeParameterReflection
└── DocumentReflection
```

### レンダラー (Renderer)

テーマシステムを通じて HTML を生成する。`Theme` クラスのインスタンスを使用し、Reflection ツリーを走査して各ページの HTML を出力する。

### 出力形式

- **JSON 出力**: `JSONOutput.ProjectReflection` インターフェースで定義。外部ツールから利用可能
- **HTML 出力**: テーマレンダリングシステムを通じて生成

## コード例

```typescript
import { Application } from "typedoc";

// 基本的な処理フロー
const app = await Application.bootstrapWithPlugins({
  entryPoints: ["src/index.ts"],
});

// 1. 変換: ソースコード → Reflections
const project = await app.convert();

if (project) {
  // 2. 出力: Reflections → HTML
  await app.generateDocs(project, "./docs");

  // または JSON 出力
  await app.generateJson(project, "./docs.json");
}
```

### プラグインによるイベントリスニング

```typescript
import { Application, Converter, ParameterType } from "typedoc";

export function load(app: Application) {
  // カスタムオプションの追加
  app.options.addDeclaration({
    name: "plugin-option",
    help: "Displayed when --help is passed",
    type: ParameterType.String,
    defaultValue: "",
  });

  // Converter イベントのリッスン
  app.converter.on(Converter.EVENT_RESOLVE, (context) => {
    if (app.options.getValue("plugin-option") === "something") {
      // カスタムロジック
    }
  });
}
```

## 注意点

- Converter はステップ 4 で動作し、TypeScript コンパイラの AST を Reflection モデルに変換する
- プラグインはステップ 2 の後にイベントリスナーを登録して動作をカスタマイズする
- Reflection モデルは HTML 出力と JSON 出力の両方で共通して使用される
- `src/lib/converter/symbols.ts` が最も中心的な変換ロジックを含む

## 関連

- [プラグイン開発](./plugin-development.md)
- [カスタムテーマ](./custom-themes.md)
- [Application クラス](../api/application.md)
- [Converter クラス](../api/converter.md)
- [Renderer クラス](../api/renderer.md)
- [Reflections](../api/reflections.md)
