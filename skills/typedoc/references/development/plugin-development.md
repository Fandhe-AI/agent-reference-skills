# TypeDoc プラグイン開発

TypeDoc プラグインの作成方法、イベントシステム、カスタムオプションの追加方法。

## 詳細説明

### プラグインの基本構造

TypeDoc プラグインは `load` 関数をエクスポートする Node モジュール。ESM と CommonJS の両方をサポートするが、ESM が推奨される。

#### ESM プラグイン

```typescript
import * as td from "typedoc";

export function load(app: td.Application) {
  // app, app.converter, app.renderer 等にイベントリスナーを登録
  // この関数は async にできる
}
```

#### CommonJS プラグイン

```javascript
const td = require("typedoc");

module.exports = {
  load(app) {
    // イベントリスナーを登録
  },
};
```

#### JS 設定ファイルからの直接参照

```javascript
// typedoc.config.js
import * as td from "typedoc";

export function customPlugin(app) {
  // イベントリスナーを登録
}

const config = {
  plugin: [customPlugin],
};

export default config;
```

### イベントシステム

プラグインは変換とレンダリング中に発火するイベントにリスナーを登録して TypeDoc の動作を変更する。イベントは以下の4つのクラスで提供される:

- **Application** — アプリケーションライフサイクルイベント
- **Converter** — 変換処理イベント
- **Renderer** — レンダリング処理イベント
- **Serializer / Deserializer** — シリアライゼーションイベント

各クラスは利用可能なイベントを記述する静的 `EVENT_*` プロパティを提供する。

### Converter イベント

| イベント定数 | 値 | 説明 |
|-------------|---|------|
| `Converter.EVENT_BEGIN` | `"begin"` | 変換開始時に発火。`Context` を受け取る |
| `Converter.EVENT_END` | `"end"` | 変換完了時に発火。`Context` を受け取る |
| `Converter.EVENT_CREATE_PROJECT` | `"createProject"` | プロジェクト Reflection 作成時。`Context`, `ProjectReflection` を受け取る |
| `Converter.EVENT_CREATE_DECLARATION` | `"createDeclaration"` | 宣言 Reflection 作成時。`Context`, `DeclarationReflection` を受け取る |
| `Converter.EVENT_CREATE_DOCUMENT` | `"createDocument"` | ドキュメント Reflection 作成時。`DocumentReflection` を受け取る |
| `Converter.EVENT_CREATE_SIGNATURE` | `"createSignature"` | シグネチャ Reflection 作成時。`Context`, `SignatureReflection`, 宣言ノード, `ts.Signature` を受け取る |
| `Converter.EVENT_CREATE_PARAMETER` | `"createParameter"` | パラメータ Reflection 作成時。`Context`, `ParameterReflection`, オプションの `ts.Node` を受け取る |
| `Converter.EVENT_CREATE_TYPE_PARAMETER` | `"createTypeParameter"` | 型パラメータ Reflection 作成時。`Context`, `TypeParameterReflection` を受け取る |
| `Converter.EVENT_RESOLVE_BEGIN` | `"resolveBegin"` | 解決処理開始時。`Context` を受け取る |
| `Converter.EVENT_RESOLVE` | `"resolveReflection"` | 個々の Reflection 解決時。`Context`, `Reflection` を受け取る |
| `Converter.EVENT_RESOLVE_END` | `"resolveEnd"` | 解決処理完了時。`Context` を受け取る |

### Renderer イベント

| イベント定数 | 値 | 説明 |
|-------------|---|------|
| `Renderer.EVENT_BEGIN` | `"beginRender"` | レンダリング開始前。`RendererEvent` を受け取る |
| `Renderer.EVENT_END` | `"endRender"` | 全ドキュメント書き込み後。`RendererEvent` を受け取る |
| `Renderer.EVENT_BEGIN_PAGE` | `"beginPage"` | ページレンダリング前。`PageEvent` を受け取る |
| `Renderer.EVENT_END_PAGE` | `"endPage"` | ページレンダリング後（書き込み前）。`PageEvent` を受け取る |
| `Renderer.EVENT_PREPARE_INDEX` | `"prepareIndex"` | 検索インデックス準備時。`IndexEvent` を受け取る |

### Application イベント

