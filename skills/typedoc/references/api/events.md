# Events

TypeDoc のイベントシステム。Converter と Renderer のライフサイクル全体にわたるイベントディスパッチ機構。

## シグネチャ

### EventHooks

```typescript
class EventHooks<T extends Record<keyof T, unknown[]>, R> {
  on<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => R,
    order?: number
  ): void;

  once<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => R,
    order?: number
  ): void;

  off<K extends keyof T>(
    event: K,
    listener: (...args: T[K]) => R
  ): void;

  emit<K extends keyof T>(
    event: K,
    ...args: T[K]
  ): R[];

  saveMomento(): EventHooksMomento<T, R>;
  restoreMomento(momento: EventHooksMomento<T, R>): void;
}
```

### PageEvent

```typescript
class PageEvent<Model extends RouterTarget = RouterTarget> {
  // 静的イベント
  static readonly BEGIN: "beginPage";
  static readonly END: "endPage";

  // プロパティ
  readonly model: Model;
  project: Models.ProjectReflection;
  filename: string;
  url: string;
  pageKind: PageKind;
  contents?: string;
  pageHeadings: PageHeading[];
  pageSections: { title: string; headings: PageHeading[] }[];

  // メソッド
  constructor(model: Model);
  isReflectionEvent(): this is PageEvent<Models.Reflection>;
  startNewSection(title: string): void;
}
```

### RendererEvent

```typescript
class RendererEvent {
  // 静的イベント
  static readonly BEGIN: "beginRender";
  static readonly END: "endRender";

  // プロパティ
  readonly outputDirectory: string;
  readonly project: Models.ProjectReflection;
  pages: PageDefinition<RouterTarget>[];

  constructor(
    outputDirectory: string,
    project: Models.ProjectReflection,
    pages: PageDefinition<RouterTarget>[]
  );
}
```

### IndexEvent

```typescript
class IndexEvent {
  // 静的イベント
  static readonly PREPARE_INDEX: "prepareIndex";

  // プロパティ
  searchResults: (Models.DeclarationReflection | Models.DocumentReflection)[];
  searchFields: Record<string, string>[];
  readonly searchFieldWeights: Record<string, number>;

  // メソッド
  constructor(
    searchResults: (Models.DeclarationReflection | Models.DocumentReflection)[]
  );
  removeResult(index: number): void;
}
```

### MarkdownEvent

```typescript
class MarkdownEvent {
  // 静的イベント
  static readonly PARSE: "parseMarkdown";

  // プロパティ
  readonly page: PageEvent;
  readonly originalText: string;
  parsedText: string;

  constructor(page: PageEvent, originalText: string, parsedText: string);
}
```

## 主要メソッド

### EventHooks

#### on()

```typescript
on<K extends keyof T>(
  event: K,
  listener: (...args: T[K]) => R,
  order?: number
): void
```

イベントリスナーを登録する。`order` で実行順序を制御できる（小さい値が先に実行）。

#### once()

```typescript
once<K extends keyof T>(
  event: K,
  listener: (...args: T[K]) => R,
  order?: number
): void
```

1回だけ実行されるリスナーを登録する。

#### off()

```typescript
off<K extends keyof T>(
  event: K,
  listener: (...args: T[K]) => R
): void
```

リスナーを解除する。

#### emit()

```typescript
emit<K extends keyof T>(
  event: K,
  ...args: T[K]
): R[]
```

イベントを発火し、すべてのリスナーからの戻り値を収集する。

#### saveMomento() / restoreMomento()

```typescript
saveMomento(): EventHooksMomento<T, R>
restoreMomento(momento: EventHooksMomento<T, R>): void
```

リスナーの状態を保存し、後で復元する。

### PageEvent

#### isReflectionEvent()

```typescript
isReflectionEvent(): this is PageEvent<Models.Reflection>
```

モデルが Reflection かどうかの型ガード。

#### startNewSection()

```typescript
startNewSection(title: string): void
```

「On This Page」サイドバーに折りたたみ可能なセクションを作成する。

### IndexEvent

#### removeResult()

```typescript
removeResult(index: number): void
```

インデックスから検索結果を削除する。`searchFields` からも対応するエントリが同時に削除される。

## 主要プロパティ

### PageEvent プロパティ

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `model` | `Model` (readonly) | レンダリング対象のモデル |
| `project` | `ProjectReflection` | 処理中のプロジェクト |
| `filename` | `string` | 出力ファイル名 |
| `url` | `string` | ターゲット URL |
| `pageKind` | `PageKind` | ページの種類 |
| `contents` | `string?` | 最終 HTML コンテンツ（プラグインで変更可能） |
| `pageHeadings` | `PageHeading[]` | レンダリング中に構築されるナビゲーションリンク |
| `pageSections` | `{ title: string; headings: PageHeading[] }[]` | ページセクション（通常 `@group` タグから） |

### RendererEvent プロパティ

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `outputDirectory` | `string` (readonly) | ドキュメント生成先ディレクトリ |
| `project` | `ProjectReflection` (readonly) | 処理中のプロジェクト |
| `pages` | `PageDefinition[]` | 生成予定の全ページ |

