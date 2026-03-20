# TypeDoc カスタムテーマ

TypeDoc のテーマシステムを拡張し、カスタム HTML 出力を作成する方法。

## 詳細説明

### テーマの定義

テーマはプラグインから `Application.renderer.defineTheme()` を呼び出して定義する。最も基本的な実装は `DefaultTheme` を継承する方法:

```typescript
import { Application, DefaultTheme } from "typedoc";

export function load(app: Application) {
  app.renderer.defineTheme("mydefault", DefaultTheme);
}
```

### DefaultTheme の拡張

カスタムテーマは `DefaultTheme` を継承し、`getRenderContext()` をオーバーライドしてカスタムコンテキストを返す:

```typescript
import {
  Application,
  DefaultTheme,
  DefaultThemeRenderContext,
  PageEvent,
  Reflection,
  Options,
  JSX,
} from "typedoc";

class MyThemeContext extends DefaultThemeRenderContext {
  // テンプレートメソッドをオーバーライド
  override footer = (context: DefaultThemeRenderContext) => {
    return (
      <footer>
        {context.hook("footer.begin", context)}
        Copyright 2024
        {context.hook("footer.end", context)}
      </footer>
    );
  };
}

class MyTheme extends DefaultTheme {
  getRenderContext(pageEvent: PageEvent<Reflection>): MyThemeContext {
    return new MyThemeContext(this, pageEvent, this.application.options);
  }
}

export function load(app: Application) {
  app.renderer.defineTheme("mytheme", MyTheme);
}
```

### DefaultThemeRenderContext

`DefaultThemeRenderContext` はテーマのすべてのテンプレートメソッドを提供するクラス。コンストラクタは以下の引数を取る:

```typescript
constructor(theme: DefaultTheme, page: PageEvent<Reflection>, options: Options)
```

#### 主要テンプレートメソッド

| メソッド | 説明 |
|---------|------|
| `reflectionTemplate` | 通常の Reflection ページのレンダリング |
| `documentTemplate` | ドキュメントページのレンダリング |
| `hierarchyTemplate` | 型階層ページのレンダリング |
| `indexTemplate` | インデックスページのレンダリング |

> **重要**: `this` を使用するテンプレート関数は必ずバインドする必要がある。アロー関数を使用するか、コンストラクタで `this.myMethod = this.myMethod.bind(this)` を呼ぶこと。

### フックシステム

フックを使うと、テーマ全体を書き換えることなく HTML にコンテンツを注入できる。

#### 利用可能なフック

| フック名 | 説明 |
|---------|------|
| `head.end` | `<head>` タグの末尾に挿入 |
| `body.begin` | `<body>` タグの先頭に挿入 |
| `body.end` | `<body>` タグの末尾に挿入 |
| `content.begin` | コンテンツエリアの先頭に挿入 |
| `content.end` | コンテンツエリアの末尾に挿入 |
| `sidebar.begin` | サイドバーの先頭に挿入 |
| `sidebar.end` | サイドバーの末尾に挿入 |
| `pageSidebar.begin` | ページサイドバーの先頭に挿入 |
| `pageSidebar.end` | ページサイドバーの末尾に挿入 |
| `footer.begin` | フッターの先頭に挿入 |
| `footer.end` | フッターの末尾に挿入 |

フックは `RendererHooks` インターフェースで詳細が定義されている。

### 非同期ジョブ

レンダリング前後に非同期処理を実行するためのキュー:

- **`preRenderAsyncJobs`**: ドキュメント生成前に実行
- **`postRenderAsyncJobs`**: ドキュメント書き込み後に実行

### カスタム JSX 要素

TypeDoc の `IntrinsicElements` インターフェースを拡張して独自の JSX 要素を定義できる:

```typescript
declare module "typedoc" {
  namespace JSX.JSX {
    interface IntrinsicElements {
      "custom-button": IntrinsicAttributes & {
        target: string;
      };
    }
    interface IntrinsicAttributes {
      customGlobalAttribute?: string;
    }
  }
}
```

## コード例

### フックの使用

```typescript
import { Application, JSX } from "typedoc";

export function load(app: Application) {
  // <head> にスクリプトを注入
  app.renderer.hooks.on("head.end", () => (
    <script>
      <JSX.Raw html="alert('hi!');" />
    </script>
  ));

  // フッターにカスタムコンテンツを追加
  app.renderer.hooks.on("footer.end", () => (
    <div class="custom-footer">
      <p>Custom footer content</p>
    </div>
  ));
}
```

### 非同期ジョブの使用

```typescript
import { Application, RendererEvent } from "typedoc";

export function load(app: Application) {
  app.renderer.preRenderAsyncJobs.push(async (output: RendererEvent) => {
    app.logger.info("Pre render, no docs written yet");
    // 外部リソースの取得など
  });

  app.renderer.postRenderAsyncJobs.push(async (output: RendererEvent) => {
    app.logger.info("Post render, all docs written");
    // 追加ファイルの生成など
  });
}
```

### 完全なカスタムテーマの例

```typescript
import {
  Application,
  DefaultTheme,
  DefaultThemeRenderContext,
  PageEvent,
  Reflection,
  JSX,
} from "typedoc";

class CustomContext extends DefaultThemeRenderContext {
  // ナビゲーションのカスタマイズ
  override navigation = (context: DefaultThemeRenderContext) => {
    return (
      <nav class="custom-nav">
        {/* カスタムナビゲーション */}
      </nav>
    );
  };
}

class CustomTheme extends DefaultTheme {
  getRenderContext(pageEvent: PageEvent<Reflection>): CustomContext {
    return new CustomContext(this, pageEvent, this.application.options);
  }
}

export function load(app: Application) {
  app.renderer.defineTheme("custom", CustomTheme);
}
```

## 注意点

- テンプレートメソッドで `this` を使用する場合は必ずバインドすること
- `DefaultThemeRenderContext` を継承する際、テンプレート関数はアロー関数またはバインド済み関数として定義する
- フックはプラグインが HTML を安全に注入するための推奨方法
- `JSX.Raw` を使用するとエスケープされない HTML を直接挿入できる
- カスタムテーマは `typedoc.json` の `theme` オプションで指定する

## 関連

- [プラグイン開発](./plugin-development.md)
- [Renderer クラス](../api/renderer.md)
- [イベントシステム](../api/events.md)