| イベント定数 | 説明 |
|-------------|------|
| `Application.EVENT_BOOTSTRAP_END` | プラグインロードとオプション凍結後に発火 |
| `Application.EVENT_PROJECT_REVIVE` | JSON デシリアライゼーション後に発火 |
| `Application.EVENT_VALIDATE_PROJECT` | バリデーション中に発火 |

### カスタムオプションの追加

```typescript
import { Application, ParameterType } from "typedoc";

export function load(app: Application) {
  app.options.addDeclaration({
    name: "my-plugin-option",
    help: "Description displayed with --help",
    type: ParameterType.String,
    defaultValue: "default-value",
  });

  app.options.addDeclaration({
    name: "my-boolean-option",
    help: "A boolean option",
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    name: "my-enum-option",
    help: "An enum option",
    type: ParameterType.Map,
    map: new Map([
      ["value1", "Value 1"],
      ["value2", "Value 2"],
    ]),
    defaultValue: "value1",
  });
}
```

### 外部シンボルリゾルバ

サードパーティライブラリのシンボルへのリンクを解決するリゾルバを追加できる:

```typescript
import { Application, Converter } from "typedoc";

export function load(app: Application) {
  app.converter.addUnknownSymbolResolver((ref, refl, part, symbolId) => {
    // リンク先の URL を返すか、undefined を返す
    if (ref.moduleSource === "some-package") {
      return `https://docs.example.com/${ref.symbolReference?.path?.[0]?.path}`;
    }
    return undefined;
  });
}
```

## コード例

### 基本的なプラグイン

```typescript
import {
  Application,
  Converter,
  Context,
  DeclarationReflection,
  ReflectionKind,
} from "typedoc";

export function load(app: Application) {
  // 宣言 Reflection 作成時のリスナー
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      if (reflection.kindOf(ReflectionKind.Class)) {
        app.logger.info(`Class found: ${reflection.name}`);
      }
    }
  );

  // 解決処理完了時のリスナー
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    const project = context.project;
    app.logger.info(
      `Total reflections: ${Object.keys(project.reflections).length}`
    );
  });
}
```

### レンダリングプラグイン

```typescript
import {
  Application,
  Renderer,
  PageEvent,
  RendererEvent,
  Reflection,
} from "typedoc";

export function load(app: Application) {
  // ページ生成前にコンテンツを修正
  app.renderer.on(
    Renderer.EVENT_END_PAGE,
    (page: PageEvent<Reflection>) => {
      if (page.contents) {
        page.contents = page.contents.replace(
          "</body>",
          '<script src="custom.js"></script></body>'
        );
      }
    }
  );

  // レンダリング完了後に追加ファイルを生成
  app.renderer.postRenderAsyncJobs.push(async (output: RendererEvent) => {
    // 追加の出力処理
  });
}
```

### typedoc-plugin-mdn-links パターン

```typescript
import { Application, Converter, ReferenceType } from "typedoc";

export function load(app: Application) {
  app.converter.addUnknownSymbolResolver((ref) => {
    if (ref.moduleSource !== "typescript") return;

    const name = ref.symbolReference?.path?.[0]?.path;
    if (!name) return;

    // MDN ドキュメントへのリンクを返す
    const mdnTypes: Record<string, string> = {
      Array: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array",
      Map: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map",
      Set: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set",
      Promise: "https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    };

    return mdnTypes[name];
  });
}
```

## 注意点

- `load` 関数は `async` にすることができる
- ESM プラグインが推奨される（CommonJS では実験的機能の警告が出る場合がある）
- イベントリスナーの `this` は `undefined` にバインドされる
- `Converter.EVENT_RESOLVE` は各 Reflection に対して個別に発火する
- カスタムオプションは `app.options.getValue("option-name")` で取得する
- プラグインは `typedoc.json` の `plugin` 配列で指定するか、JS 設定ファイルで直接インポートする

## 関連

- [アーキテクチャ概要](./overview.md)
- [カスタムテーマ](./custom-themes.md)
- [国際化](./internationalization.md)
- [Application クラス](../api/application.md)
- [Converter クラス](../api/converter.md)
- [Renderer クラス](../api/renderer.md)
- [イベントシステム](../api/events.md)
- [Options API](../api/options-api.md)
