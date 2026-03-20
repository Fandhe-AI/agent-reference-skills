# Renderer

ProjectReflection を Theme インスタンスで処理し、HTML ドキュメントを出力ディレクトリに書き込むクラス。

## シグネチャ

```typescript
class Renderer extends AbstractComponent<Application, RendererEvents> {
  // メソッド
  render(project: Models.ProjectReflection, outputDirectory: string): Promise<void>;
  defineTheme(name: string, theme: new (renderer: Renderer) => Theme): void;
  defineRouter(name: string, router: new (app: Application) => Router): void;
  removeTheme(name: string): void;
  removeRouter(name: string): void;

  // イベントメソッド
  on<K extends keyof RendererEvents>(
    event: K,
    listener: (this: undefined, ...args: RendererEvents[K]) => void,
    priority?: number
  ): void;
  off<K extends keyof RendererEvents>(
    event: K,
    listener: (this: undefined, ...args: RendererEvents[K]) => void
  ): void;
  trigger<K extends keyof RendererEvents>(
    event: K,
    ...args: RendererEvents[K]
  ): void;

  // プロパティ
  theme?: Theme;
  router?: Router;
  hooks: EventHooks<RendererHooks, JSX.Element>;
  preRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[];
  postRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[];
  renderStartTime: number;
  markedPlugin: MarkedPlugin;
  cacheBust: boolean;
  componentName: string;

  // 静的イベント定数
  static readonly EVENT_BEGIN: "beginRender";
  static readonly EVENT_END: "endRender";
  static readonly EVENT_BEGIN_PAGE: "beginPage";
  static readonly EVENT_END_PAGE: "endPage";
  static readonly EVENT_PREPARE_INDEX: "prepareIndex";
}
```

## 主要メソッド

### render()

```typescript
render(project: Models.ProjectReflection, outputDirectory: string): Promise<void>
```

プロジェクト Reflection を処理し、HTML ドキュメントを指定ディレクトリに出力する。以下の順序で処理が行われる:

1. `preRenderAsyncJobs` を実行
2. `EVENT_BEGIN` イベントを発火
3. 各ページの `EVENT_BEGIN_PAGE` → レンダリング → `EVENT_END_PAGE` を実行
4. `EVENT_END` イベントを発火
5. `postRenderAsyncJobs` を実行

### defineTheme()

```typescript
defineTheme(name: string, theme: new (renderer: Renderer) => Theme): void
```

カスタムテーマを登録する。テーマ名と `Theme` を継承するクラスのコンストラクタを受け取る。

### defineRouter()

```typescript
defineRouter(name: string, router: new (app: Application) => Router): void
```

カスタムルーターを登録する。URL 構造をカスタマイズする際に使用する。

### removeTheme()

```typescript
removeTheme(name: string): void
```

登録済みテーマを削除する。

### removeRouter()

```typescript
removeRouter(name: string): void
```

登録済みルーターを削除する。

## 主要プロパティ

### theme

```typescript
theme?: Theme
```

現在アクティブなテーマインスタンス。レンダリング開始時に設定される。

### router

```typescript
router?: Router
```

現在アクティブなルーターインスタンス。URL 生成に使用される。

### hooks

```typescript
hooks: EventHooks<RendererHooks, JSX.Element>
```

プラグインが HTML にコンテンツを注入するためのフックシステム。テーマ全体を書き換えずに部分的なカスタマイズが可能。

利用可能なフック: `head.end`, `body.begin`, `body.end`, `content.begin`, `content.end`, `sidebar.begin`, `sidebar.end`, `pageSidebar.begin`, `pageSidebar.end`, `footer.begin`, `footer.end`

### preRenderAsyncJobs

```typescript
preRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[]
```

ドキュメント生成前に実行される非同期コールバックの配列。

### postRenderAsyncJobs

```typescript
postRenderAsyncJobs: ((output: RendererEvent) => Promise<void>)[]
```

ドキュメント書き込み後に実行される非同期コールバックの配列。

### renderStartTime

```typescript
renderStartTime: number
```

レンダリング開始時のタイムスタンプ。

### markedPlugin

```typescript
markedPlugin: MarkedPlugin
```

Markdown パーシングプラグイン。

## イベント定数

| 定数 | 値 | コールバック引数 | 説明 |
|-----|---|----------------|------|
| `EVENT_BEGIN` | `"beginRender"` | `(event: RendererEvent)` | レンダリング開始前に発火 |
| `EVENT_END` | `"endRender"` | `(event: RendererEvent)` | 全ドキュメント書き込み後に発火 |
| `EVENT_BEGIN_PAGE` | `"beginPage"` | `(event: PageEvent)` | ページレンダリング前に発火 |
| `EVENT_END_PAGE` | `"endPage"` | `(event: PageEvent)` | ページレンダリング後（ディスク書き込み前）に発火 |
| `EVENT_PREPARE_INDEX` | `"prepareIndex"` | `(event: IndexEvent)` | 検索インデックス準備時に発火 |

## アクセサ

| アクセサ | 型 | 説明 |
|---------|---|------|
| `application` | `Application` | Application インスタンス |
| `owner` | `Application` | コンポーネントのオーナー |

## コード例

### テーマの定義

```typescript
import { Application, DefaultTheme, Renderer } from "typedoc";

class MyTheme extends DefaultTheme {
  // カスタムテーマの実装
}

export function load(app: Application) {
  app.renderer.defineTheme("my-theme", MyTheme);
}
```

### フックの使用

```typescript
import { Application, JSX } from "typedoc";

export function load(app: Application) {
  // head にカスタム CSS を追加
  app.renderer.hooks.on("head.end", () => (
    <link rel="stylesheet" href="custom.css" />
  ));

  // フッターにバージョン情報を追加
  app.renderer.hooks.on("footer.end", () => (
    <p>Generated with MyPlugin v1.0</p>
  ));
}
```

### レンダリングイベントのリスニング

```typescript
import { Application, Renderer, PageEvent, RendererEvent, Reflection } from "typedoc";

export function load(app: Application) {
  // レンダリング開始時
  app.renderer.on(Renderer.EVENT_BEGIN, (event: RendererEvent) => {
    console.log(`Rendering to: ${event.outputDirectory}`);
    console.log(`Pages to generate: ${event.pages.length}`);
  });

  // 各ページのレンダリング後
  app.renderer.on(Renderer.EVENT_END_PAGE, (event: PageEvent<Reflection>) => {
    if (event.contents) {
      // HTML コンテンツの修正
      event.contents = event.contents.replace("old-text", "new-text");
    }
  });

  // 非同期ジョブ
  app.renderer.preRenderAsyncJobs.push(async (output) => {
    // レンダリング前の準備処理
  });

  app.renderer.postRenderAsyncJobs.push(async (output) => {
    // レンダリング後のクリーンアップ処理
  });
}
```

## 関連

- [Application](./application.md)
- [イベントシステム](./events.md)
- [カスタムテーマ](../development/custom-themes.md)
- [プラグイン開発](../development/plugin-development.md)