### IndexEvent プロパティ

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `searchResults` | `(DeclarationReflection \| DocumentReflection)[]` | フィルタリング可能な検索結果 |
| `searchFields` | `Record<string, string>[]` | カスタム検索フィールド。`name`, `comment`, `document` は組み込み |
| `searchFieldWeights` | `Record<string, number>` (readonly) | 検索フィールドの重み。`name` は 10 倍の重み |

### MarkdownEvent プロパティ

| プロパティ | 型 | 説明 |
|-----------|---|------|
| `page` | `PageEvent` (readonly) | パースが行われているページ |
| `originalText` | `string` (readonly) | パース前の元テキスト |
| `parsedText` | `string` | パース済みの出力（プラグインで変更可能） |

## イベントライフサイクル

### Converter ライフサイクル

```
EVENT_BEGIN
  → EVENT_CREATE_PROJECT
  → EVENT_CREATE_DECLARATION (各宣言ごと)
    → EVENT_CREATE_SIGNATURE (シグネチャごと)
    → EVENT_CREATE_PARAMETER (パラメータごと)
    → EVENT_CREATE_TYPE_PARAMETER (型パラメータごと)
  → EVENT_CREATE_DOCUMENT (ドキュメントごと)
  → EVENT_RESOLVE_BEGIN
  → EVENT_RESOLVE (各 Reflection ごと)
  → EVENT_RESOLVE_END
EVENT_END
```

### Renderer ライフサイクル

```
preRenderAsyncJobs (非同期)
  → EVENT_BEGIN (RendererEvent)
    → EVENT_PREPARE_INDEX (IndexEvent)
    → EVENT_BEGIN_PAGE (PageEvent) ← 各ページ
    → EVENT_END_PAGE (PageEvent)   ← 各ページ
  → EVENT_END (RendererEvent)
postRenderAsyncJobs (非同期)
```

## コード例

### Converter イベントのリスニング

```typescript
import { Application, Converter, Context, DeclarationReflection } from "typedoc";

export function load(app: Application) {
  // 変換開始
  app.converter.on(Converter.EVENT_BEGIN, (context: Context) => {
    app.logger.info("Conversion started");
  });

  // 宣言作成時
  app.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context: Context, reflection: DeclarationReflection) => {
      app.logger.info(`Created: ${reflection.name}`);
    }
  );

  // 解決処理完了時
  app.converter.on(Converter.EVENT_RESOLVE_END, (context: Context) => {
    app.logger.info(`Total reflections: ${
      Object.keys(context.project.reflections).length
    }`);
  });
}
```

### Renderer イベントのリスニング

```typescript
import { Application, Renderer, RendererEvent, PageEvent, Reflection } from "typedoc";

export function load(app: Application) {
  // レンダリング開始
  app.renderer.on(Renderer.EVENT_BEGIN, (event: RendererEvent) => {
    app.logger.info(`Output: ${event.outputDirectory}`);
  });

  // ページレンダリング後
  app.renderer.on(
    Renderer.EVENT_END_PAGE,
    (event: PageEvent<Reflection>) => {
      if (event.contents) {
        // HTML の修正
        event.contents += "<!-- Generated by MyPlugin -->";
      }
    }
  );
}
```

### フックの使用

```typescript
import { Application, JSX } from "typedoc";

export function load(app: Application) {
  // head にスタイルシートを追加
  app.renderer.hooks.on("head.end", () => (
    <link rel="stylesheet" href="custom.css" />
  ));

  // フッターにコンテンツを追加
  app.renderer.hooks.on("footer.end", () => (
    <div class="custom-footer">
      <p>Custom content</p>
    </div>
  ));
}
```

### 検索インデックスのカスタマイズ

```typescript
import { Application, Renderer, IndexEvent } from "typedoc";

export function load(app: Application) {
  app.renderer.on(
    Renderer.EVENT_PREPARE_INDEX,
    (event: IndexEvent) => {
      // カスタム検索フィールドの追加
      for (let i = 0; i < event.searchResults.length; i++) {
        const refl = event.searchResults[i];
        event.searchFields[i]["category"] = refl.categories?.[0]?.title ?? "";
      }
      // フィールドの重みを設定
      (event.searchFieldWeights as any)["category"] = 5;
    }
  );
}
```

### Markdown パース結果の修正

```typescript
import { Application, MarkdownEvent } from "typedoc";

export function load(app: Application) {
  app.renderer.on(
    MarkdownEvent.PARSE,
    (event: MarkdownEvent) => {
      // パース済み HTML を修正
      event.parsedText = event.parsedText.replace(
        /TODO/g,
        '<span class="todo">TODO</span>'
      );
    }
  );
}
```

## 注意点

- イベントリスナーの `this` は `undefined` にバインドされる
- `EventHooks` はリスナーの戻り値を収集できる（Renderer フック向け）
- `PageEvent.contents` は `EVENT_END_PAGE` リスナーで変更可能
- `IndexEvent.searchResults` からアイテムを削除する場合は `removeResult()` を使用する
- `searchFieldWeights` は `name` が他のフィールドの 10 倍の重みを持つ
- `order` パラメータで実行順序を制御できる（小さい値が優先）
- `saveMomento()` / `restoreMomento()` でリスナーの状態を保存・復元できる

## 関連

- [Converter](./converter.md)
- [Renderer](./renderer.md)
- [Application](./application.md)
- [プラグイン開発](../development/plugin-development.md)
